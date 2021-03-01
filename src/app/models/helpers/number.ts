export const getNumber = (val: any): number | undefined => {
    const valAsNum = Number(val);

    return isNaN(valAsNum) ? undefined : valAsNum;
};
