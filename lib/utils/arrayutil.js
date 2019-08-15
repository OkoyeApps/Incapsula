var flattenedResult = {};

const flattenObject = (data = {}) => {
    Object.keys(data).map(key => {
        var flatobj = {};
        if (Array.isArray(data[key])) {
            flatobj = flattenArray(data[key], key)
        } else if (typeof (data[key]) == 'object') {
            flattenObject(data[key]);
        } else {
            flatobj[key] = data[key];
        }
        flattenedResult = { ...flattenedResult, ...flatobj };
    })
    return flattenedResult;
}

const flattenArray = (data = [], objname) => {
    var flattenedResult = {};
    data.map((currentdata, index) => {
        var flatobj = {};
        if (typeof (currentdata) == 'string') {
            keyname = `${objname}.${index}`;
            flatobj[keyname] = currentdata;
        } else {
            if (Array.isArray(currentdata)) {
                flattenArray(currentdata);
            } else {
                flatobj = flattenObject(currentdata);
            }
        }
        flattenedResult = { ...flattenedResult, ...flatobj };
    });
    return flattenedResult;
}

module.exports = {
    flattenArray, flattenObject
}
