import mongoose, { connect } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 0,
        },
        medication: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medication",
        },
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    ImageUrl: {
      type: String,
      default: "../frontend/src/assets/default/defaultProfile.png",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", userSchema);

export default User;
