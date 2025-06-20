const express = require("express");
const router = express.Router();
const User = require("../models/user");

// 📝 GET Register Form
router.get("/register", (req, res) => {
  res.render("register");
});

// 📝 POST Register User
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send("❌ Username already taken");
    }

    const user = new User({ username, email, password });
    await user.save();

    // Store user data in session
    req.session.userId = user._id;
    req.session.username = user.username;

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("❌ Error registering user");
  }
});

// 🔐 GET Login Form
router.get("/login", (req, res) => {
  res.render("login");
});

// 🔐 POST Login User
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.send("❌ Invalid username");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.send("❌ Invalid password");
    }

    // Store user data in session
    req.session.userId = user._id;
    req.session.username = user.username;

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("❌ Login error");
  }
});

// 🚪 Logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.send("❌ Error logging out");
    }
    res.redirect("/");
  });
});

module.exports = router;
