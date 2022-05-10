const sessionConfig = {
  name: 'session',
  secret: "secret",
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
