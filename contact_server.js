const resp = require('./response.js');     //4 times
const http = require('http');
const url = require('url');
const fs = require('fs');


function isEmail(str) {
    // function checks if string is in email format
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(str);
};


function isAlpha(str) {
    // function checks if string is alpha
    return /^[a-zA-Z]+$/.test(str);
};


function errMsg(res, str) {
    // sendes error message if wrong data
    console.log("inside errMsg")
    resp.sendResponse(res, 400, 'application/json', "Please enter a valid" + str);
};

// ==================================== CONTACT ==========================================



const newsletterSignup = new Array();
/*
newsletterSignup[0] = { "fname": "James", "lname": "Bond", "email": "agent007@email.com" }
newsletterSignup[1] = { "fname": "Super", "lname": "Man", "email": "Superman@email.com" }
*/
/*var newsletterSignupObj = {
    table: []
}; */

exports.contact = function (queryObj, res) {
    // adds name to array
    console.log("inside response to contact");
    let userFirstName = queryObj.fname;
    let userLastName = queryObj.lname;
    let userEmail = queryObj.email;
    if (isAlpha(userFirstName)) {
        if (isAlpha(userLastName)) {
            if (isEmail(userEmail)) {
                //add to array
                userFirstName = String(userFirstName).charAt(0).toUpperCase() + String(userFirstName).slice(1).toLowerCase();
                console.log(userFirstName)
                userLastName = String(userLastName).charAt(0).toUpperCase() + String(userLastName).slice(1).toLowerCase();
                console.log(userLastName)
                /*
                if (newsletterSignup.some(elem => elem.email == userEmail))
                    sendResponse(res, 409, 'application/json', "Email already in the database.");
                else {
                    newsletterSignup.push({ "fname": userFirstName, "lname": userLastName, "email": userEmail });
                    sendResponse(res, 200, 'application/json', "Thank you for signing up!");
                }
                */
                if (fs.existsSync('newsletterSignup.json')) { // if file exists - append to it
                    fs.readFile('newsletterSignup.json', 'utf8', function readFileCallback(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            let obj = JSON.parse(data); //converting data from file to object

                            if (obj.table.some(elem => elem.email.toLowerCase() == userEmail.toLowerCase())) {
                                resp.sendResponse(res, 409, 'application/json', "Email already in the database.");
                            }
                            else {
                                obj.table.push({ "fname": userFirstName, "lname": userLastName, "email": userEmail }); //add some data
                                const newsletterSignupObjinJSON = JSON.stringify(obj, null, 2); //convert it back to json
                                fs.writeFile('newsletterSignup.json', newsletterSignupObjinJSON, 'utf8', function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("Successfully written to file"); // write it back to file
                                        resp.sendResponse(res, 200, 'application/json', "Thank you for signing up!");
                                    }
                                });

                            }
                        }
                    });
                }
                else { // if file doesn't exist - create it and write to it
                    var newsletterSignupObj = {
                        table: []
                    };
                    newsletterSignupObj.table.push({ "fname": userFirstName, "lname": userLastName, "email": userEmail });
                    const newsletterSignupObjinJSON = JSON.stringify(newsletterSignupObj, null, 2);
                    fs.writeFile('newsletterSignup.json', newsletterSignupObjinJSON, 'utf8', function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Successfully written to file"); // write it back to file
                            resp.sendResponse(res, 200, 'application/json', "Thank you for signing up!");
                        }
                    });
                }
            }
            else
                errMsg(res, " email");
        }
        else
            errMsg(res, " last name");
    }
    else
        errMsg(res, " first name");
};
