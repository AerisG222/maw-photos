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

# kill assets used for dev
rm -rf "${DIST_ROOT}/assets"

echo ''
echo ''
echo '********************'
echo '** OIDC CLIENT    **'
echo '********************'
# remove one copied by angular cli, which also minifies and breaks our code
rm "${DIST_ROOT}/oidc-client.min.js"

OIDC_SRC_NAME="oidc-client.min.js"
OIDC_SRC="${PROJECT_ROOT}/node_modules/oidc-client/dist/${OIDC_SRC_NAME}"
MD5="$(md5sum ${OIDC_SRC} |cut -c 1-20)"
OIDC_DST_NAME="oidc-client.min.${MD5}.js"
OIDC_DST="${DIST_ROOT}/${OIDC_DST_NAME}"

cp "${OIDC_SRC}" "${OIDC_DST}"

find "${DIST_ROOT}" -type f -name "*.html" -exec sed -i "s#${OIDC_SRC_NAME}#${OIDC_DST_NAME}#g" {} +


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
