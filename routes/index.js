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
        title: customHomePage.seoTitle || `${customHomePage.title} | Notiq`,
        description: customHomePage.seoDescription || customHomePage.description,
        currentPath: "/",
        page: customHomePage,
      })
    }

    // Fallback to default home page
    res.render("index", {
      title: "Introduction | Notiq",
      currentPath: "/",
    })
  } catch (error) {
    console.error("Home page error:", error)
    res.render("index", {
      title: "Introduction | Notiq",
      currentPath: "/",
    })
  }
})

module.exports = router
