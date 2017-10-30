var credentials = require('../Shawn/credentials.json');

var mysql=require("mysql");

credentials.host="ids";

var connection = mysql.createConnection(credentials);

useDB();

function useDB() {
    connection.query("USE globbimus;", function(err) {
        if (err) {
            console.log("Problems with MySQL: "+err);
            connection.end();
        }
        else {
            console.log("Use DB: Success");
            createTable();
        }
    });
}

function createTable() {
    connection.query("CREATE TABLE IF NOT EXISTS till_buttons (buttonID int primary key, `left` INT, `top` INT, `width` INT, label TEXT, invID INT);", function(err) {
        if(err) {
            console.log("Problems with MySQL: "+err);
            connection.end();
        }
        else {
            console.log("createTable: Success");
            truncate();
        }
    });
}

function truncate() {
    connection.query("TRUNCATE till_buttons;", function(err) {
        if(err) {
            console.log("Problems with MySQL: "+err);
            connection.end();
        }
        else {
            console.log("Truncate: Success");
            loadDB();
        }
    });
}

function loadDB() {
    connection.query("LOAD DATA LOCAL INFILE '../resources/data.txt' INTO TABLE till_buttons;", function(err){
        if(err) {
            console.log("Problems with MySQL: "+err);
            connection.end();
        }
        else {
            console.log("Load DB: Success");
            connection.end();
        }
    });
}
