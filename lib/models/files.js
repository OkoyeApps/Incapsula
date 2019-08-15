var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var reportFile = Schema({
    companyId : {type : mongoose.SchemaTypes.ObjectId, required : true},
    user :  {type : mongoose.SchemaTypes.ObjectId, required : true},
    filename : {type :string},
    filepath : {type : string},
    createddata : {type : Date, default : new Date()}
});


module.exports = mongoose.model("reportfile", reportFile);