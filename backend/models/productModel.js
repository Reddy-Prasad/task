import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, // Ensures this field is mandatory
      trim: true, // Removes extra spaces from the value
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    profileImageLink: {
      type: String,
      required: false, // Optional field
      trim: true,
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/, // Regex for image URL validation
        "Please enter a valid image URL",
      ],
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export var ProductModel = mongoose.model("products", UserSchema);
