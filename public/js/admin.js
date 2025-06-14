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

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const sidebar = document.querySelector(".admin-sidebar")

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open")
    })

    // Close sidebar when clicking outside
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          sidebar.classList.remove("open")
        }
      }
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
          e.stopPropagation();
          dropZone.style.display = 'block';
        });

        markdownEditor.addEventListener('dragover', function (e) {
          e.preventDefault();
          e.stopPropagation();
        });

        markdownEditor.addEventListener('dragleave', function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (!this.contains(e.relatedTarget)) {
            dropZone.style.display = 'none';
          }
        });

        markdownEditor.addEventListener('drop', function (e) {
          e.preventDefault();
          e.stopPropagation();
          dropZone.style.display = 'none';

          const files = e.dataTransfer.files;
          if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onload = function (e) {
                const imageUrl = e.target.result;
                const imageMarkdown = `![${file.name}](${imageUrl})`;
                const start = this.selectionStart;
                const end = this.selectionEnd;
                const text = this.value;
                this.value = text.substring(0, start) + imageMarkdown + text.substring(end);
                this.selectionStart = this.selectionEnd = start + imageMarkdown.length;
                updatePreview();
              }.bind(this);
              reader.readAsDataURL(file);
            }
          }
        });

        // Preview functionality
        previewBtn.addEventListener('click', function (e) {
          e.preventDefault();
          markdownEditor.style.display = 'none';
          previewContent.style.display = 'block';
          previewBtn.style.display = 'none';
          editBtn.style.display = 'inline-block';
          updatePreview();
        });

        editBtn.addEventListener('click', function (e) {
          e.preventDefault();
          markdownEditor.style.display = 'block';
          previewContent.style.display = 'none';
          previewBtn.style.display = 'inline-block';
          editBtn.style.display = 'none';
        });

        // Update preview on input
        markdownEditor.addEventListener('input', updatePreview);

        // Initial preview update
        updatePreview();

        function updatePreview() {
          const markdown = markdownEditor.value;
          const html = marked.parse(markdown);
          const sanitizedHtml = DOMPurify.sanitize(html);
          previewContent.innerHTML = sanitizedHtml;
        }

        // Template selection
        const templateSelect = document.getElementById('template');
        if (templateSelect) {
          templateSelect.addEventListener('change', function () {
            const templateId = this.value;
            if (templateId) {
              fetchTemplateContent(templateId);
            }
          });
        }

        function fetchTemplateContent(templateId) {
          fetch(`/admin/templates/${templateId}/content`)
            .then(response => response.json())
            .then(data => {
              if (data.content) {
                markdownEditor.value = data.content;
                updatePreview();
              }
            })
            .catch(error => {
              console.error('Error fetching template:', error);
              showNotification('Failed to load template content', 'error');
            });
        }
      }
    }, 100); // Check every 100ms
  }
});

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 p-4 rounded shadow-lg ${type === "error" ? "bg-red-500" : "bg-green-500"
    } text-white`;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
