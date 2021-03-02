# Paylocity-Assignment

This project showcases front-end, database, and back-end logic for a company trying to calculate the cost for employees and dependents.

# Technologies used

Front-end: Angular, CSS (Bootstrap), HTML, TypeScript, JavaScript<br/>
Back-end: C-Sharp<br/>
Database: SqlServer<br/>
Unit-Test: Jest, Karma<br/>

# Design

Based off the given information the design was implemented to show a wide range of different functionality.  No one part gets too specific as given the time to complete the assignment and the capacity of the development team (1 person) they felt it would be better to show off all parts in a basic way.
Examples are given for potential API calls to the server which would in turn call the database and retrieve information.  The main example would be loading in employees if a database existed with that companies employees so that the user on the client-side would have the ability to search of employees or even have autofill capabilities.
The front-end does most of the heavy lifting for this assignment as it handles all validations, saving, and submitting.  The UI is very simplistic and would definitely require assistance from a UX team to determine how best to lay out the page.

# Future Functionality

Given the time constraints and capacity, scope creep definitely seeped in many times during the development.  Additional functionality that would be nice to haves would be things like editing saved employees or deleting saved employees.  Much more validation logic needs to be put in place.  An Employee lookup window would be nice to have.  And much more.

# Testing
Testing for this application will require making sure all inputs can only handle the correct characters, i.e. no numbers or spaces or special symbols.
Making sure all cost values are correct when submitting a set of employees and there dependents.
Additional testing would include things like making sure all fields that are required are filled in.  All screens are flexible and match the requirements set forth by the abstract design.
