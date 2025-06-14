const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("api-reference", {
    title: "API Reference | Notiq",
    currentPath: "/api-reference",
  })
})

module.exports = router
