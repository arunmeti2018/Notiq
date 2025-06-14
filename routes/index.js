const express = require("express")
const router = express.Router()
const Page = require("../models/Page")

router.get("/", async (req, res) => {
  try {
    // Try to find a custom home page in the database
    const customHomePage = await Page.findOne({
      slug: "home",
      isPublished: true,
    }).populate("author", "username")

    if (customHomePage) {
      return res.render("page", {
        title: customHomePage.seoTitle || `${customHomePage.title} | Minimal Docs Site`,
        description: customHomePage.seoDescription || customHomePage.description,
        currentPath: "/",
        page: customHomePage,
      })
    }

    // Fallback to default home page
    res.render("index", {
      title: "Introduction | Minimal Docs Site",
      currentPath: "/",
    })
  } catch (error) {
    console.error("Home page error:", error)
    res.render("index", {
      title: "Introduction | Minimal Docs Site",
      currentPath: "/",
    })
  }
})

module.exports = router
