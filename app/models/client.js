//Access Control Model
// grab the mongoose module
var db = require("./mongoDB");

// define our user model
// module.exports allows us to pass this to other files when it is called

var Schema = db.Schema;

// create a schema
var clientSchema = new Schema({
  client_name: String,
  contact_name:String,
  contact_email: String,
  contact_phone:String
});

// the schema is useless so far
// we need to create a model using it
var Client = db.model('Client', clientSchema);

// make this available to our users in our Node applications
module.exports = Client;
