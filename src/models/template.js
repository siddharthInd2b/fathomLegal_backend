import mongoose from "mongoose";

// create schema
const templateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    price: {
      type: Number, // using Number for price
      required: true, // make it required (you can set to false if optional)
      min: 0, // price cannot be negative
    },
  },
  {
    timestamps: true,
  }
);

// create model based on that schema
const Template = mongoose.model("Template", templateSchema);

export default Template;
