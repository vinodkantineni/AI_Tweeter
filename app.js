document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.getElementById('btnLoader');
    const resultsSection = document.getElementById('resultsSection');
    const voiceSummaryDisplay = document.getElementById('voiceSummary');
    const tweetsListDisplay = document.getElementById('tweetsList');

    // Modal Logic
    const helpIcon = document.getElementById('helpIcon');
    const workflowModal = document.getElementById('workflowModal');
    const closeModal = document.getElementById('closeModal');

    helpIcon.addEventListener('click', () => {
        workflowModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        workflowModal.classList.add('hidden');
    });

    workflowModal.addEventListener('click', (e) => {
        if (e.target === workflowModal) {
            workflowModal.classList.add('hidden');
        }
    });

    generateBtn.addEventListener('click', async () => {
        // Collect inputs
        const brandName = document.getElementById('brandName').value.trim() || "The Brand";
        const industry = document.getElementById('industry').value.trim() || "";
        const objective = document.getElementById('objective').value;
        const productDesc = document.getElementById('productDesc').value.trim();

        // Basic validation
        if (!productDesc) {
            alert("Please provide the Product / Brand Description.");
            return;
        }

        // Setup loading state
        setLoadingState(true);

        try {
            // Generate content
            const payload = await generateBrandData(brandName, industry, objective, productDesc);

            // Render outputs
            renderSummary(payload.voiceSummary);
            renderTweets(payload.tweets);

            // Show results section
            resultsSection.classList.remove('hidden');
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } catch (error) {
            console.error("Error generating content:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoadingState(false);
        }
    });

    function setLoadingState(isLoading) {
        if (isLoading) {
            generateBtn.disabled = true;
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            generateBtn.style.opacity = '0.8';
        } else {
            generateBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            generateBtn.style.opacity = '1';
        }
    }

    async function generateBrandData(brandName, industry, objective, productDesc) {
        // API KEY NEEDED HERE to make live dynamic requests
        const API_KEY = "";

        if (API_KEY === "YOUR_GEMINI_API_KEY_HERE" || API_KEY === "YOUR_NEW_KEY_GOES_HERE" || !API_KEY) {
            // Failsafe in case user forgets to add key
            throw new Error("Please insert your real Gemini API Key directly into the app.js code (line 80) to enable live dynamic generation.");
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        // Construct the prompt using the dynamic form variables
        const prompt = `
        You are an expert Social Media Manager and Copywriter.
        
        Analyze the following brand details:
        - Brand Name: ${brandName}
        - Industry/Category: ${industry}
        - Campaign Objective: ${objective}
        - Brand/Product Description: ${productDesc}
        
        Task 1: Brand Voice Analysis
        If the brand "${brandName}" is a known entity, deeply analyze its real-world social media presence, historical ad campaigns, and common communication style (e.g., Wendy's roasts, Apple's minimalism, Nike's inspiration). If not a known entity, vividly infer the best possible voice based on the industry and product description. 
        Output exactly 3-4 bullet points summarizing the defined brand tone, target audience, and specific content themes/styles they use.
        
        Task 2: Content Generation
        Generate 10 highly realistic tweets in the exact brand voice established in Task 1. Ensure the tweets sound like authentic real-world social media posts, utilizing appropriate formatting, emojis, or lack thereof, depending strictly on how the brand would talk. They must align with the campaign objective ("${objective}") and match the products.
        Ensure a mix of styles:
        - 3 Engaging/Conversational
        - 3 Promotional
        - 2 Witty/Meme-style
        - 2 Informative/Value-driven
        
        Output Format (STRICT JSON FORMAT):
        \`\`\`json
        {
        "voiceSummary": [
        "bullet point 1",
        "bullet point 2",
        "bullet point 3",
        "bullet point 4"
        ],
        "tweets": [
        { "style": "Conversational", "text": "Tweet text here..." },
        { "style": "Promotional", "text": "Tweet text here..." },
        ... etc for 10 tweets
        ]
        }
        \`\`\`
        
        Respond ONLY with the JSON object. Do not include markdown blocks or any other text before or after the JSON.
        `;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.8,
                    topK: 40,
                    topP: 0.95
                }
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error?.message || "Failed to communicate with Gemini API.");
        }

        const data = await response.json();

        // Extract raw text from the Gemini response structure
        let rawText = data.candidates[0].content.parts[0].text;

        // Clean up markdown syntax if Gemini included it despite instructions
        rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

        // Parse the dynamic JSON and return it securely
        try {
            return JSON.parse(rawText);
        } catch (e) {
            console.error("Failed to parse JSON string:", rawText);
            throw new Error("AI returned malformed data. Please try again.");
        }
    }

    function renderSummary(summaryArray) {
        voiceSummaryDisplay.innerHTML = '';
        const ul = document.createElement('ul');
        ul.className = 'summary-list';

        // Fix for when Gemini returns all bullet points in a single string 
        // Example: ["1. point 1 \n 2. point 2 \n 3. point 3"] -> ["point 1", "point 2", "point 3"]
        let processedPoints = [];
        summaryArray.forEach(point => {
            if (point.includes('\n')) {
                // Split by newline and remove empty lines
                processedPoints = processedPoints.concat(point.split('\n').filter(p => p.trim() !== ''));
            } else {
                processedPoints.push(point);
            }
        });

        processedPoints.forEach(point => {
            // Clean up any stray bullet point characters or numbers the AI appended to the string
            let cleanPoint = point.replace(/^[\d\-\.\*•]+\s*/, '').trim();
            if (cleanPoint) {
                const li = document.createElement('li');
                li.textContent = cleanPoint;
                ul.appendChild(li);
            }
        });

        voiceSummaryDisplay.appendChild(ul);
    }

    function renderTweets(tweetsArray) {
        tweetsListDisplay.innerHTML = '';

        tweetsArray.forEach((tweet, index) => {
            const card = document.createElement('div');
            card.className = 'tweet-card';
            // Stagger animation delays for grid items
            card.style.animationDelay = `${index * 0.1}s`;

            card.innerHTML = `
        <div class="tweet-header">
            <span class="tweet-badge">${tweet.style}</span>
            <button class="tweet-copy" data-text="${tweet.text}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
            </button>
        </div>
        <div class="tweet-content">${tweet.text}</div>
    `;

            tweetsListDisplay.appendChild(card);
        });

        // Add copy event listeners
        document.querySelectorAll('.tweet-copy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const text = e.currentTarget.getAttribute('data-text');
                navigator.clipboard.writeText(text).then(() => {
                    const originalHtml = e.currentTarget.innerHTML;
                    e.currentTarget.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span style="color:#10b981">Copied</span>
            `;
                    setTimeout(() => {
                        e.currentTarget.innerHTML = originalHtml;
                    }, 2000);
                });
            });
        });
    }
});
