const mongoose = require("mongoose")

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["API", "Tutorial", "Guide", "FAQ", "Reference", "Getting Started", "Troubleshooting", "General"],
      default: "General",
    },
    content: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "📄",
    },
    isSystem: {
      type: Boolean,
      default: false, // System templates cannot be deleted
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Index for search functionality
templateSchema.index({ name: "text", description: "text", category: 1 })

module.exports = mongoose.model("Template", templateSchema)
