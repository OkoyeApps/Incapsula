var company = require('../models/company');
module.exports.addcompany = (companydetails, userdetail) => {
    return new Promise((resolve, reject) => {
        var companyObject = {
            name: companydetails.name,
            address: companydetails.address,
            apiId: companydetails.apiid,
            apiKey: companydetails.apikey,
            createdby: userdetail.userid
        };
        company.create(companyObject, (err, created) => {
            if (err) {
                reject({ data: err, success: false, message: "company could not be created" });
            } else {
                resolve({ data: created, success: true, message: "company added successfully" });
            }
        });
    });
}

module.exports.addsite = (sitedetails, userdetail) => {
    return new Promise((resolve, reject) => {
        sitedetails.createdby = userdetail.userid;
        company.findOne({ _id: sitedetails.company }).exec((err, companydetails) => {
            if (err) {
                reject({ data: null, success: false, message: "could not associate the site to a company" });
            } else if (!companydetails) {
                reject({ data: null, success: false, message: "site could not be created" });
            } else {
                console.log("company gotten", sitedetails);
                var existingsite = companydetails.sites.findIndex(x => x.sitenumber == sitedetails.sitenumber);
                if (existingsite > -1) {
                    reject({ data: null, success: false, message: "can't add site with the same site number twice" });
                } else {
                    company.updateOne({ _id: sitedetails.company }, { "$set": { sites: sitedetails } }).exec((err, updatedData) => {
                        if (err) {
                            reject({ data: null, success: false, message: "site could not be created" });
                        } else {
                            resolve({ data: updatedData, success: true, message: "Site added successfully" });
                        }
                    });
                }
            }
        });
    });
}