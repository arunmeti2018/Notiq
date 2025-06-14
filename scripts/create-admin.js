const mongoose = require("mongoose")
const User = require("../models/User")
require("dotenv").config()

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/docs-site")

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" })
    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.username)
      return
    }

    // Create admin user
    const adminUser = new User({
      username: "admin",
      email: "admin@example.com",
      password: "admin123", // Change this password!
      role: "admin",
    })

    await adminUser.save()
    console.log("Admin user created successfully!")
    console.log("Username: admin")
    console.log("Password: admin123")
    console.log("Please change the password after first login!")
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await mongoose.disconnect()
  }
}

createAdminUser()
