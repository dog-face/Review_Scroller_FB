/*
 * Loading from files
 */
var reviews = [];
var authors = [];
function LoadFile(num) {
    //load file from iframe
    var oFrame = document.getElementById("reviewFile" + num);
    var rawContent = oFrame.contentWindow.document.body.childNodes[0].innerHTML;

    //Remove carriage returns
    //Remove carriage returns
    while (rawContent.indexOf("\r") >= 0)
        rawContent = rawContent.replace("\r", "");

    //parse and prove that it's working
    var arrLines = rawContent.split("\n");
    /*alert("File " + oFrame.src + " has " + arrLines.length + " lines");
    for (var i = 0; i < arrLines.length; i++) {
        var curLine = arrLines[i];
        alert("Line #" + (i + 1) + " is: '" + curLine + "'");
    }*/

    //add reviews and authors to arrays
    reviews.push(arrLines[0]);
    authors.push(arrLines[1]);
}



/*
 * Scrolling reviews
 */

//review changing function
var counter = 0;
function loop() {
    if (counter >= reviews.length) counter = 0;
    document.getElementById('reviewText').innerHTML = reviews[counter];
    document.getElementById('authorName').innerHTML = authors[counter];
    counter++;
    setTimeout(loop, 1000);
}
loop();

function simple_loop() {
    document.getElementById('textslide').firstElementChild.innerHTML = "Hello, World!";
}

