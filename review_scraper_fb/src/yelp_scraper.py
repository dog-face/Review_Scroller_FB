from selenium import webdriver
from selenium.webdriver.common.keys import Keys

import json


driver = webdriver.Firefox()
driver.get("http://www.yelp.com/biz/fireborn-studios-pittsburgh")
assert "Fireborn Studios" in driver.title
all_review_elements = driver.find_element_by_class_name("ylist-bordered")
authors = all_review_elements.find_elements_by_class_name("review-sidebar-content")
reviews = all_review_elements.find_elements_by_class_name("review-content")
stars = all_review_elements.find_elements_by_class_name("rating-very-large")

json_reviews = []
json_authors = []
json_stars = []
for i, review in enumerate(reviews):
    review_output = open("../output/review" + str(i + 1) + ".txt", "w+")
    review_content = review.find_element_by_css_selector("p")
    review_output.write(review_content.text + "\n")
    json_reviews.append(review_content.text)

    author_output = open("../output/author" + str(i+1) + ".txt", "w+")
    author = authors[i+1].find_element_by_class_name("user-display-name")
    author_output.write(author.text)
    json_authors.append(author.text)

    stars_output = open("../output/star" + str(i+1) + ".txt", "w+")
    star_element = stars[i].find_element_by_class_name("star-img")
    num_stars = star_element.get_attribute("title").split(".")[0]
    json_stars.append(num_stars)

json_review_output = open("../output/json_review_output.json", "w")
json.dump(json_reviews, json_review_output)

json_author_output = open("../output/json_author_output.json", "w")
json.dump(json_authors, json_author_output)

json_stars_output = open("../output/json_stars_output.json", "w")
json.dump(json_stars, json_stars_output)

print("Done. ")