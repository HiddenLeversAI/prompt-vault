# Prompt Vault

A simple, clean website for storing and organizing AI prompts. Built with vanilla HTML, CSS, and JavaScript.

## Features

- 📁 Organized by categories (Writing, Coding, Marketing, Business)
- 🔍 Instant search functionality
- 📋 One-click copy to clipboard
- 📱 Responsive design for all devices
- 🚀 Fast and lightweight (no framework dependencies)

## Project Structure

```
prompt-vault/
├── index.html          # Main page
├── assets/
│   ├── styles.css     # Styling
│   └── script.js      # JavaScript functionality
├── prompts/           # JSON files for each category
│   ├── writing.json
│   ├── coding.json
│   ├── marketing.json
│   └── business.json
└── pages/
    └── about.html     # About page
```

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. That's it! No build process required

## Adding New Prompts

Edit the JSON files in the `prompts/` directory. Each prompt should follow this format:

```json
{
  "id": 101,
  "title": "Prompt Title",
  "content": "The actual prompt content with [PLACEHOLDERS]",
  "tags": ["tag1", "tag2", "tag3"]
}
```

## Deployment

This is a static site that can be hosted anywhere:
- GitHub Pages
- Netlify
- Vercel
- Any web server

For GitHub Pages:
1. Push to GitHub
2. Go to Settings > Pages
3. Select source branch
4. Your site will be live at `https://[username].github.io/prompt-vault/`

## License

Open source - feel free to use and modify as needed.