This application is/was hosted on [Heroku](https://yelp-camp-58.herokuapp.com/). *if it still wokrs.*

# 🏕 YelpCamp

<a href="https://yelp-camp-58.herokuapp.com/">
 <div align="center">
  <img src="public/images/Screenshot-YelpCamp-1.png" alt="campground-screenshow">
 </div>
</a>

<hr />

YelpCamp is a website where users can create and review campgrounds. In order to review or create a campground, you must have an account.

This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.  

## Features
* Users can create, edit, and remove campgrounds
* Users can review campgrounds once, and edit or remove their review
* User profiles include the following information on the user (username, email, join date), their campgrounds, 
* Search campground by name
* Campgrounds are sorted by most reviewed.


## Run it locally
1. Install [mongodb](https://www.mongodb.com/)
2. Create a [cloudinary](https://cloudinary.com/) account to get an API key and secret code
3. Create [mapbox](https://docs.mapbox.com/) account to get an API key

```
git clone https://github.com/om-mob/yelpcamp.git
cd YelpCamp
npm install
```

## Built With

- [Node.js](https://nodejs.org) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [express](https://expressjs.com//) - Fast, unopinionated, minimalist web framework for Node.js.
- [MongoDB](https://www.mongodb.com/) - The database for
  modern applications.
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js.
- [ejs](https://ejs.co/) - Embedded JavaScript templating
- [passport.js](https://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js.

## Middlewares
- [method-override](https://expressjs.com/en/resources/middleware/method-override.html) - Handles Delete and Put Requests.
- [express-session](https://github.com/expressjs/session) - Handles Session. *required by passport and flash.*
- [connect-flash](https://github.com/jaredhanson/connect-flash) - storing flash messages, used in combination with redirects.
- [passport](https://www.passportjs.org/) - Handles user authentication.
- [connect-mongo](https://www.npmjs.com/package/connect-mongo)  - *not a middleware* -  works with express-session as a *Session Stores* instead of using memory.
- [multer](https://github.com/expressjs/multer) - Parses the Request body and files.
#### security
- [helmet](https://github.com/helmetjs/helmet) - helps secure the app by setting various HTTP headers. It's not a silver bullet, but it can help!
- [express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize) - *not a middleware* - used with **joi** to validate user inputs when creating or editing a campground, and when writing a reveiw.
- [joi](https://joi.dev/api/?v=17.6.0) handles user input validation.

<hr />

Create a .env file (or just export manually in the terminal) in the root of the project and add the following:  

```
DB_URL='<url>'
CLOUDINARY_URL='<key>'
CLOUDINARY_SECRET='<secret>'
CLOUDINARY_KEY='<key>'
CLOUDINARY_CLOUD_NAME='<name>'
MAPBOX_TOKEN='<token>'
```

Run ```mongod``` in another terminal and ```node app.js``` in the terminal with the project.  

Then go to [localhost:8080](http://localhost:8080/).