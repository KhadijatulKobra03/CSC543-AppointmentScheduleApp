const http = require('http');
const url = require('url');
const fs = require('fs')


function sendResponse(res, status, type, body) {
    // sends response body in JSON format
    console.log("inside sendresponse");
    res.writeHead(status, { 'Content-Type': type });
    console.log("sending back: " + JSON.stringify(body));
    res.write(JSON.stringify(body));
    res.end();
};


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
    sendResponse(res, 400, 'application/json', "Please enter a valid" + str);
};



// ==================================== CONTACT ==========================================



const newsletterSignup = new Array();
/*
newsletterSignup[0] = { "fname": "James", "lname": "Bond", "email": "agent007@email.com" }
newsletterSignup[1] = { "fname": "Super", "lname": "Man", "email": "Superman@email.com" }
*/
var newsletterSignupObj = {
    table: []
};

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

                            if (obj.table.some(elem => elem.email == userEmail)) {
                                sendResponse(res, 409, 'application/json', "Email already in the database.");
                            }
                            else {
                                obj.table.push({ "fname": userFirstName, "lname": userLastName, "email": userEmail }); //add some data
                                const newsletterSignupObjinJSON = JSON.stringify(obj,null,2); //convert it back to json
                                fs.writeFile('newsletterSignup.json', newsletterSignupObjinJSON, 'utf8', function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("Successfully written to file"); // write it back to file
                                        sendResponse(res, 200, 'application/json', "Thank you for signing up!");
                                    }
                                });
                                
                            }
                        }
                    });
                }
                else { // if file doesn't exist - create it and write to it
                    newsletterSignupObj.table.push({ "fname": userFirstName, "lname": userLastName, "email": userEmail });
                    const newsletterSignupObjinJSON = JSON.stringify(newsletterSignupObj, null,2);
                    fs.writeFile('newsletterSignup.json', newsletterSignupObjinJSON, 'utf8', function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Successfully written to file"); // write it back to file
                            sendResponse(res, 200, 'application/json', "Thank you for signing up!");
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



// ==================================== CLASSES ==========================================



exports.classes = function (queryObj, res) {
    // sends classes of chosen category

    let classLevel = queryObj.level;
    console.log(classLevel)

    let by = '  <div class="row p-2"> \
                    <h3>Beginner Yoga</h3> \
                    <p>Great for people with limited experince in yoga. This class explores the fundamentals of yoga \
                            practice. \
                            Beginner friendly poses: Downward-Facing Dog, Cat-Cow Pose, Tree Pose and other. Student \
                            will \
                            also learn breathing techniques and gentle stretches.</p> \
                </div> \
            ';

    let iy = '  <div class="row p-2"> \
                    <h3>Intermediate Yoga</h3> \
                    <p>More challenging positions, class introduces a wider range of postures with more complexity. \
                            You \
                            will learn Camel Pose, Boat Pose, Revolved Triangle Pose and many more. </p> \
                </div> \
            ';

    let ay = '  <div class="row p-2"> \
                    <h3>Advanced Yoga</h3> \
                    <p>Class for those that already have significant experience in yoga. Explores more challenging \
                            poses: Crow Pose, Half Moon Pose, Scorpion Pose, Flying Pigeon Pose and more. Designed for \
                            experienced yogis, class with more difficult postures. </p> \
                </div> \
            ';

    let gy = '  <div class="row p-2"> \
                    <h3>Gentle Yoga</h3> \
                    <p>This yoga is performed at a slower pace, with less intense positions. Modifications can be \
                            offered as \
                            you practice the poses. Suitable for beginners, seniors, or those seeking a more relaxing \
                            exercise.</p> \
                </div> \
                ';

    let cy = '  <div class="row p-2"> \
                    <h3>Chair Yoga</h3> \
                    <p>Chair yoga is a modified form of yoga that can be practiced while seated in a chair. It is a \
                        gentle \
                            and accessible way to improve flexibility, strength, and balance. This type of yoga is \
                            suitable \
                            for all fitness levels, but is especially beneficial for people with mobility limitations or \
                            for \
                            those that have difficulty standing for long periods.</p> \
                </div> \
            ';

    let kty = ' <div class="row p-2"> \
                    <h3>Kids and Teens Yoga</h3> \
                    <p>For ages 10-18. Beginner friendly poses. Students will learn proper alignment and basic \
                            asanas. \
                            Helps calm the mind and body, teaches body awarness. \
                            This class is great for younger students.</p> \
                </div> \
                ';

    let m = '   <div class="row p-2"> \
                    <h3>Meditation</h3> \
                    <p>Please join us for a 60 min class that includes exercises designed to help reduce stress. \
                            Guided \
                            meditation can help focus and clear your mind.</p> \
                </div> \
            ';

    switch (classLevel) {
        case "all": {
            sendResponse(res, 200, 'application/json', by + iy + ay + gy + cy + kty + m);
            break;
        };
        case "beginner": {
            sendResponse(res, 200, 'application/json', by + gy + cy + kty + m);
            break;
        };
        case "intermediate": {
            sendResponse(res, 200, 'application/json', iy);
            break;
        };
        case "advanced": {
            sendResponse(res, 200, 'application/json', ay);
            break;
        };
        default: {
            sendResponse(res, 200, 'application/json', by + iy + ay + gy + cy + kty + m);
            break;
        };
    }
};



// ==================================== PRICING ==========================================



exports.pricing = function (queryObj, res) {
    // sends prices of chosen category 

    let priceCategory = queryObj.category;
    console.log(priceCategory)

    let cc = '     <div class="row classCards"> \
                    <h2>Class Cards</h2> \
                    <p>All of our classes can be attended using Class Cards.</p> \
                    <p>$20 Single class</p> \
                    <p>$90 5-Class Card</p> \
                    <p>$160 10-Class Card</p> \
                    <p>$300 20-Class Card</p> \
                    </div> \
            ';

    let dcc = '    <div class="row discountedClassCards"> \
                    <h2>Discounted Class Cards</h2> \
                    <p>Discounted Class Cards are for classes before noon.</p> \
                    <p>$15 Single class</p> \
                    <p>$65 5-Class Card</p> \
                    <p>$120 10-Class Card</p> \
                    <p>$220 20-Class Card</p> \
                    </div> \
            ';

    let vc = '      <div class="row virtualClasses"> \
                    <h2>Virtual Classes</h2> \
                    <p>Attend the class virtually, from the comfort of your home.</p> \
                    <p>$12 Single class</p> \
                    <p>$55 5-Class Card</p> \
                    <p>$100 10-Class Card</p> \
                    <p>$180 20-Class Card</p> \
                    </div> \
            ';
    let m = '       <div class="row Membership"> \
                    <h2>Membership</h2>\
                    <p>Unlimited yoga for one monthly price. Attend all the classes you want, in person and virtual classes included. </p> \
                    <p>$99/month - regular membership, credit card on file and auto-renewal </p> \
                    <p>$109/month - no credit card on file, no auto-reneval</p> \
                    <p>$50/month - virtual membership</p> \
                     </div> \
            ';

    let gc = '      <div class="row giftCertificates"> \
                    <h2>Gift Certificates</h2> \
                    <p>Gift certificates are avaliable in any amount.</p> \
                    </div> \
            ';

    let a = cc + dcc + vc + m + gc;

    switch (priceCategory) {
        case "a": {
            sendResponse(res, 200, 'application/json', a);
            break;
        };
        case "cc": {
            sendResponse(res, 200, 'application/json', cc);
            break;
        };
        case "dcc": {
            sendResponse(res, 200, 'application/json', dcc);
            break;
        };
        case "gc": {
            sendResponse(res, 200, 'application/json', gc);
            break;
        };
        case "m": {
            sendResponse(res, 200, 'application/json', m);
            break;
        };
        case "vc": {
            sendResponse(res, 200, 'application/json', vc);
            break;
        };
        default: {
            sendResponse(res, 200, 'application/json', a);
            break;
        };
    }

};
