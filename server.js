
const readline = require("readline");
const Client = require("./app/models/client");
const dropboxHelper = require("./app/helper/dropboxHelper");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// questions
const command = "Create a Client...";
const prompts ={
	forClientName:"Client name:",
	forContact:"Contact name:",
	forPhone:"Contact Phone number:",
	forEmail:"Contact Email address:",
	alreadyExist:"Clinet already exists."
};
var clientInfo = {};

var promptForClientName = function(){
	console.log(command);
	clientInfo = {};
	rl.question(prompts.forClientName, (answer) => {
	  // TODO: Log the answer in a database
	  if (answer && answer.length>0){
		  Client.find({client_name:answer},(err, res)=>{
		  	if (err) throw err;
		  	if (res && res.length>0){
		  		console.log(res);
		  		console.log(prompts.alreadyExist);
		  		promptForClientName();
		  	}else{
		  		clientInfo.client_name = answer;
		  		promptForContactName();
		  	}
		  });
	  }else
	  	promptForClientName();
	});
};
var promptForContactName = function(){
	rl.question(prompts.forContact, (answer) => {
	  // TODO: Log the answer in a database
	  if (answer && answer.length>0){
	  	clientInfo.contact_name = answer;
	  	promptForContactPhone();
	  }else
	  	promptForContactName();
	});
};

var promptForContactPhone = function(){
	rl.question(prompts.forPhone, (answer) => {
	  // TODO: Log the answer in a database
	  if (answer && answer.length>0){
	  	clientInfo.contact_phone = answer;
	  	promptForContactEmail();
	  }else
	  	promptForContactPhone();
	});
};
var promptForContactEmail = function(){
	rl.question(prompts.forEmail, (answer) => {
	  // TODO: Log the answer in a database
	  if (answer && answer.length>0){
	  	clientInfo.contact_email = answer;
	  	console.log(clientInfo);
	  	//promptForClientName();
	  	saveClient();
	  }else
	  	promptForContactEmail();
	});
};
var saveClient = function(){
	var newClient = new Client(clientInfo);
	newClient.save((err)=>{
		if (err) throw err;
		createDropboxFolder(clientInfo.client_name);
	});
};
var createDropboxFolder = function(name){
	dbx = new dropboxHelper();
	dbx.createDirectory(name,(res)=>{
		if (res.length>0){
			console.log(`Dropbox for ${res} has been created successfully`);
			promptForClientName();
		}
	});
	
}

promptForClientName();


























