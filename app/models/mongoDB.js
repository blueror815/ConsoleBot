var mongoose = require('mongoose'), dbconfig = require("../../config/db");
var options = { useMongoClient: true  };       
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.url);
console.log("DB has been connected.");

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));


mongoose.connection.once('open', function() {
  // Wait for the database connection to establish, then start the app.                         
  // if there is no admin user, we have to insert admin user information.
  //we have to popoulate ACM setting value if we have not.
  const Client = require("./client");
  Client.find({},function(err, data){
    if (err)
      throw err;
    else if (typeof data =="undefined" || data==null ||data.length ==0){
      // initialize and populate client's init data.
      var clients = [
        {
          client_name:"sarah",
          contact_name:"sarah",
          contact_email:"example@mail.com",
          contact_phone:"1234345"
        }
      ];                
      var len = clients.length;
      
      function saveAll(){
        var tmp = clients[len-1];
        var client = new Client(tmp);
        client.save(function(err,result){
          if(err) throw err;
          if (--len) saveAll();
        });
      };
      saveAll();               
    }
  });  
});

module.exports = mongoose;