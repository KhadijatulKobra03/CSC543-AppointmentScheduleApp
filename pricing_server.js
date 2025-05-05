const resp = require('./response.js');  
const http = require('http');
const url = require('url');

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
            resp.sendResponse(res, 200, 'application/json', a);
            break;
        };
        case "cc": {
            resp.sendResponse(res, 200, 'application/json', cc);
            break;
        };
        case "dcc": {
            resp.sendResponse(res, 200, 'application/json', dcc);
            break;
        };
        case "gc": {
            resp.sendResponse(res, 200, 'application/json', gc);
            break;
        };
        case "m": {
            resp.sendResponse(res, 200, 'application/json', m);
            break;
        };
        case "vc": {
            resp.sendResponse(res, 200, 'application/json', vc);
            break;
        };
        default: {
            resp.sendResponse(res, 200, 'application/json', a);
            break;
        };
    }

};
