/*
 * Scrolling reviews
 */
var counter = 0;
var json_authors = [];
var json_reviews = [];

function loop() {
    if (counter >= json_reviews.length) counter = 0;
    $('#reviewText').text(json_reviews[counter]);
    $('#authorName').text(json_authors[counter]);
    //document.getElementById('reviewText').innerHTML = reviews[counter];
    //document.getElementById('authorName').innerHTML = authors[counter];
    counter++;
    setTimeout(loop, 5000);
    //alert(json_reviews[counter]);
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
