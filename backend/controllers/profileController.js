const bcrypt = require("bcryptjs");

const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name,
      username,
      email,
      password,
    } = req.body;

    // Find current user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const normalizedUsername =
      username?.toLowerCase().trim();

    const normalizedEmail =
      email?.toLowerCase().trim();

    // Check username uniqueness
    if (
      normalizedUsername &&
      normalizedUsername !== user.username
    ) {
      const existingUsername =
        await User.findOne({
          username: normalizedUsername,
          _id: { $ne: userId },
        });

      if (existingUsername) {
        return res.status(409).json({
          message: "Username already exists",
        });
      }
    }

    // Check email uniqueness
    if (
      normalizedEmail &&
      normalizedEmail !== user.email
    ) {
      const existingEmail =
        await User.findOne({
          email: normalizedEmail,
          _id: { $ne: userId },
        });

      if (existingEmail) {
        return res.status(409).json({
          message: "Email already exists",
        });
      }
    }

    // Update name
    if (name) {
      user.name = name.trim();
    }

    // Update username
    if (normalizedUsername) {
      user.username = normalizedUsername;
    }

    // Update email
    if (normalizedEmail) {
      user.email = normalizedEmail;
    }

    // Update password only if provided
    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(
        password,
        10
      );
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",

      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(
      "Update profile error:",
      error
    );

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

module.exports = {
  updateProfile,
};