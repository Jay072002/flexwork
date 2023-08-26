// Import required packages and modules

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/db");
const router = require("./routes/index");
const passport = require("passport");
const passportRouter = require("./routes/passport");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
require("./service/googleAuth");
require("./service/linkedInAuth");
require("./service/githubAuth");

const app = express();

// Use express middlewares
app.use(express.json()); // Parse JSON requests

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: "GET,POST,PUT,DELETE", // Allow these HTTP methods
    credentials: true, // Allow cookies to be passed from client to server
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 1000, // Session expiry time (in milliseconds)
  })
);

app.use(cookieParser()); // Parse cookie headers

// Add session-related functions to request object
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    // Add regenerate() function to session object if it doesn't exist
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    // Add save() function to session object if it doesn't exist
    request.session.save = (cb) => {
      cb();
    };
  }
  console.log(request.session);
  next();
});

app.use(passport.initialize()); // Initialize Passport authentication middleware
app.use(passport.session()); // Add session support to Passport middleware

// Define app routes
app.use("/auth", passportRouter); // Route requests to /auth to the passportRouter module
app.use("/api/v1", router); // Route requests to /api/v1 to the router module

const PORT = process.env.PORT;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI); // Connect to the MongoDB database
    console.log("CONNECTED TO DB SUCCESSFULLY..!");

    app.listen(PORT, () => {
      console.log(`server is running and listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
