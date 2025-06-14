const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("components", {
    title: "Components | Minimal Docs Site",
    currentPath: "/components",
  })
})

module.exports = router
