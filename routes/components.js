const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("components", {
    title: "Components | Notiq",
    currentPath: "/components",
  })
})

module.exports = router
