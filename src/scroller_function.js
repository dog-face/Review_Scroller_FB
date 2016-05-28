var quotes = [
    "quote1",
    "quote2",
    "quote3",
    "quote4",
    "quote5",
];

var counter = 0;

function loop() {
    if (counter > 4) counter = 0;
    document.getElementById('textslide').firstElementChild.innerHTML = quotes[counter];
    counter++;
    setTimeout(loop, 1000);
}
loop();

function simple_loop() {
    document.getElementById('textslide').firstElementChild.innerHTML = "Hello, World!";
}

function LoadFile() {
    var oFrame = document.getElementById("frmFile");
    var strRawContents = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
    while (strRawContents.indexOf("\r") >= 0)
        strRawContents = strRawContents.replace("\r", "");
    var arrLines = strRawContents.split("\n");
    alert("File " + oFrame.src + " has " + arrLines.length + " lines");
    for (var i = 0; i < arrLines.length; i++) {
        var curLine = arrLines[i];
        alert("Line #" + (i + 1) + " is: '" + curLine + "'");
    }
}