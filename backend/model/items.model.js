import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const itemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],

  category: { type: String, required: true },
  gender: {
    type: String,
    enum: ["Men", "Women", "Kids", "Unisex"],
    required: true,
  },
  type: { type: String, required: true }, // T-Shirt, Jeans, Dress, etc.
  size: { type: String },
  condition: {
    type: String,
    enum: ["New", "Like New", "Good", "Fair"],
    required: true,
  },
  tags: [{ type: String }],

  ownerId: { type: Types.ObjectId, ref: "User", required: true },

  status: {
    type: String,
    enum: ["available", "swapped", "reserved", "rejected"],
    default: "available",
  },

  isApproved: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

itemSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Item = model("Item", itemSchema);

export default Item;
