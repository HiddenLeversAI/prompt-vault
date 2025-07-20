// Prompt data storage
let allPrompts = [];
let currentCategory = 'all';

// DOM elements
const promptsContainer = document.getElementById('promptsContainer');
const searchInput = document.getElementById('searchInput');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize the app
async function init() {
    await loadPrompts();
    setupEventListeners();
    renderPrompts();
}

// Load prompts from JSON files
async function loadPrompts() {
    try {
        promptsContainer.innerHTML = '<div class="loading">Loading prompts...</div>';
        
        const categories = ['writing', 'coding', 'marketing', 'business'];
        const promptArrays = await Promise.all(
            categories.map(async (category) => {
                try {
                    const response = await fetch(`prompts/${category}.json`);
                    if (response.ok) {
                        const data = await response.json();
                        return data.prompts.map(prompt => ({ ...prompt, category }));
                    }
                    return [];
                } catch (error) {
                    console.warn(`Could not load ${category} prompts:`, error);
                    return [];
                }
            })
        );
        
        allPrompts = promptArrays.flat();
        
        if (allPrompts.length === 0) {
            // Load sample prompts if no JSON files found
            allPrompts = getSamplePrompts();
        }
    } catch (error) {
        console.error('Error loading prompts:', error);
        allPrompts = getSamplePrompts();
    }
}

// Sample prompts for demo
function getSamplePrompts() {
    return [
        {
            id: 1,
            title: "Blog Post Writer",
            content: "Write a comprehensive blog post about [TOPIC]. Include an engaging introduction, 3-5 main points with examples, and a compelling conclusion. Target length: 800-1200 words. Tone: [professional/casual/friendly]",
            category: "writing",
            tags: ["blog", "content", "seo"]
        },
        {
            id: 2,
            title: "Code Review Assistant",
            content: "Review the following code for best practices, potential bugs, and optimization opportunities. Provide specific suggestions for improvement with code examples. Focus on: readability, performance, and maintainability.",
            category: "coding",
            tags: ["review", "optimization", "debugging"]
        },
        {
            id: 3,
            title: "Email Campaign Creator",
            content: "Create a 3-email marketing sequence for [PRODUCT/SERVICE]. Email 1: Introduction and value proposition. Email 2: Benefits and social proof. Email 3: Clear call-to-action with urgency. Include subject lines for each.",
            category: "marketing",
            tags: ["email", "campaign", "conversion"]
        },
        {
            id: 4,
            title: "Business Strategy Analyzer",
            content: "Analyze the following business idea/strategy: [DESCRIPTION]. Provide a SWOT analysis, identify the target market, suggest 3 revenue streams, and outline potential challenges with mitigation strategies.",
            category: "business",
            tags: ["strategy", "analysis", "planning"]
        },
        {
            id: 5,
            title: "Python Function Generator",
            content: "Create a Python function that [DESCRIPTION]. Include proper error handling, type hints, docstring with examples, and unit tests. Follow PEP 8 style guidelines.",
            category: "coding",
            tags: ["python", "function", "testing"]
        },
        {
            id: 6,
            title: "Social Media Hook Generator",
            content: "Generate 10 attention-grabbing hooks for [TOPIC] that would work well on [PLATFORM]. Each hook should be under [CHARACTER LIMIT] characters and encourage engagement. Include relevant emojis.",
            category: "marketing",
            tags: ["social media", "hooks", "engagement"]
        }
    ];
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        renderPrompts(searchTerm);
    });
    
    // Category navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                const category = link.dataset.category;
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                currentCategory = category;
                renderPrompts();
            }
        });
    });
}

// Render prompts to the page
function renderPrompts(searchTerm = '') {
    let filteredPrompts = allPrompts;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filteredPrompts = filteredPrompts.filter(prompt => 
            prompt.category === currentCategory
        );
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredPrompts = filteredPrompts.filter(prompt => 
            prompt.title.toLowerCase().includes(searchTerm) ||
            prompt.content.toLowerCase().includes(searchTerm) ||
            prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    // Clear container
    promptsContainer.innerHTML = '';
    
    if (filteredPrompts.length === 0) {
        promptsContainer.innerHTML = '<div class="no-results">No prompts found. Try adjusting your search or category filter.</div>';
        return;
    }
    
    // Render each prompt
    filteredPrompts.forEach(prompt => {
        const promptCard = createPromptCard(prompt);
        promptsContainer.appendChild(promptCard);
    });
}

// Create a prompt card element
function createPromptCard(prompt) {
    const card = document.createElement('div');
    card.className = 'prompt-card';
    
    card.innerHTML = `
        <div class="prompt-header">
            <h3 class="prompt-title">${prompt.title}</h3>
            <span class="prompt-category">${prompt.category}</span>
        </div>
        <div class="prompt-content">${prompt.content}</div>
        <div class="prompt-meta">
            <div class="prompt-tags">
                ${prompt.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
            <button class="copy-button" onclick="copyPrompt(${prompt.id})">
            <button class="copy-button" onclick="copyPrompt(event, ${prompt.id})">
                Copy Prompt
            </button>
        </div>
    `;
    
    return card;
}

// Copy prompt to clipboard
async function copyPrompt(event, promptId) {
    const prompt = allPrompts.find(p => p.id === promptId);
    if (!prompt) return;
    
    try {
        await navigator.clipboard.writeText(prompt.content);
        
        // Update button state
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    } catch (error) {
        console.error('Failed to copy:', error);
        alert('Failed to copy prompt. Please try again.');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);