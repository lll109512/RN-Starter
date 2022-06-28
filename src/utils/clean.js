export const cleanObjectNilValue = (obj) =>
    Object.entries(obj).reduce(
        (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
        {}
    );

export const removeUndefines = (obj) => {
    if (obj === undefined) {
        return null;
    }
    if (typeof obj === "object") {
        for (let key in obj) {
            obj[key] = removeUndefines(obj[key]);
        }
    }
    return obj;
};
