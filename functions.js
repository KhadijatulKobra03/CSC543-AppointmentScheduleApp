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




// ==================================== begins Kate



/*
function isAlpha(str) {    // function checks if string is alpha
    return /^[a-zA-Z]+$/.test(str);
};
*/
/*
function errMsg(res) {
    // sendes error message if "letters" are not alpha
    console.log("inside errMsg")
    sendResponse(res, 404, 'application/json', "Please enter a valid string");
};
*/

exports.classes = function (queryObj, res) {
    // sends classes of chosen category
    let categoryValue = queryObj.category;

    console.log(categoryValue)

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

    switch (categoryValue) {
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
        }
    }
};






exports.pricing = function (queryObj, res) {
    // sends names that contain letters 
    let letters = queryObj.letters;
    if (isAlpha(letters)) {
        console.log("inside response to contains");
        sendResponse(res, 200, 'application/json', (a.filter(elem => { return elem.toLowerCase().includes(letters.toLowerCase()) })));
    }
    else
        errMsg(res);
};



/*
exports.newsletter = function (queryObj, res) {
    // adds name to array
    console.log("inside response to add");
    let name = queryObj.name;
    if (isAlpha(name)) {
        //add to array
        name = String(name).charAt(0).toUpperCase() + String(name).slice(1).toLowerCase();
        if (a.includes(name))
            sendResponse(res, 409, 'application/json', "Name already in the database.");
        else {
            a.push(name);
            sendResponse(res, 200, 'application/json', name);
        }
    }
    else
        errMsg(res);
};


*/




// ============================= ends Kate =======================================