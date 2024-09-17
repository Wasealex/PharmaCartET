import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || "secret", {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // set to true if your using https in production
      sameSite: "lax", //
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate token" });
  }
};

export default generateToken;
