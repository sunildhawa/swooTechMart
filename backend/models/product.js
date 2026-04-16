const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  thumbnail: { type: String },
  description: { type: String },
  original_price: { type: Number, required: true },
  discount_percentage: { type: Number, default: 0 },
  final_price: { type: Number },
  status: { type: Boolean, default: true },
  stock: { type: Number, default: 1 },
  is_best_seller: { type: Boolean, default: true },
  show_home: { type: Boolean, default: true },
  is_featured: { type: Boolean, default: true },
  is_hot: { type: Boolean, default: true },
  other_images: [{ type: String }],
  category_id:{type: mongoose.Schema.Types.ObjectId, ref: "category", required: true},
  brand_id: { type: mongoose.Schema.Types.ObjectId, ref: "brand", required: true },
  color_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "color" }]
}, { timestamps: true });
const productData =  mongoose.model("products", ProductSchema);
module.exports = productData;
