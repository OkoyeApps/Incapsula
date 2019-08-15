var user = require('../models/user');
var axios = require('axios').default;
var excel = require('xlsx');
var arrayutil = require('../utils/arrayutil');
var requestUtil = require('../utils/requestutil');
var resultfromFetch = [];
module.exports.generatereport = (userid, requestdetails) => {
    return new Promise((resolve, reject) => {
        user.findOne({ _id: userid }).populate('company').exec((err, currentUser) => {
            if (err || !currentUser) {
                resolve({ data: null, success: false, message: "Something went wrong, could not generate report" });
            }
            else {
                var url = requestbuilder(currentUser.company.apiId, currentUser.company.apiKey, requestdetails.site, requestdetails.start, requestdetails.end, requestdetails.definedtime);
                resolve({ data: null, success: true, message: "generating result in background" });
                fetchAndCompileReports(url);
            }
        });
    });
}
//generate excel for report
const generateexcel = (data) => {
    console.log("writing to excel");
    var wb = excel.utils.book_new();
    var ws = excel.utils.json_to_sheet(data, { bookVBA: true });
    // excel.utils.sheet_to_csv(ws,{blankrows : true});
    /* Add the worksheet to the workbook */

    excel.utils.book_append_sheet(wb, ws, `testfile`);
    excel.writeFile(wb, 'testfile.xls', { type: 'file' });
}

requestbuilder = (apiid, apikey, siteid, startdate, enddate, definedtime) => {
    var startDate = new Date(startdate).getTime();
    var endDate = new Date(enddate).getTime();
    if (definedtime) {
        return `https://my.incapsula.com/api/visits/v1?api_id=${apiid}&api_key=${apikey}&site_id=${siteid}&time_range=${definedtime}`;
    } else {
        return `https://my.incapsula.com/api/visits/v1?api_id=${apiid}&api_key=${apikey}&site_id=${siteid}&start=${startDate}&end=${endDate}&time_range=custom&page_size=100&page_num=1`;
    }
}

// var aggregateArrayFlatner = function (array = []) {
//     var flatArray = [];
//     array.map(currentdata => {
//         var result = {};
//         if (Array.isArray(currentdata)) {
//             result = arrayutil.flattenArray(currentdata);
//         }
//         else if (typeof (currentdata) == 'object') {
//             result = arrayutil.flattenObject(currentdata);
//         }
//         flatArray.push(result);
//     })
//     return flatArray;
// }

var fetchAndCompileReports = async (url) => {
    requestUtil.runMultiplePost(url).then(fetchedReports => {
        generateexcel(fetchedReports);
    })
}


