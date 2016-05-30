//created by mznco

/*
 * Scrolling reviews
 */
var counter = 0;
var json_authors = [];
var json_reviews = [];
var wait_time = 5000; //default wait time: 5 secs
var timer;
function loop() {
    timer = setTimeout(loop, wait_time);
    wait_time = 5000;
    if (counter >= json_reviews.length) counter = 0;
    if (counter < 0) counter = json_reviews.length-1;
    $('#reviewText').text(json_reviews[counter]);
    $('#authorName').text(json_authors[counter]);
    $('#stars').attr('src', "../resources/" + json_stars[counter] + "-star.png");
    counter++;
}

/*  
 * json data loading
 */
function load_json(){
    alert("loading");

    //load authors
    $.ajax({
        url: "../review_scraper_fb/output/json_author_output.json",
        dataType: "json",
        success: function(response) {
            json_authors = response;
            //alert(response);
        },
        async: false
    });

    //load review content
    $.ajax({
        url: "../review_scraper_fb/output/json_review_output.json",
        dataType: "json",
        success: function(response) {
            json_reviews = response;
            //alert(response);
        },
        async: false
    });

    $.ajax({
        url: "../review_scraper_fb/output/json_stars_output.json",
        dataType: "json",
        success: function(response){
            json_stars = response;
            alert(response);
        },
        async:false
    });
}

/*
 * Main
 */
function load_and_run() {
    load_json();
    alert("running");
    loop();
}

function test() {
    $('#reviewText').text("Hello, review!");
    alert("testing");
}

function scroll_next(){
    clearTimeout(timer);
    wait_time = 10000; //extra delay for reading
    loop();
}
function scroll_prev(){
    counter -= 2;
    clearTimeout(timer);
    wait_time = 10000; //extra delay for reading
    loop();
}
