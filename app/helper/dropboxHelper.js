var node_dropbox = require('node-dropbox');
const key = "ef76toc74orsmzb";
const secret = "ef76toc74orsmzb";
const access_token = "XIMHHJj2YyAAAAAAAAAADLbF3ircEx_Kc5Ed1oDXyuxyljmJ6vZ8Rq9q9bmfuEux";

var Helper = function(){
	this.api = node_dropbox.api(access_token);
};

Helper.prototype.createDirectory = function(dirName,cb) {
	// body...
	this.api.createDir(dirName,(err, res, body)=>{ 
		if (res.statusCode==200){
			if (typeof cb == "function"){
				cb(body.path);
			}
		}else{
			console.log("error for creating directory on dropbox");
			cb("");
		}
		
	});
};
module.exports = Helper;
