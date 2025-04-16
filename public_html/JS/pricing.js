categoryValue = document.getElementById("priceCategory").value;
document.getElementById("priceCategory").addEventListener("change", updatePrice);
displayPrice = document.getElementById("displayPrice");


function updatePrice() {
    categoryValue = document.getElementById("priceCategory").value;
    console.log(categoryValue)

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

switch (categoryValue) {
    case "a": {
        displayPrice.innerHTML= a;
        break;
    };
    case "cc": {
        displayPrice.innerHTML= cc;
        break;
    };
    case "dcc": {
        displayPrice.innerHTML= dcc;
        break;
    };
    case "gc": {
        displayPrice.innerHTML= gc;
        break;
    }
    case "m": {
        displayPrice.innerHTML= m;
        break;
    };
    case "vc": {
        displayPrice.innerHTML= vc;
        break;
    }
}


}; 

updatePrice();
