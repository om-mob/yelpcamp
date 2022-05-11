const MongoStore = require("connect-mongo");

// const dbUrl = "mongodb://localhost:27017/yelp-camp";
const dbUrl = process.env.DB_URL;
const secret = process.env.SECRET || "secret"

const MongoStoreOptions = {
  mongoUrl: dbUrl,
  // crypto: {
  //   secret,
  // },
  // touchAfter: 24 * 60 * 60,
};

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: dbUrl,
    // secret: "secret",
  }),
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

module.exports = sessionConfig;
