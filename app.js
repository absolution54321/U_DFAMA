var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var xlsxtojson = require("xlsx-to-json-lc");
var fs = require("fs");
var jsonRead = require('./jsonRead');
var mysql = require('mysql');

app.use(bodyParser.json());

var config = {
    "host": "127.0.0.1",
    "user": "dev",
    "password": "dev",
    "database": "project"
};


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'studentLogin' + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var excelJson = {};

var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

/** API path that will upload the files */
app.post('/uploadNewStudent', function (req, res) {
    var exceltojson;
    upload(req, res, function (err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        /** Multer gives us file info in req.file object */
        var inp = req.file;
        if (!req.file) {
            res.json({ error_code: 1, err_desc: "No file passed" });
            return;
        }
        /** Check the extension of the incoming file and 
         *  use the appropriate module
         */
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        console.log(req.file.path);
        try {
            exceltojson({
                input: req.file.path,
                output: req.file.path, //since we don't need output.json
                lowerCaseHeaders: true
            }, function (err, result) {

                for (var i = 0; i < result.length; i++) {
                    var connection = mysql.createConnection(config);
                    connection.connect();

                    var sql = "insert into student values(?, ? ,?)";
                    var param = [result[i].studentid, result[i].studentusername, result[i].studentpassword];

                    connection.query(sql, param, function (err, results) {
                        if (!err) {
                            console.log(results);
                        }

                        console.log("command exec");
                    });

                    connection.end();
                }
                if(i>result.length);
                    {
                        res.send("Insert Successfull");
                    }
                console.log("Program Ended");
            });

        } catch (e) {
            res.json({ error_code: 1, err_desc: "Corupted excel file" });
        }
    })

});

app.post('/uploadNewStudentDetails', function (req, res) {
    var exceltojson;
    upload(req, res, function (err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        /** Multer gives us file info in req.file object */
        var inp = req.file;
        if (!req.file) {
            res.json({ error_code: 1, err_desc: "No file passed" });
            return;
        }
        /** Check the extension of the incoming file and 
         *  use the appropriate module
         */
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        console.log(req.file.path);
        try {
            exceltojson({
                input: req.file.path,
                output: req.file.path, //since we don't need output.json
                lowerCaseHeaders: true
            }, function (err, result) {
                var i;
                for (i = 0; i < result.length; i++) {
                    var connection = mysql.createConnection(config);
                    connection.connect();

                    var sql = "insert into studentdetails(name," +
                                                        "rank," +
                                                        "address," +
                                                        "contactno," +
                                                        "dateofbirth," +
                                                        "yearofpassing," +
                                                        "qualification," +
                                                        "mentorid," +
                                                        "studentId," +
                                                        "gender," +
                                                        "groupName," +
                                                        "teamId," +
                                                        "batch," +
                                                        "state, parentContact) values(?, ? ,?, ?, ? ,?, ?, ? ,?, ?, ? ,?, ?, ? ,?)";
                    var param = [result[i].name,
                                 result[i].rank,
                                 result[i].address,
                                 result[i].contactno,
                                 result[i].dateofbirth,
                                 result[i].yearofpassing,
                                 result[i].qualification,
                                 result[i].mentorid,
                                 result[i].studentid,
                                 result[i].gender,
                                 result[i].groupname,
                                 result[i].teamid,
                                 result[i].batch,
                                 result[i].state,
                                 result[i].parentcontact];

                    connection.query(sql, param, function (err, results) {
                        if (!err) {
                            console.log(results);
                        }
                        
                        console.log("command exec");
                    });
                    
                    connection.end();
                }
                if(i>result.length);
                    {
                        res.send("Insert Successfull");
                    }
                console.log("Program Ended");
            });

        } catch (e) {
            res.json({ error_code: 1, err_desc: "Corupted excel file" });
        }
    })

});

app.post('/uploadNewStudentMarks', function (req, res) {
    var exceltojson;
    upload(req, res, function (err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        /** Multer gives us file info in req.file object */
        var inp = req.file;
        if (!req.file) {
            res.json({ error_code: 1, err_desc: "No file passed" });
            return;
        }
        /** Check the extension of the incoming file and 
         *  use the appropriate module
         */
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        console.log(req.file.path);
        try {
            exceltojson({
                input: req.file.path,
                output: req.file.path, //since we don't need output.json
                lowerCaseHeaders: true
            }, function (err, result) {
                var i;
                for (i = 0; i < result.length; i++) {
                    var connection = mysql.createConnection(config);
                    connection.connect();

                    var sql = "insert into student_marks(studentId,"+
                                                        " oopcpp_Lab,"+
                                                        " oopcpp_MCQ,"+
                                                        " oopcpp_Total,"+
                                                        " alds_Lab,"+
                                                        " alds_MCQ,"+
                                                        " alds_Total,"+
                                                        " osc_Lab,"+
                                                        " osc_MCQ,"+
                                                        " osc_Total,"+
                                                        " j2se_Lab,"+
                                                        " j2se_MCQ,"+
                                                        " j2se_Total,"+
                                                        " awp_Lab,"+
                                                        " awp_MCQ,"+
                                                        " awp_Total,"+
                                                        " j2ee_Lab,"+
                                                        " j2ee_MCQ,"+
                                                        " j2ee_Total,"+
                                                        " dbt_Lab,"+
                                                        " dbt_MCQ,"+
                                                        " dbt_Total,"+
                                                        " se_ppt,"+
                                                        " se_MCQ,"+
                                                        " se_Total) values(?, ? ,?, ?, ? ,?, ?, ? ,?, ?, ? ,?, ?, ? ,?, ?, ?, ? ,?, ?, ? ,?, ?, ? ,?)";
                    var param = [result[i].studentid,
                                 result[i].oopcpp_lab,
                                 result[i].oopcpp_mcq,
                                 result[i].oopcpp_total,
                                 result[i].alds_lab,
                                 result[i].alds_mcq,
                                 result[i].alds_total,
                                 result[i].osc_lab,
                                 result[i].osc_mcq,
                                 result[i].osc_total,
                                 result[i].j2se_lab,
                                 result[i].j2se_mcq,
                                 result[i].j2se_total,
                                 result[i].awp_lab,
                                 result[i].awp_mcq,
                                 result[i].awp_total,
                                 result[i].j2ee_lab,
                                 result[i].j2ee_mcq,
                                 result[i].j2ee_total,
                                 result[i].awp_lab,
                                 result[i].awp_mcq,
                                 result[i].awp_total,
                                 result[i].dbt_lab,
                                 result[i].dbt_mcq,
                                 result[i].dbt_total,
                                 result[i].se_ppt,
                                 result[i].se_mcq,
                                 result[i].se_total];

                    connection.query(sql, param, function (err, results) {
                        if (!err) {
                            console.log(results);
                        }
                        
                        console.log("command exec");
                    });
                    
                    connection.end();
                }
                if(i>result.length);
                    {
                        res.send("Insert Successfull");
                    }
                console.log("Program Ended");
            });

        } catch (e) {
            res.json({ error_code: 1, err_desc: "Corupted excel file" });
        }
    })

});


app.listen('3008', function () {
    console.log('running on 3000...');
});