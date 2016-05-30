#created by mznco

from selenium import webdriver
import sys
from selenium.webdriver.common.keys import Keys

import json

########
# YELP #
########
driver = webdriver.Firefox()

print("Scraping Yelp...", end=" ")
sys.stdout.flush()
driver.get("http://www.yelp.com/biz/fireborn-studios-pittsburgh")
assert "Fireborn Studios" in driver.title
all_review_elements = driver.find_element_by_class_name("ylist-bordered")
authors = all_review_elements.find_elements_by_class_name("review-sidebar-content")
reviews = all_review_elements.find_elements_by_class_name("review-content")
stars = all_review_elements.find_elements_by_class_name("rating-very-large")

json_reviews = []
json_authors = []
json_stars = []
json_source = []
for i, review in enumerate(reviews):
    #review_output = open("../output/review" + str(i + 1) + ".txt", "w+")
    review_content = review.find_element_by_css_selector("p")
    #review_output.write(review_content.text + "\n")
    json_reviews.append(review_content.text)

    #author_output = open("../output/author" + str(i+1) + ".txt", "w+")
    author = authors[i+1].find_element_by_class_name("user-display-name")
    #author_output.write(author.text)
    json_authors.append(author.text)

    #stars_output = open("../output/star" + str(i+1) + ".txt", "w+")
    star_element = stars[i].find_element_by_class_name("star-img")
    num_stars = star_element.get_attribute("title").split(".")[0]
    json_stars.append(num_stars)

    json_source.append("Yelp")
print("Done.")

##########
# Google #
##########
print("Scraping Google...", end=" ")
sys.stdout.flush()
driver.get("https://www.google.com/search?client=safari&rls=en&q=Fireborn+Studios,+2338+Sarah+St,+Pittsburgh,+PA+15203&ie=UTF-8&oe=UTF-8")
view_all_reviews = driver.find_element_by_xpath("//*[contains(text(), 'View all Google reviews')]")
view_all_reviews = view_all_reviews.click()

driver.implicitly_wait(3)#wait for javascript reviews to load
all_review_elements = driver.find_element_by_id("reviewSort") #_D7k, _B7k, _N9k
#print("num elements: " + str(len(all_review_elements)))

#expand all snippets:
view_more_links = driver.find_elements_by_class_name("review-more-link")
for link in view_more_links:
    link.click()

reviews = all_review_elements.find_elements_by_xpath("//span[@jsl='$t t-HoBr0JCFrys;$x 0;']")
stars = all_review_elements.find_elements_by_xpath("//span[@class='_pxg _Jxg']")
authors = all_review_elements.find_elements_by_class_name("_e8k")

#print(len(reviews))
#print(len(stars))
#print(len(authors))

for i, review_element in enumerate(authors):
    json_authors.append(authors[i].text)
    json_reviews.append(reviews[i].text)
    num_stars = stars[i].get_attribute("aria-label").split(" ")[1].split(".")[0] #don't touch this
    #print(authors[i].text + " " + num_stars)
    #print(reviews[i].text + "\n")
    json_stars.append(num_stars)
    json_source.append("Google")
print("Done.")
#write to disk

json_review_output = open("../output/json_review_output.json", "w")
json.dump(json_reviews, json_review_output)

json_author_output = open("../output/json_author_output.json", "w")
json.dump(json_authors, json_author_output)

json_stars_output = open("../output/json_stars_output.json", "w")
json.dump(json_stars, json_stars_output)

json_source_output = open("../output/json_source_output.json", "w")
json.dump(json_source, json_source_output)
print("ALL DONE. ")