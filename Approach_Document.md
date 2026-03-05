# BrandVoice AI - Tweet Generator Approach Document

## 1. How I Analysed Brand Voice
The brand voice analysis is powered by analyzing the user's inputs (Brand Name, Industry, Campaign Objective, and Product Description) and using **Google's Gemini 1.5 Flash** large language model (via API) to infer the appropriate tone. 

The prompt structure explicitly instructs the LLM to act as an "expert Social Media Manager and Copywriter." It takes the given inputs and generates a dedicated "Brand Voice Summary" composed of 3-4 bullet points that define the brand tone, target audience, and key content themes. We ask the model to establish these *before* generating the tweets to ensure consistency.

## 2. How I Structured My Prompts and Logic
The logic revolves around a single API call to the Gemini Vision API using a **structured JSON prompt design**. 

### Prompt Structure
The prompt is divided into context establishment and two specific tasks:
1. **Context Context:** We set the system persona to an expert copywriter and inject the user-provided details (Name, Industry, Objective, Description).
2. **Task 1: Brand Voice Summary:** Instructs the model to output a 3-4 bullet point summary of the inferred brand voice.
3. **Task 2: Content Generation:** Instructs the model to generate exactly 10 tweets aligned with the stated Campaign Objective. For the required mix of styles, we explicitly mandate the breakdown in the prompt (e.g., 3 Conversational, 3 Promotional, 2 Witty, 2 Informative).
4. **Output Restrictions:** The prompt mandates strict JSON output containing a `voiceSummary` array and a `tweets` array (with `style` and `text` keys). 

### UI/Client Logic
The application is purely Client-Side (Vanilla JS/HTML/CSS):
- User enters their custom Gemini API Key (for security, without requiring a backend server) and campaign details.
- JavaScript constructs the structured prompt, calls the Gemini API endpoint directly, and parses the returned JSON string.
- Finally, the app manipulates the DOM to render the Voice Summary and the Tweets into interactive, styled cards (with click-to-copy functionality).

## 3. Tools Used
- **Frontend Stack:** HTML5, CSS3, Vanilla JavaScript (No heavy frameworks for simplicity and high performance).
- **Styling:** Custom CSS with modern Glassmorphism aesthetics, fluid animations, and responsive flex/grid layouts.
- **AI / LLM:** Google Gemini 1.5 Flash via REST API (chosen for high speed and low cost/free tier).
- **Fonts/Icons:** Google Fonts (Outfit) and Inline SVGs.
