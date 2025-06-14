const User = require("../models/User")

// Check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next()
  }
  res.redirect("/admin/login")
}

// Check if user is admin or editor
exports.isAuthorized = (roles = ["admin"]) => {
  return async (req, res, next) => {
    try {
      if (!req.session || !req.session.userId) {
        return res.redirect("/admin/login")
      }

      const user = await User.findById(req.session.userId)
      if (!user || !user.isActive) {
        return res.redirect("/admin/login")
      }

      if (!roles.includes(user.role)) {
        return res.status(403).render("admin/error", {
          title: "Access Denied",
          error: "You don't have permission to access this resource",
          layout: "admin/layout",
        })
      }

      req.user = user
      next()
    } catch (error) {
      console.error("Authorization error:", error)
      res.redirect("/admin/login")
    }
  }
}

// Attach user to request if logged in
exports.attachUser = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId)
      if (user && user.isActive) {
        req.user = user
      }
    } catch (error) {
      console.error("Error attaching user:", error)
    }
  }
  next()
}
