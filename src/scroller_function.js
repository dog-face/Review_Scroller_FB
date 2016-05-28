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