const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("api-reference", {
    title: "API Reference | Minimal Docs Site",
    currentPath: "/api-reference",
  })
})

module.exports = router
