const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("getting-started", {
    title: "Getting Started | Minimal Docs Site",
    currentPath: "/getting-started",
  })
})

module.exports = router
