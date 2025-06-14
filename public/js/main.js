// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const sidebar = document.querySelector(".fixed.inset-y-0.z-50")
  const mainContent = document.querySelector(".flex-1")

  if (mobileMenuBtn && sidebar && mainContent) {
    mobileMenuBtn.addEventListener("click", () => {
      // Toggle sidebar visibility
      if (sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('-translate-x-full')
        sidebar.classList.add('translate-x-0')
      } else {
        sidebar.classList.remove('translate-x-0')
        sidebar.classList.add('-translate-x-full')
      }
    })

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (event) => {
      const isMobile = window.innerWidth < 1024 // lg breakpoint
      const isClickInsideSidebar = sidebar.contains(event.target)
      const isClickOnMenuButton = mobileMenuBtn.contains(event.target)

      if (isMobile && !isClickInsideSidebar && !isClickOnMenuButton) {
        sidebar.classList.remove('translate-x-0')
        sidebar.classList.add('-translate-x-full')
      }
    })

    // Handle window resize
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) {
        sidebar.classList.remove('-translate-x-full')
        sidebar.classList.add('translate-x-0')
      } else {
        sidebar.classList.remove('translate-x-0')
        sidebar.classList.add('-translate-x-full')
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

// Dark mode toggle
document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  // Check for saved theme in localStorage
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    htmlElement.classList.add('dark');
    if (sunIcon && moonIcon) {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'inline-block';
    }
  } else {
    htmlElement.classList.remove('dark');
    if (sunIcon && moonIcon) {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'inline-block';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        if (sunIcon && moonIcon) {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'inline-block';
        }
      } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        if (sunIcon && moonIcon) {
          moonIcon.style.display = 'none';
          sunIcon.style.display = 'inline-block';
        }
      }
    });
  }
});
