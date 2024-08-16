# Microservices Web Application Tool for Teaching API vulnerabilities Exploits and Defences

## Introduction

## Project Description
This project is a front-end and back-end separation project, this is the front-end of the project, The front-end is based on `Vue` + `Vue-router` + `Vuex` + `Element-ui` + `Axios` implementation. The back-end project is another file.

The front-end implements a welcome page, an introduction to API vulnerabilities, an information page, a challenge progress tracker, an interactive guide, challenge clues, simulation of mall-related features, challenge results, and an introduction to fixing API vulnerabilities.

The back-end has adopted the MVC model, and the corresponding interface, control layer, and data persistence layer have been designed according to the data required by the front-end in modules. The back-end has been deployed to AliCloud, the online back-end address is:

## Functional Module
### Welcome Page
The welcome page provides the user with the necessary information to use the application and allows the user to access the information page through the welcome page to see a more detailed description of the security vulnerability.

### Log in
The page uses element-ui's `Dialog` to achieve the effect of popping up a masked dialog, the `Login` button is set in the App.vue root component, and the `showLogin` state in the `vuex` controls whether the login box is displayed or not.

This is designed so that you can log in either by clicking a button on the page, or by automatically popping up the login box when the user visits a page that requires login verification, or when the backend returns a prompt that requires login verification, which reduces the number of page hops and simplifies the user's operation.

User input data is often unreliable, so the project front and back end of the login information is verified , the front end based on element-ui form checking , customized checking rules for checking .

### Registration
The page also uses element-ui's `Dialog` to achieve the effect of popup mask dialog, the `Register` button is set in the root component of App.vue, and the parent-child component passes a value to control whether or not the registration box is displayed.

User input data is often unreliable, so this project both front and back end of the same registration information for the check, the front end based on element-ui form checking way, customized check rules for checking.

### Scoreboard
The Scoreboard page is the page where the user tracks the progress of the challenges and opens them, and where the user can select the challenge they want to start.

### Simulation Mall
When the user starts the challenge, he/she will enter a simulated shopping mall that has a collection of API security vulnerabilities that need to be discovered by the user. The simulated shopping mall has some of the basic features that a shopping mall needs to have, including all product displays, product detail pages, shopping carts, order checkout, order details, user information, and other pages.

### Interactive Instructions and Hints
Interactive guidance is implemented using Websocket and this function module gives feedback based on the user's actions. Additionally, the clues feature allows users to view three different clues to help them complete the challenge.

## Instruction
> Online Visit: The front-end has been deployed in the AliCloud, Google is the most compatible browser for this project, you are welcome to use Google to access this project, visit the link for:

> Local Visit:Make sure you have installed Node, then open the command line by typing cmd under the root path of the front-end project and enter the compile command:
npm install
Then enter the run command:
npm run serve

> The backend interface address has been changed to a local address, if you need to run the backend, please also run the backend program. If you want to use online backend, please modify the backend address in the project project-front-end\src\globa1.js || project-front-end\vue.config.js to:
