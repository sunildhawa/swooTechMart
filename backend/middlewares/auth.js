const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Apna User model ka sahi path dein

const auth = async (req, res, next) => { // async add kiya kyunki DB query karni hai
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        status: false,
        message: "Token required"
      });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🚀 LIVE STATUS CHECK: Database se user nikaalein
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User account no longer exists"
      });
    }

    // ❌ AGAR USER INACTIVE HAI TOH BLOCK KAREIN
    if (user.status === 0 || user.status === false) {
      return res.status(403).json({ // 403 Forbidden
        status: false,
        message: "Aapka account admin dwara block kar diya gaya hai!"
      });
    }

    // Pura user object pass karein taaki controller mein kaam aaye
    req.user = user; 

    next();

  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid token"
    });
  }
};

module.exports = auth;