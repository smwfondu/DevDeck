# Project Title: DevDeck

## Course Information

* Course: Software Engineering II 2025 Spring - COMP 4120 201
* Instructor: Dr. Daly
* Student: Christian Ambrosini, Ryan Cayton, William Fondoulis, Vraj Patel
* Date: In-progress

## Description

DevDeck is a resume builder tailored for CS majors to help them get started on the path to mass application and a higher chance of
success within what is an incredibly difficult and competitive field!

## Live Demo

To run the program: [DevDeck](https://www.cs.uml.edu/~wfondoul/)

## Technology Stack

* Frontend: HTML, CSS
* Backend: -
* Deployment: UML Server (frontend & backend)

## Cloning Our Project

To clone DevDeck, simply use the command git clone https://github.com/smwfondu/DevDeck.git. Currently, DevDeck is being hosted on 
https://www.cs.uml.edu/~wfondoul/ and being updated manually from pushes to the GitHub repository. However, work is being done 
on using coninuous integration tools to automatically push changes to the website.

## Testing

Our testing file for DevDeck is found at unit_tests.cpp and contain all of the unit tests to test the functionality of the 
GitHub integration (reading data from a GitHub user's repositories). To run the tests simply build them using:  
"g++ -o test unit_tests.cpp -lboost_unit_test_framework" and run the tests by simply running: "./test"