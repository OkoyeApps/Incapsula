var mongoose = require('mongoose');
var schema = mongoose.Schema;



var companySchema = schema({
    name: { type: String, required: true },
    address: { type: String },
    apiId: { type: String, required: true },
    apiKey: { type: String, required: true },
    createdby: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' },
    createdon: { type: Date, default: new Date() },
    sites: [{
        siteid: { type: String, required: true },
        sitename: { type: String, required: true },
        createdon: { type: Date, default: new Date() },
        createdby: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' }
    }]
});

module.exports = mongoose.model('company', companySchema);