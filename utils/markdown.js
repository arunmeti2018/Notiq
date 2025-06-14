const { marked } = require("marked")
const createDOMPurify = require("dompurify")
const { JSDOM } = require("jsdom")

const window = new JSDOM("").window
const DOMPurify = createDOMPurify(window)

// Configure marked options
marked.setOptions({
  highlight: (code, lang) => {
    // You can add syntax highlighting here using a library like highlight.js
    return `<pre><code class="language-${lang}">${code}</code></pre>`
  },
  breaks: true,
  gfm: true,
})

// Custom renderer for better styling
const renderer = new marked.Renderer()

renderer.heading = (text, level) => {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-")
  return `<h${level} id="${escapedText}" class="heading-${level} group">
    <a href="#${escapedText}" class="anchor-link opacity-0 group-hover:opacity-100 transition-opacity">
      <svg class="w-4 h-4 inline-block ml-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"></path>
      </svg>
    </a>
  </h${level}>`
}

renderer.code = (code, language) => {
  const validLang = language && language.match(/^[a-zA-Z0-9_+-]*$/) ? language : ""
  return `<div class="code-block-wrapper">
    <div class="code-block-header">
      <span class="code-language">${validLang || "text"}</span>
      <button class="copy-code-btn" onclick="copyCode(this)">Copy</button>
    </div>
    <pre class="bg-muted p-4 rounded-b-md overflow-x-auto"><code class="language-${validLang}">${code}</code></pre>
  </div>`
}

renderer.table = (header, body) => `<div class="table-wrapper overflow-x-auto">
    <table class="min-w-full border-collapse border border-border">
      <thead class="bg-muted">${header}</thead>
      <tbody>${body}</tbody>
    </table>
  </div>`

marked.use({ renderer })

exports.markdownToHtml = (markdown) => {
  if (!markdown) return ""
  const html = marked(markdown)
  return DOMPurify.sanitize(html)
}

exports.generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim("-")
}

exports.extractTableOfContents = (markdown) => {
  const headings = []
  const lines = markdown.split("\n")

  lines.forEach((line) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/[^\w]+/g, "-")
      headings.push({ level, text, id })
    }
  })

  return headings
}
