export const getNumber = (val: unknown): number | undefined => {
    const valAsNum = Number(val);

    return isNaN(valAsNum) ? undefined : valAsNum;
};
