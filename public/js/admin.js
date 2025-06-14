// Admin panel JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Global drag and drop prevention
  document.addEventListener('dragenter', (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, true);

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, true);

  document.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, true);

  document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, true);

  // Copy code functionality
  window.copyCode = (button) => {
    const codeBlock = button.closest(".code-block-wrapper").querySelector("code")
    const text = codeBlock.textContent

    navigator.clipboard
      .writeText(text)
      .then(() => {
        const originalText = button.textContent
        button.textContent = "Copied!"
        button.classList.add("bg-green-100", "text-green-700")

        setTimeout(() => {
          button.textContent = originalText
          button.classList.remove("bg-green-100", "text-green-700")
        }, 2000)
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
      })
  }

  // Delete confirmation
  const deleteButtons = document.querySelectorAll("[data-delete]")
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const itemName = this.dataset.itemName || "this item"

      if (confirm(`Are you sure you want to delete ${itemName}? This action cannot be undone.`)) {
        const url = this.dataset.delete

        fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              // Remove the row or redirect
              const row = this.closest("tr")
              if (row) {
                row.remove()
              } else {
                window.location.reload()
              }
            } else {
              alert("Failed to delete item: " + (data.error || "Unknown error"))
            }
          })
          .catch((error) => {
            console.error("Error:", error)
            alert("Failed to delete item")
          })
      }
    })
  })

  // Auto-save draft functionality
  const markdownTextarea = document.getElementById("markdownContent")
  if (markdownTextarea) {
    let saveTimeout

    markdownTextarea.addEventListener("input", () => {
      clearTimeout(saveTimeout)
      saveTimeout = setTimeout(() => {
        // Auto-save draft (you can implement this feature)
        console.log("Auto-saving draft...")
      }, 2000)
    })
  }

  // Form validation
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const requiredFields = form.querySelectorAll("[required]")
      let isValid = true

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("border-red-500")

          // Remove error styling on input
          field.addEventListener(
            "input",
            function () {
              this.classList.remove("border-red-500")
            },
            { once: true },
          )
        }
      })

      if (!isValid) {
        e.preventDefault()
        alert("Please fill in all required fields")
      }
    })
  })

  // Image preview for file uploads
  const fileInputs = document.querySelectorAll('input[type="file"]')
  fileInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          let preview = input.parentNode.querySelector(".image-preview")
          if (!preview) {
            preview = document.createElement("div")
            preview.className = "image-preview mt-2"
            input.parentNode.appendChild(preview)
          }
          preview.innerHTML = `<img src="${e.target.result}" alt="Preview" class="w-full h-32 object-cover rounded border">`
        }
        reader.readAsDataURL(file)
      }
    })
  })

  // Search functionality
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase()
      const searchableElements = document.querySelectorAll("[data-searchable]")

      searchableElements.forEach((element) => {
        const text = element.textContent.toLowerCase()
        const row = element.closest("tr") || element.closest(".searchable-item")

        if (text.includes(query) || query === "") {
          if (row) row.style.display = ""
        } else {
          if (row) row.style.display = "none"
        }
      })
    })
  }

  // Tooltip functionality
  const tooltips = document.querySelectorAll("[data-tooltip]")
  tooltips.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      const tooltip = document.createElement("div")
      tooltip.className = "absolute z-50 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg"
      tooltip.textContent = this.dataset.tooltip
      tooltip.style.top = this.offsetTop - 30 + "px"
      tooltip.style.left = this.offsetLeft + "px"
      this.parentNode.appendChild(tooltip)
      this._tooltip = tooltip
    })

    element.addEventListener("mouseleave", function () {
      if (this._tooltip) {
        this._tooltip.remove()
        this._tooltip = null
      }
    })
  })

  // Page form specific functionality
  const markdownEditor = document.getElementById('markdownContent');
  const previewContent = document.getElementById('previewContent');
  const previewBtn = document.getElementById('previewBtn');
  const editBtn = document.getElementById('editBtn');
  const removeFeaturedImageBtn = document.getElementById('removeFeaturedImage');

  if (markdownEditor && previewContent && previewBtn && editBtn) {
    console.log('Page form elements found. Checking for marked and DOMPurify.');

    // Wait for both libraries to be loaded
    const checkLibraries = setInterval(() => {
      if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
        clearInterval(checkLibraries);
        console.log('Marked and DOMPurify are defined. Initializing markdown editor functionality.');

        // Configure marked options
        marked.setOptions({
          breaks: true,
          gfm: true,
          headerIds: true,
          mangle: false
        });

        // Create a drop zone overlay
        const dropZone = document.createElement('div');
        dropZone.style.position = 'absolute';
        dropZone.style.top = '0';
        dropZone.style.left = '0';
        dropZone.style.right = '0';
        dropZone.style.bottom = '0';
        dropZone.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        dropZone.style.border = '2px dashed #3B82F6';
        dropZone.style.borderRadius = '0.375rem';
        dropZone.style.display = 'none';
        dropZone.style.zIndex = '10';
        markdownEditor.parentElement.style.position = 'relative';
        markdownEditor.parentElement.appendChild(dropZone);

        // Handle drag events
        markdownEditor.addEventListener('dragenter', function (e) {
          e.preventDefault();
          dropZone.style.display = 'block';
        });

        markdownEditor.addEventListener('dragleave', function (e) {
          e.preventDefault();
          // Check if the drag is truly leaving the editor area
          const rect = markdownEditor.getBoundingClientRect();
          if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
            dropZone.style.display = 'none';
          }
        });

        markdownEditor.addEventListener('drop', function (e) {
          e.preventDefault();
          dropZone.style.display = 'none';
          const file = e.dataTransfer.files[0];
          if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (event) {
              const imageUrl = event.target.result;
              const markdownImage = `![Alt Text](${imageUrl})`;
              // Insert markdown image into textarea at cursor position
              const start = markdownEditor.selectionStart;
              const end = markdownEditor.selectionEnd;
              markdownEditor.value = markdownEditor.value.substring(0, start) +
                markdownImage +
                markdownEditor.value.substring(end);
              markdownEditor.selectionStart = markdownEditor.selectionEnd = start + markdownImage.length;
              updatePreview();
            };
            reader.readAsDataURL(file);
          } else if (file) {
            alert('Only image files are supported for drag and drop.');
          }
        });

        // Preview/Edit toggle
        previewBtn.addEventListener('click', function () {
          const markdown = markdownEditor.value;
          const cleanHtml = DOMPurify.sanitize(marked.parse(markdown));
          previewContent.innerHTML = cleanHtml;
          markdownEditor.classList.add('hidden');
          previewContent.classList.remove('hidden');
          previewBtn.classList.add('hidden');
          editBtn.classList.remove('hidden');
        });

        editBtn.addEventListener('click', function () {
          markdownEditor.classList.remove('hidden');
          previewContent.classList.add('hidden');
          editBtn.classList.add('hidden');
          previewBtn.classList.remove('hidden');
        });

        // Initial preview if content exists
        if (markdownEditor.value.trim() !== '') {
          // updatePreview();
          // Temporarily removed initial preview to prevent flicker/render issues
        }

        // Helper function for preview update (if needed elsewhere)
        function updatePreview() {
          const markdown = markdownEditor.value;
          const cleanHtml = DOMPurify.sanitize(marked.parse(markdown));
          previewContent.innerHTML = cleanHtml;
        }

        // Initial check for preview if on edit page and has content
        if (document.body.classList.contains('edit-page') && markdownEditor.value.trim() !== '') {
          updatePreview();
        }

        // Attach updatePreview to markdownEditor input for live updates
        markdownEditor.addEventListener('input', updatePreview);

      }
    }, 100); // Check every 100ms
  }

  // Admin Mobile sidebar toggle
  const adminMobileMenuBtn = document.getElementById('adminMobileMenuBtn');
  const sidebar = document.querySelector('.fixed.inset-y-0.z-50.flex.w-64'); // Specific selector for admin sidebar

  if (adminMobileMenuBtn && sidebar) {
    adminMobileMenuBtn.addEventListener('click', function () {
      // Toggle sidebar visibility
      if (sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');
      } else {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('-translate-x-full');
      }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (event) {
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      const isClickInsideSidebar = sidebar.contains(event.target);
      const isClickOnMenuButton = adminMobileMenuBtn.contains(event.target);

      if (isMobile && !isClickInsideSidebar && !isClickOnMenuButton) {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('-translate-x-full');
      }
    });

    // Handle window resize for desktop view
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) {
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');
      } else {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('-translate-x-full');
      }
    });
  }

  // Notification functions
function showNotification(message, type = "info") {
    const notificationContainer = document.getElementById("notificationContainer");
    if (!notificationContainer) {
      console.warn("Notification container not found.");
      return;
    }

    const notification = document.createElement("div");
    notification.className = `p-3 rounded-md shadow-md text-white flex items-center justify-between mt-2 fade-in fade-out 
            ${type === 'success' ? 'bg-green-500' : type === 'danger' ? 'bg-red-500' : 'bg-blue-500'}`;
    notification.innerHTML = `<span>${message}</span>
                            <button class="ml-4 text-white opacity-75 hover:opacity-100" onclick="this.parentElement.remove()">
                                &times;
                            </button>`;

    notificationContainer.appendChild(notification);

  setTimeout(() => {
      notification.remove();
    }, 5000);
}

  // Expose notification to global scope if needed (e.g., from EJS)
  window.showNotification = showNotification;

  // Date formatting function
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Expose formatDate to global scope
  window.formatDate = formatDate;
});
