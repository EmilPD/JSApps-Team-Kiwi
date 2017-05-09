# JavaScript-Applications-Team-Kiwi
Team Work for JavaScript Applications (April-May 2017)

## Application Description

Kiwi Classifieds is a Single Page Application developed by Team "Kiwi" as part of the JavaScript Applications course at Telerik Academy 2016/17.

### Main features:

- login
- register as user
- register as vip user - as VIP User you have also phone and email stored
- post new Ad
- post new Offer - it include Price
- select category - it will show only Ads/Offers from taht Category
- If you are logged-in as VIP User, every Ad/Offer that you post will also include your Phone and Email
- when you are logged-in you can post Comments to every Ads/Offers
- share Ad/Offer information on facebook

### Used Libraries:

- [SystemJS](https://github.com/systemjs/systemjs)
- [Navigo](https://github.com/krasimir/navigo)
- [Twitter Bootstrap](http://getbootstrap.com/)
- [Handlebars](http://handlebarsjs.com/)
- [jQuery](https://jquery.com/)
- [jQuery UI](https://jqueryui.com/) 
- [crypto-js](https://github.com/brix/crypto-js)
- [expressjs](https://expressjs.com/)
- [lowdb](https://github.com/typicode/lowdb)
- [toastr](https://github.com/CodeSeven/toastr)

### Team Members

| Name | Student system username |
|:----:|:-----------------------:|
| [Емил Димитров](https://github.com/EmilPD) | qwerty123   |
| [Денислав Стоянов](https://github.com/denislav48) | d3n1000 |


<h2><a href="https://kiwi-classifieds.herokuapp.com">Live Demo</a></h2>
<br>

### Project requirements

1. Use JQuery - we use it
2. Implement OOP design
- At least 3 modules /there are many more than 3/
    - requester
    - data
    - routing
    - template loader
    - many more
- At least 7 classes
    - Person
    - User - extends Person
    - VIP User - extends User
    - Ad
    - Small Ad - extends Ad
    - Offer - extends Small Ad
    - Comment
3. Unit tests using Mocha, Chai and SinonJS - [Tests are here](https://kiwi-classifieds.herokuapp.com/tests/)
4. Implement a UI for your application - we use JQuery UI for Comment modal dialg
5. Use some kind of web data storage - we use node.js with express.js and lowdb
6. Use some kind of local storage - we store authKey and User Name in localStorage
7. At least one third-party API to share something from your application - we use share on Facebook - for every Ad/Offer you can share information on Facebook
8. Use Twitter Bootstrap - we use it
9. The application must work in the latest versions of the browsers - [Here are screenshots](https://github.com/EmilPD/JSApps-Team-Kiwi/tree/master/browsers_compatibility)
10. Deploy your application on a cloud server of your choice - we use [Heroku](https://kiwi-classifieds.herokuapp.com)
11. Record a short video showcasing your application
12. Register your application at Telerik Academy Showcase System
