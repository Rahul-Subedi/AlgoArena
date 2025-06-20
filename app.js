const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
require("dotenv").config();

const Submission = require("./models/submission");
const User = require("./models/user");

const app = express();

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB Error:", err));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
  secret: "keyboardcat123",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// ✅ Inject user info globally
app.use(async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        req.user = user;
        res.locals.currentUser = user;
        res.locals.username = user.username;
      }
    } catch (err) {
      console.error("User fetch error:", err);
    }
  } else {
    res.locals.currentUser = null;
    res.locals.username = null;
  }
  next();
});

// ✅ Routes
const authRoutes = require("./routes/auth");
const problemRoutes = require("./routes/problems");
const submissionRoutes = require("./routes/submissions");
const runRoutes = require("./routes/run");
const profileRoutes = require("./routes/profile"); // Make sure this includes /user/:id/view
const leaderboardRoutes = require("./routes/leaderboard");

app.use(authRoutes);
app.use(problemRoutes);
app.use("/submissions", submissionRoutes);
app.use("/run", runRoutes);
app.use("/profile", profileRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/api", leaderboardRoutes); // Optional duplicate if needed for API

// ✅ Home Route
app.get("/", (req, res) => {
  res.render("home", { currentUser: req.user });
});

// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// ✅ Start Server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
