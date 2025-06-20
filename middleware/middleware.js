const User = require("../models/user"); // Make sure to import your User model

module.exports.isLoggedIn = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.redirect("/login");
    }
    req.user = user; // 👈 Attach the user to req.user
    next();
  } catch (err) {
    console.error("❌ Middleware Error:", err);
    res.status(500).send("Internal Server Error");
  }
};
