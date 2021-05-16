# Twitter Scrubber

This application allows users to utilize the vast array of data held by twitter api so that it can generate leads based on social media posts related to specific services. 

This application is a MySQL-Express-React-Node (MERN) full-stack application. On the back-end, an express server listens for requests, and interacts with the mysql database or the google books API to serve the user with results. React's stateful nature facilitates a clean and simple setup of the DOM which is dynamic and responsive to the user input.



## Installing

To access code for use or development, clone the Github repository onto your local machine using:

```
git clone https://github.com/muggsieXIV/TwitterScrubber.git
```

To download the necessary dependencies, navigate into the cloned directory and enter the following in terminal:

```
npm install
```

To being running the react app on your local machine, navigate into the cloned repository and run:
```
npm start
``` 


## Built With

* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Express](https://www.npmjs.com/package/express)
* [MySQL](https://dev.mysql.com/doc/)
* [Bootstrap](https://getbootstrap.com/)
* [React](https://reactjs.org/)

## Application Functionality

On the 'Login' page, users can:
* Register and or Login. -> Needs to have a forgotten login option. 

On the 'Home' page, users can:
* Search for tweets using keywords, a feature which utilizes the twitter API.
* View the search results enlarged on the section at the page's top.
* Save any of the search results. -> in development
* Message a twitter user -> in development
* Allows user to create message templates -> in development
* Provides a user the ability to save 'Hot Lead' Clients -> in development
* Allows a user to link their social accounts -> in development
* Update information and delete account -> in development
* Create and generate Lead Report -> in development

