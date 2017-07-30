
var fs = require("fs");
var mysql = require("mysql");

var config = {
    "host": "127.0.0.1",
    "user": "dev",
    "password": "dev",
    "database": "project"
};

module.exports = {
    "studentLoginToDB": function (err, result) {

        var json1;

        // Synchronous read
        var data = fs.readFileSync('./uploads/studentLogin.xlsx', "utf8");
        //json1 = JSON.parse(data);
        json1 = JSON.parse(result);

        console.log("JSON data: " + json1);

        for (var i = 0; i < json1.length; i++) {
            var connection = mysql.createConnection(config);
            connection.connect();

            var sql = "insert into student values(?, ? ,?)";
            var param = [json1[i].studentid, json1[i].studentusername, json1[i].studentpassword];

            connection.query(sql, param, function (err, results) {
                if (!err) {
                    console.log(results);
                }

                console.log("command exec");
            });

            connection.end();
        }
        console.log("Program Ended");
    }
}