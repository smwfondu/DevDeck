# Project Title: DevDeck

## Course Information

* Course: Software Engineering II 2025 Spring - COMP 4120 201
* Instructor: Dr. Daly
* Student: Christian Ambrosini, Ryan Cayton, William Fondoulis, Vraj Patel
* Date: 4/28/2025

## Description

DevDeck is a resume builder tailored for CS majors to help them get started on the path to mass application and a higher chance of
success within what is an incredibly difficult and competitive field!

## Live Demo

To run the program: [DevDeck](https://www.cs.uml.edu/~wfondoul/)

## Technology Stack

* Frontend: HTML, CSS, JavaScript
* Backend: C++, JavaScript
* Deployment: UML Server (frontend & backend)

## Cloning Our Project

To clone DevDeck, simply use the command git clone https://github.com/smwfondu/DevDeck.git. Currently, DevDeck is being hosted on 
https://www.cs.uml.edu/~wfondoul/ and being updated manually from pushes to the GitHub repository. However, work is being done 
on using coninuous integration tools to automatically push changes to the website.

## Testing

Our testing file for DevDeck is found at unit_tests.cpp and contain all of the unit tests to test the functionality of the 
GitHub integration (reading data from a GitHub user's repositories). To run the tests simply build them using our supplied Makefile and the command: "make". The github_main.cpp may be run for an example output using "./Github_integration" and the tests may be run using "./test"

The <curl/curl.h> library is required for our testing files to build and run correctly. If the library is not already installed, one may install it simply by running the command: "sudo apt-get install libcurl-dev"
