categoryValue = document.querySelector('input[name="classLevel"]:checked').value;
console.log(categoryValue);
//displayClasses = document.getElementById("displayClasses");

// event handlers
document.getElementById("levels").addEventListener("click", updateLevel);


function updateLevel() {

    // when client chooses class level with radio button
    console.log("inside AJAX updateLevel")
    categoryValue = document.querySelector('input[name="classLevel"]:checked').value;
    let AJAX = new XMLHttpRequest();

    AJAX.onerror = function () { alert("Error") };
    AJAX.onload = function () {
        if (this.status == 200) {
            let results = JSON.parse(this.responseText);
            console.log("back to Ajax updateLevel");
            console.log(results)
            document.getElementById("displayClasses").innerHTML = results;
        }
        else { document.getElementById("displayClasses").innerHTML = JSON.parse(this.responseText) };
    }
    AJAX.open("GET", "/classes?category=" + categoryValue);
    AJAX.send();
};


updateLevel();


