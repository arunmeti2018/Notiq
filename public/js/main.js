// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const sidebar = document.querySelector(".fixed.inset-y-0")

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("sidebar-mobile")
      sidebar.classList.toggle("open")
    })

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (window.innerWidth < 1024) {
        if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          sidebar.classList.add("sidebar-mobile")
          sidebar.classList.remove("open")
        }
      }
    })
  }

  // Search functionality
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase()
      // Simple search implementation - you can enhance this
      console.log("Searching for:", query)
      // Add your search logic here
    })
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add copy button to code blocks
  document.querySelectorAll("pre code").forEach((block) => {
    const button = document.createElement("button")
    button.className =
      "absolute top-2 right-2 px-2 py-1 text-xs bg-background border border-border rounded hover:bg-secondary transition-colors"
    button.textContent = "Copy"

    const pre = block.parentElement
    pre.style.position = "relative"
    pre.appendChild(button)

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(block.textContent)
        button.textContent = "Copied!"
        setTimeout(() => {
          button.textContent = "Copy"
        }, 2000)
      } catch (err) {
        console.error("Failed to copy text: ", err)
      }
    })
  })
})

// Theme toggle functionality (if you want to add dark mode)
function toggleTheme() {
  document.documentElement.classList.toggle("dark")
  localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light")
}

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark")
}
