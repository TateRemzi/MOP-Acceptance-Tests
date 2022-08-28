# MOP-Acceptance-Tests

Acceptance tests to run before diverting traffic to the production endpoint. 

## To add a test for a newly added use case

* In the *UseCases.spec* file, copy the scenario of one of the use cases
* Change the scenario name with your new use case
* Add the step to click your new use case *Click "Use case name here"*
* If your use cases is loaded in a page that includes the navigation bar, include the *"Confirm items in navigation bar"*
* Also copy the other steps that confirm the images and links in the navigation bar
* In the *Must have*  step, ,make sure the table contains the element text you would expect to see in the use case page

![Alt text](usecase.jpg "Use case example")
