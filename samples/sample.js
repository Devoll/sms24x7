var phone = process.argv[2];
var subject = process.argv[3];
var text = process.argv[4];

if(phone == undefined || text == undefined){
    throw new Error('Phone or text is undefined!');
}

var sms24x7 = require('./../sms24x7');

var sms = new sms24x7('your@email', 'password');

sms.send(phone, text, function(err, res){
    if(err){
        console.log(err);
    }else{
        console.log('Message sended!');
    }
});