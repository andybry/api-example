api-example
===========

An example of my JavaScript code.


## About

This is a Web application built in JavaScript. It connects to a JSON API owned by the Daily Mirror
that I archited and constructed when I was working for Trinity Mirror.

The application allows a user to quickly look through the latest articles in various categories on
the Daily Mirror site.

When the user opens the application first they are faced with a choice of 4 categories. The user
can proceed by clicking on one of the categories. This loads articles associated with the category.

On the next screen the user can change category by clicking buttons at the top of the window, or
filter the current articles by entering a case-sensitive search term in the filter box (only 
articles that contain matches for this phrase in their titles will be displayed.


## Running

Once downloaded or unzipped, the application can be run by opening the index.html file in
a web browser (I have tested against the most recent versions of Chrome, Firefox and Safari).


## Running the tests

The tests use karma. To run them do the following:

1. `npm install -g karma-cli`
2. `npm install` (from inside the project)
3. `karma`


## Recompiling the JavaScript and CSS files

The application uses gulp so after running `npm install` you can run `$(npm bin)/gulp` to recompile.


