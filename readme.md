The Lab: Front-End Frameworks: Angular 4
===========

This repository contains the sample code for an Angular 4 update to [Front-End Frameworks: AngularJS](http://www.letscodejavascript.com/v3/episodes/lab/13), a three-part series in James Shore's [Let's Code: Test-Driven JavaScript](http://www.letscodejavascript.com) screencast. Let's Code: Test-Driven JavaScript is a screencast series focused on rigorous, professional JavaScript development.

Those episodes were an exploration and review of the [AngularJS "1"](https://angularjs.org/) framework for building web applications. This repository updates the application built in that series to [Angular "2"](https://angular.io/). It demonstrates several concepts:

1. **Sample application.** The sample application code can be found in `src`. The main page is in `index.html`. The Angular UI code consists of several components, which may be found in `src/app`.

  The application also includes a domain layer, value objects, and a (simulated) persistence layer. Those layers are in subdirectories of `src`. This architecture was an experiment to see how well Angular handled an approach outside of its comfort zone. It's not necessarily a pattern to follow in your own applications. (In particular, the way value objects are rendered was an experiment to see how well Angular could deal with an unusual architecture, not something to emulate.)


2. **Unit Tests.** All the code is unit tested. There are a few different styles used; my favorite is in `app/configuration_field/configuration-field.component.spec.ts`. That file also demonstrates how to test changes to a form field, something that wasn't well documented.

See the screencasts for more information about the history of the sample app.


Setup
-----

To try this code on your own computer:

1. Install [Node.js](http://nodejs.org/download/). This repo was built with Node v8.7.0.
2. Download and unzip the source code into a convenient directory.
3. Install angular-cli globally: `npm install -g angular-cli`
4. Rebuild modules: `npm rebuild`


Running the Sample Application
------------------------------

1. Run `ng serve`
2. Open `http://localhost:4200` in a browser.
3. The page will automatically update when you make changes to the source code.


Running the Tests
-----------------

1. Install Google Chrome if you haven't already. 
2. Run `ng test -sm=false`
3. The tests will automatically re-run when you make changes to the source code.


License
-------

MIT License. See `LICENSE.TXT`.

