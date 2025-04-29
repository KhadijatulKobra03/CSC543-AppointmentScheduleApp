priceCategory = document.getElementById("priceCategory").value;
displayPrice = document.getElementById("displayPrice");

// event handlers
document.getElementById("priceCategory").addEventListener("change", updatePrice);

function updatePrice() {
    // when client chooses price type
    console.log("inside AJAX updatePrice")
    priceCategory = document.getElementById("priceCategory").value;
    console.log(priceCategory);
    let AJAX = new XMLHttpRequest();

    AJAX.onerror = function () { alert("Error") };
    AJAX.onload = function () {
        if (this.status == 200) {
            let results = JSON.parse(this.responseText);
            console.log("back to Ajax updatePrice");
            displayPrice.innerHTML = results;
        }
        else {displayPrice.innerHTML = JSON.parse(this.responseText) };
    }
    AJAX.open("GET", "/pricing?category=" + priceCategory);
    AJAX.send();
};


updatePrice();

