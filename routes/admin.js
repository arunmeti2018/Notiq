const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs").promises
const router = express.Router()

// Set the layout for all admin views
// router.use((req, res, next) => {
//   res.locals.layout = 'admin/layout'; 
//   next();
// });

const User = require("../models/User")
const Page = require("../models/Page")
const Template = require("../models/Template")
const { isAuthenticated, isAuthorized, attachUser } = require("../middleware/auth")
const { markdownToHtml, generateSlug, extractTableOfContents } = require("../utils/markdown")

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../public/uploads")
    try {
      await fs.mkdir(uploadDir, { recursive: true })
      cb(null, uploadDir)
    } catch (error) {
      cb(error)
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only image files are allowed"))
    }
  },
})

// Admin base route - Redirect to login or dashboard
router.get("/", (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect("/admin/dashboard")
  }
  res.redirect("/admin/login")
})

// Login page
router.get("/login", (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect("/admin/dashboard")
  }
  res.render("admin/login", {
    title: "Admin Login",
    layout: false,
    error: req.query.error,
    currentPath: req.path,
  })
})

// Login POST
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
      isActive: true,
    })

    if (!user || !(await user.comparePassword(password))) {
      return res.redirect("/admin/login?error=Invalid credentials")
    }

    if (!["admin", "editor"].includes(user.role)) {
      return res.redirect("/admin/login?error=Access denied")
    }

    req.session.userId = user._id
    res.redirect("/admin/dashboard")
  } catch (error) {
    console.error("Login error:", error)
    res.redirect("/admin/login?error=Login failed")
  }
})

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err)
    }
    res.redirect("/admin/login")
  })
})

// Dashboard
router.get("/dashboard", isAuthorized(["admin", "editor"]), async (req, res) => {
  try {
    const totalPages = await Page.countDocuments()
    const publishedPages = await Page.countDocuments({ isPublished: true })
    const draftPages = await Page.countDocuments({ isPublished: false })
    const recentPages = await Page.find().populate("author", "username").sort({ updatedAt: -1 }).limit(5)

    res.render("admin/dashboard", {
      title: "Admin Dashboard",
      user: req.user,
      stats: {
        totalPages,
        publishedPages,
        draftPages,
      },
      recentPages,
      layout: 'admin/layout',
      currentPath: '/admin/dashboard'
    })
  } catch (error) {
    console.error("Dashboard error:", error)
    res.render("admin/error", {
      title: "Error",
      error: "Failed to load dashboard",
      layout: 'admin/layout',
      currentPath: '/admin/dashboard'
    })
  }
})

// Pages list
router.get("/pages", isAuthorized(["admin", "editor"]), async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = 10
    const skip = (page - 1) * limit

    const filter = {}
    if (req.query.status) {
      filter.isPublished = req.query.status === "published"
    }
    if (req.query.category) {
      filter.category = req.query.category
    }

    const pages = await Page.find(filter).populate("author", "username").sort({ updatedAt: -1 }).skip(skip).limit(limit)

    const totalPages = await Page.countDocuments(filter)
    const totalPageCount = Math.ceil(totalPages / limit)

    const categories = await Page.distinct("category")

    res.render("admin/pages", {
      title: "Manage Pages",
      user: req.user,
      pages,
      categories,
      currentPage: page,
      totalPages: totalPageCount,
      hasNextPage: page < totalPageCount,
      hasPrevPage: page > 1,
      nextPage: page + 1,
      prevPage: page - 1,
      query: req.query,
      layout: 'admin/layout',
      currentPath: '/admin/pages'
    })
  } catch (error) {
    console.error("Pages list error:", error)
    res.render("admin/error", {
      title: "Error",
      error: "Failed to load pages",
      layout: 'admin/layout',
      currentPath: '/admin/pages'
    })
  }
})

// New page form
router.get("/pages/new", isAuthorized(["admin", "editor"]), async (req, res) => {
  try {
    const templates = await Template.find().sort({ category: 1, name: 1 })

    res.render("admin/page-form", {
      title: "Create New Page",
      user: req.user,
      page: null,
      isEdit: false,
      templates,
      layout: 'admin/layout',
      currentPath: '/admin/pages/new'
    })
  } catch (error) {
    console.error("New page form error:", error)
    res.render("admin/error", {
      title: "Error",
      error: "Failed to load page form",
      layout: 'admin/layout',
      currentPath: '/admin/pages/new'
    })
  }
})

// Get template content (AJAX endpoint)
router.get("/templates/:id", isAuthorized(["admin", "editor"]), async (req, res) => {
  try {
    const template = await Template.findById(req.params.id)
    if (!template) {
      return res.status(404).json({ error: "Template not found" })
    }

    // Increment usage count
    template.usageCount += 1
    await template.save()

    res.json({
      success: true,
      content: template.content,
      name: template.name,
      description: template.description,
    })
  } catch (error) {
    console.error("Template fetch error:", error)
    res.status(500).json({ error: "Failed to fetch template" })
  }
})

// Create page
router.post("/pages", isAuthorized(["admin", "editor"]), upload.single("featuredImage"), async (req, res) => {
  try {
    const { title, markdownContent, description, category, tags, isPublished, order, seoTitle, seoDescription } =
      req.body

    const slug = generateSlug(title)
    const existingPage = await Page.findOne({ slug })
    if (existingPage) {
      const templates = await Template.find().sort({ category: 1, name: 1 })
      return res.render("admin/page-form", {
        title: "Create New Page",
        user: req.user,
        page: req.body,
        isEdit: false,
        templates,
        error: "A page with this title already exists",
        layout: 'admin/layout'
      })
    }

    const content = markdownToHtml(markdownContent)

    const pageData = {
      title,
      slug,
      content,
      markdownContent,
      description,
      category: category || "General",
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      author: req.user._id,
      isPublished: isPublished === "on",
      order: Number.parseInt(order) || 0,
      seoTitle,
      seoDescription,
    }

    if (req.file) {
      pageData.featuredImage = `/uploads/${req.file.filename}`
    }

    const page = new Page(pageData)
    await page.save()

    res.redirect("/admin/pages")
  } catch (error) {
    console.error("Create page error:", error)
    const templates = await Template.find().sort({ category: 1, name: 1 })
    res.render("admin/page-form", {
      title: "Create New Page",
      user: req.user,
      page: req.body,
      isEdit: false,
      templates,
      error: "Failed to create page",
      layout: 'admin/layout'
    })
  }
})

// Edit page form
router.get("/pages/:id/edit", isAuthorized(["admin", "editor"]), async (req, res) => {
  try {
    const page = await Page.findById(req.params.id)
    if (!page) {
      return res.status(404).render("admin/error", {
        title: "Page Not Found",
        error: "Page not found",
        layout: 'admin/layout'
      })
    }

    const templates = await Template.find().sort({ category: 1, name: 1 })

    res.render("admin/page-form", {
      title: "Edit Page",
      user: req.user,
      page,
      isEdit: true,
      templates,
      layout: 'admin/layout'
    })
  } catch (error) {
    console.error("Edit page error:", error)
    res.render("admin/error", {
      title: "Error",
      error: "Failed to load page",
      layout: 'admin/layout'
    })
  }
})

// Update page
router.post("/pages/:id", isAuthorized(["admin", "editor"]), upload.single("featuredImage"), async (req, res) => {
  try {
    const page = await Page.findById(req.params.id)
    if (!page) {
      return res.status(404).render("admin/error", {
        title: "Page Not Found",
        error: "Page not found",
        layout: 'admin/layout'
      })
    }

    const { title, markdownContent, description, category, tags, isPublished, order, seoTitle, seoDescription } =
      req.body

    const slug = generateSlug(title)
    if (slug !== page.slug) {
      const existingPage = await Page.findOne({ slug, _id: { $ne: page._id } })
      if (existingPage) {
        const templates = await Template.find().sort({ category: 1, name: 1 })
        return res.render("admin/page-form", {
          title: "Edit Page",
          user: req.user,
          page: { ...page.toObject(), ...req.body },
          isEdit: true,
          templates,
          error: "A page with this title already exists",
          layout: 'admin/layout'
        })
      }
    }

    const content = markdownToHtml(markdownContent)

    page.title = title
    page.slug = slug
    page.content = content
    page.markdownContent = markdownContent
    page.description = description
    page.category = category || "General"
    page.tags = tags ? tags.split(",").map((tag) => tag.trim()) : []
    page.isPublished = isPublished === "on"
    page.order = Number.parseInt(order) || 0
    page.seoTitle = seoTitle
    page.seoDescription = seoDescription

    if (req.file) {
      page.featuredImage = `/uploads/${req.file.filename}`
    }

    await page.save()
    res.redirect("/admin/pages")
  } catch (error) {
    console.error("Update page error:", error)
    const templates = await Template.find().sort({ category: 1, name: 1 })
    res.render("admin/page-form", {
      title: "Edit Page",
      user: req.user,
      page: req.body,
      isEdit: true,
      templates,
      error: "Failed to update page",
      layout: 'admin/layout'
    })
  }
})

// Delete page
router.delete("/pages/:id", isAuthorized(["admin", "editor"]), async (req, res) => {
  try {
    const page = await Page.findById(req.params.id)
    if (!page) {
      return res.status(404).json({ error: "Page not found" })
    }

    await Page.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    console.error("Delete page error:", error)
    res.status(500).json({ error: "Failed to delete page" })
  }
})

// Preview page
router.get("/pages/:id/preview", isAuthorized(["admin", "editor"]), async (req, res) => {
  try {
    const page = await Page.findById(req.params.id).populate("author", "username")
    if (!page) {
      return res.status(404).render("admin/error", {
        title: "Page Not Found",
        error: "Page not found",
        layout: 'admin/layout'
      })
    }

    res.render("admin/preview", {
      title: `Preview: ${page.title}`,
      user: req.user,
      page,
      layout: 'admin/layout'
    })
  } catch (error) {
    console.error("Preview page error:", error)
    res.render("admin/error", {
      title: "Error",
      error: "Failed to load preview",
      layout: 'admin/layout'
    })
  }
})

// Templates management
router.get("/templates", isAuthorized(["admin", "editor"]), async (req, res) => {
  try {
    const templates = await Template.find().populate("author", "username").sort({ category: 1, name: 1 })

    const categories = await Template.distinct("category")

    res.render("admin/templates", {
      title: "Manage Templates",
      user: req.user,
      templates,
      categories,
      layout: 'admin/layout'
    })
  } catch (error) {
    console.error("Templates list error:", error)
    res.render("admin/error", {
      title: "Error",
      error: "Failed to load templates",
      layout: 'admin/layout'
    })
  }
})

// New template form
router.get("/templates/new", isAuthorized(["admin", "editor"]), (req, res) => {
  res.render("admin/template-form", {
    title: "Create New Template",
    user: req.user,
    template: null,
    isEdit: false,
    layout: 'admin/layout'
  })
})

// Create template
router.post("/templates", isAuthorized(["admin", "editor"]), async (req, res) => {
  try {
    const { name, description, category, content, icon } = req.body

    const template = new Template({
      name,
      description,
      category,
      content,
      icon: icon || "📄",
      author: req.user._id,
      isSystem: false,
    })

    await template.save()
    res.redirect("/admin/templates")
  } catch (error) {
    console.error("Create template error:", error)
    res.render("admin/template-form", {
      title: "Create New Template",
      user: req.user,
      template: req.body,
      isEdit: false,
      error: "Failed to create template",
      layout: 'admin/layout'
    })
  }
})

// Edit template form
router.get("/templates/:id/edit", isAuthorized(["admin", "editor"]), async (req, res) => {
  try {
    const template = await Template.findById(req.params.id)
    if (!template) {
      return res.status(404).render("admin/error", {
        title: "Template Not Found",
        error: "Template not found",
        layout: 'admin/layout'
      })
    }

    res.render("admin/template-form", {
      title: "Edit Template",
      user: req.user,
      template,
      isEdit: true,
      layout: 'admin/layout'
    })
  } catch (error) {
    console.error("Edit template error:", error)
    res.render("admin/error", {
      title: "Error",
      error: "Failed to load template",
      layout: 'admin/layout'
    })
  }
})

// Update template
router.post("/templates/:id", isAuthorized(["admin", "editor"]), async (req, res) => {
  try {
    const template = await Template.findById(req.params.id)
    if (!template) {
      return res.status(404).render("admin/error", {
        title: "Template Not Found",
        error: "Template not found",
        layout: 'admin/layout'
      })
    }

    // Prevent editing system templates by non-admin users
    if (template.isSystem && req.user.role !== "admin") {
      return res.status(403).render("admin/error", {
        title: "Access Denied",
        error: "Cannot edit system templates",
        layout: 'admin/layout'
      })
    }

    const { name, description, category, content, icon } = req.body

    template.name = name
    template.description = description
    template.category = category
    template.content = content
    template.icon = icon || "📄"

    await template.save()
    res.redirect("/admin/templates")
  } catch (error) {
    console.error("Update template error:", error)
    res.render("admin/template-form", {
      title: "Edit Template",
      user: req.user,
      template: req.body,
      isEdit: true,
      error: "Failed to update template",
      layout: 'admin/layout'
    })
  }
})

// Delete template
router.delete("/templates/:id", isAuthorized(["admin", "editor"]), async (req, res) => {
  try {
    const template = await Template.findById(req.params.id)
    if (!template) {
      return res.status(404).json({ error: "Template not found" })
    }

    // Prevent deleting system templates by non-admin users
    if (template.isSystem && req.user.role !== "admin") {
      return res.status(403).json({ error: "Cannot delete system templates" })
    }

    await Template.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    console.error("Delete template error:", error)
    res.status(500).json({ error: "Failed to delete template" })
  }
})

module.exports = router
