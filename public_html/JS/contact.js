let signupBtn = document.getElementById("newsletterSignupBtn");

// event handlers
signupBtn.addEventListener("click", newsletterSignup);


function newsletterSignup() {
    // when client clicks add button
   
    console.log("inside AJAX newsletterSignup")
    
    let userFirstName = document.getElementById("fname").value;
    let userLastName = document.getElementById("lname").value;
    let userEmail = document.getElementById("email").value;


    let AJAX = new XMLHttpRequest();

    AJAX.onerror = function () { alert("Error") };
    AJAX.onload = function () {
        if (this.status == 200) {
            // signup successful
            let results = JSON.parse(this.responseText);
            alert(results);
        }
        else if (this.status == 409) {
            // email already in database
            let results = JSON.parse(this.responseText);
            alert(results);
        }
        else {
            // not in proper format
            let results = JSON.parse(this.responseText);
            alert(results);
        }
    };
    AJAX.open("POST", "/contact");
    AJAX.setRequestHeader("Content-Type", "application/json");
    AJAX.send(JSON.stringify({ "fname": userFirstName, "lname": userLastName, "email": userEmail }));

};
