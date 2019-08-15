var mongoose = require('mongoose');

const uri = process.env.DB_URI;


module.exports = function init() {
    if (uri) {
        mongoose.connect(
            uri, {
                useNewUrlParser: true,
                useCreateIndex: true
            },
            (err) => {
                if (err) {
                    console.log("Not connected to database", err);
                }else{
                    console.log("Sucessfully connected to MongoDB");
                }
            }

        );
    } else {
        throw new Error("DB URI not found, please kindly check your connection strings to mongoose");
    }
}

function seedDatabase() {

}