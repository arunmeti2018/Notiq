const mongoose = require("mongoose")
const User = require("../models/User")
require("dotenv").config()

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Notiq")


    // Create admin user
    const adminUser = new User({
      username: "arun",
      email: "arun@gmail.com",
      password: "arun123", // Change this password!
      role: "admin",
    })

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: "arun" })
    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.username)
      return
    }

    
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
