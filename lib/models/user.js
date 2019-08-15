var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  company: { type: mongoose.SchemaTypes.ObjectId, ref: 'company' }
});

UserSchema.pre('save', function (next) {
  var user = this;
  user.publicId = mongoose.Types.ObjectId();
  console.log("Password to save", user.password)
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password) {
  console.log("current password", password)
  console.log("password check", bcrypt.compareSync(password, this.password));
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user', UserSchema);



