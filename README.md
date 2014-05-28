# gruntBase

Base project template for grunt setup

## Requirements
Besides Grunt, you will need to have [Node](http://nodejs.org) and [Bundler](http://bundler.io) installed. Bundler manages dependencies, which is especially helpful with projects using Compass.

## What you need to install the project
After you have Node Bundler and Grunt installed, you will need to run the following lines in your root, or if you use the "content" folder to gather your css/js/images, run it inside content/ to install all Bundler dependencies:

    $ bundle install 
    $ git add Gemfile Gemfile.lock
    
Running the following command in the root of your project will install all project dependencies through Node, to get your Grunt project going:

    $ npm install
