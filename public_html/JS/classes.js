classLevel = document.querySelector('input[name="classLevel"]:checked').value;
displayClasses = document.getElementById("displayClasses");

// event handlers
document.getElementById("levels").addEventListener("click", updateLevel);

function updateLevel() {
    // when client chooses class level with radio button
    console.log("inside AJAX updateLevel")
    classLevel = document.querySelector('input[name="classLevel"]:checked').value;
    console.log(classLevel);
    let AJAX = new XMLHttpRequest();

    AJAX.onerror = function () { alert("Error") };
    AJAX.onload = function () {
        if (this.status == 200) {
            let results = JSON.parse(this.responseText);
            console.log("back to Ajax updateLevel");
            displayClasses.innerHTML = results;
        }
        else {displayClasses.innerHTML = JSON.parse(this.responseText) };
    }
    AJAX.open("GET", "/classes?level=" + classLevel);
    AJAX.send();
};


updateLevel();


