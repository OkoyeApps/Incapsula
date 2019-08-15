var runMultiplePost = async (url = "", pagenumber = 1) => {
    var regex = /page_num=(\w)+/;
    url = url.replace(regex, `page_num=${pagenumber}`);
    return new Promise((resolve, reject) => {
        axios.post(url).then(data => {
            if (data.data.visits.length > 0) {
                var result = aggregateArrayFlatner(data.data.visits);
                resultfromFetch = [...resultfromFetch, ...result];
                pagenumber++;
                resolve(runMultiplePost(url, pagenumber++));
            } else {
                resolve(resultfromFetch);
            }
        }).catch(error => {
            resolve(resultfromFetch);;
        })

    })

}

var aggregateArrayFlatner = function (array = []) {
    var flatArray = [];
    array.map(currentdata => {
        var result = {};
        if (Array.isArray(currentdata)) {
            result = flattenArray(currentdata);
        }
        else if (typeof (currentdata) == 'object') {
            result = flattenObject(currentdata);
        }
        flatArray.push(result);
    })
    return flatArray;
}

module.exports = {
    runMultiplePost,
    flattenArray: aggregateArrayFlatner
}