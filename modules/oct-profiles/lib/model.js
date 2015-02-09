var mongoose  = require('mongoose')
  , Schema    = mongoose.Schema;

var ProfileSchema = new Schema({
  _id: Number,
	userId: Number,
  firstName: {
    type: String,
    "default": ''
  },
  lastName: {
    type: String,
    "default": ''
  },
  age: {
    type: Number
  },
  description: {
    type: String,
    "default": ''
  }
});

mongoose.model('Profile', ProfileSchema);