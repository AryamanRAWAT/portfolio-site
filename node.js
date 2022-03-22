var http = require('http');
var formidable = require('formidable');
const nodemailer = require('nodemailer');
var fs = require('fs');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Superys!",
    database: "test"
});

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'arawat.kol@gmail.com',
        pass: 'Superys!'
    }
});
  
let mailDetails = {
    from: 'arawat.kol@gmail.com',
    to:   'dahiyajoy20@gmail.com',
    subject: 'Aryaman Rawat',
    text: 'Thank you for visiting my site! Your form has been received and is being processed at the moment. I will contact you soon!',
 
};
  

http.createServer(function (req, res) {
    
    fs.readFile('index.html',function(err,data){

        if(err){
            return console.error(err);
        }
        if (req.url == '/fileupload') {
             var form = new formidable.IncomingForm();
             form.parse(req, function (err, fields, files) {

                console.log('fields = ', fields);
                mailTransporter.sendMail(mailDetails, function (err, data) {
                    if (err) {
                        console.log('Error Occurs', err);
                    } else {
                        console.log('Email sent successfully');
                    }
                });
                con.connect(function (err) {
                    if (err) throw err;
                    console.log("Connected!");
                    var sql = "INSERT INTO aryaman VALUES ('" + fields.name + "','" + fields.email + "','" + fields.subject + "','" + fields.message  + "')";
                    con.query(sql, function (err, result) {
                        if (err){

                            throw err;
                        }
                        console.log("1 record inserted");
                    });
                });
                res.write("Hey! From the bottom of my heart, thank you for contacting me. I am waiting to see if or when I will receive an interview date.`");
                return res.end();



            });
        } 
         
         
         else{
             if(req.url=='/form.html'){
                fs.readFile('form.html',function(err2,data2){
                    if(err){
                        return console.error(err2);
                    }
                    else {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(data2);            
                        return res.end();
                    }

                });
            }
            else{
                if(req.url=='/casestudy.html'){
                    fs.readFile('casestudy.html',function(err1,data1){
                        if(err){
                            return console.error(err1);
                        }
                        else {
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.write(data1);            
                            return res.end();
                        }

                    });
                }

                else{
                    if(req.url=='/Contact.html'){
                        mailTransporter.sendMail(mailDetails, function(err, data) {
                            if(err) {
                                console.log('Error Occured',err);
                            } else {
                                console.log('Email has been sent successfully');
                                return res.end();
                            }
                        });
                        fs.readFile('Contact.html',function(err1,data1){
                            if(err){
                                return console.error(err1);
                            }
                            else {
                                res.writeHead(200, {'Content-Type': 'text/html'});
                                res.write(data1);            
                                return res.end();
                            }
    
                        });
                        
                    }

                    else{
                        if(req.url=='/Calculator.html'){
                            fs.readFile('Calculator.html',function(err1,data1){
                                if(err){
                                    return console.error(err1);
                                }
                                else {
                                    res.writeHead(200, {'Content-Type': 'text/html'});
                                    res.write(data1);            
                                    return res.end();
                                }
        
                            });
                        }

                        else {
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.write(data);            
                            return res.end();
                        }
                    }

                    
                }
            }
         }
         

         

         

    });

  }).listen(8080);