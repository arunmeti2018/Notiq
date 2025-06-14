const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const fs = require("fs")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "public/uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Connect to MongoDB with better error handling
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Notiq", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  })

// Set EJS as templating engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Configure express-ejs-layouts
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)
app.set('layout', 'layout') // Set default layout
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)

// Middleware to set admin layout for admin routes
app.use('/admin', (req, res, next) => {
  res.locals.layout = 'admin/layout'
  next()
})

// Middleware
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Session middleware
const session = require("express-session")
const MongoStore = require("connect-mongo")

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key-change-this-in-production",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/Notiq",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
)

// Routes
const indexRouter = require("./routes/index")
const gettingStartedRouter = require("./routes/getting-started")
const componentsRouter = require("./routes/components")
const apiReferenceRouter = require("./routes/api-reference")
const adminRouter = require("./routes/admin")

app.use("/", indexRouter)
app.use("/getting-started", gettingStartedRouter)
app.use("/components", componentsRouter)
app.use("/api-reference", apiReferenceRouter)
app.use("/admin", adminRouter)

// Import the Page model
const Page = require("./models/Page")

// Dynamic page routes (add this before the 404 handler)
app.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      slug: req.params.slug,
      isPublished: true,
    }).populate("author", "username")

    if (!page) {
      return next() // Continue to 404 handler
    }

    res.render("page", {
      title: page.seoTitle || `${page.title} | Notiq`,
      description: page.seoDescription || page.description,
      currentPath: `/${page.slug}`,
      page,
    })
  } catch (error) {
    console.error("Dynamic page error:", error)
    next()
  }
})

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 - Page Not Found",
    currentPath: req.path,
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render("error", {
    title: "Error",
    error: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message,
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Admin panel available at http://localhost:${PORT}/admin`)
})
