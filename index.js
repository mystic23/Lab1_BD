var express = require('express');
var app = express();


app.get('/get_crimes_data/:quantity', function (req, res) {
   
    var quantity = req.params.quantity
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'crimes',
        password: 'password',
        server: 'localhost', 
        port: 1434,
        database: 'Crimes LA',
        options: {trustServerCertificate: true}
    }; 

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(`select top ${quantity} * from Crime_Data`, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset.recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});