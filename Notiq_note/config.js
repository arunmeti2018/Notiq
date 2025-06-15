// Configuration file for API keys and other settings
const config = {
  GEMINI_API_KEY: "AIzaSyCx1c_Lc4FjgexeQh3KnsG8QEr4KJKRA6Y",
};

// Export the configuration
if (typeof module !== "undefined" && module.exports) {
  module.exports = config;
} else {
  window.config = config;
}
