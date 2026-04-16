const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false   
    },

    image: {
      type: String,
      default: null
    },

    role: {
      type: String,
      default: "admin",
      enum: ["admin", "superadmin"]
    },

    status: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);
const adminModel = mongoose.model("Admin", adminSchema);
module.exports = adminModel;
