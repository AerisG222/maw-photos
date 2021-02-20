const defaultDate = new Date(1900, 1, 1);

export const safeParseDate = (dt: Date | string): Date => {
    if (!dt) {
        return defaultDate;
    }

    if (typeof dt === 'string') {
        try {
            return new Date(dt);
        } catch {
            return defaultDate;
        }
    }

    return dt;
};
