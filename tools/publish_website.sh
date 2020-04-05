# script to prepare the production build
SSH_REMOTE_HOST=www.mikeandwan.us
SSH_USERNAME=mmorano
PROJECT_ROOT=/home/mmorano/git/maw-photos
DIST_ROOT="${PROJECT_ROOT}/dist"
TOOLS_ROOT="${PROJECT_ROOT}/tools"
WD=$( pwd )

echo ''
echo '********************'
echo '** CLEAN          **'
echo '********************'
rm -rf "${PROJECT_ROOT}/node_modules"
rm -rf "${PROJECT_ROOT}/dist"
cd "${PROJECT_ROOT}"
npm ci

echo ''
echo '********************'
echo '** BUILD          **'
echo '********************'
# build app
cd "${PROJECT_ROOT}"
ng build --prod

echo ''
echo ''
echo '********************'
echo '** DEPLOY         **'
echo '********************'
echo 'Would you like to deploy to production? [y/n]'
read DO_DEPLOY

if [ "${DO_DEPLOY}" = "y" ]; then
    rsync -ah "${DIST_ROOT}" "${SSH_USERNAME}"@"${SSH_REMOTE_HOST}":~/maw-photos

    ssh -t "${SSH_USERNAME}"@"${SSH_REMOTE_HOST}" '
        echo "These commands will be run on: $( uname -n )"

        sudo mv maw-photos/dist /srv/www/_photos_staging

        sudo chown -R root:root /srv/www/_photos_staging
        sudo restorecon -R /srv/www/_photos_staging

        if [ -d "/srv/www/maw_photos" ]; then
            if [ -d "/srv/www/maw_photos.old" ]; then
                sudo rm -rf "/srv/www/maw_photos.old"
            fi

            sudo mv "/srv/www/maw_photos" "/srv/www/maw_photos.old"
        fi

        sudo mv "/srv/www/_photos_staging" "/srv/www/maw_photos"

        if [ -d /srv/www/_photos_staging ]; then
            sudo rm -rf /srv/www/_photos_staging
        fi
    '
fi

echo ''
echo '**********'
echo '** DONE **'
echo '**********'
echo ''
