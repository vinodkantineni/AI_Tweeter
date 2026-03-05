# BrandVoice AI - Tweet Generator

A simple, beautiful AI-powered web workflow tool that generates 10 on-brand tweets for any given brand using Google's Gemini 1.5 Flash API. This project was created as an AI Internship Assignment.

## Features
- **Dynamic Brand Analysis**: Infers brand tone, target audience, and content themes based on user inputs.
- **Content Generation**: Automatically generates 10 high-quality tweets following a tailored mix of styles (Conversational, Promotional, Witty, Informative).
- **Responsive UI**: Glassmorphism aesthetic, mobile-friendly design, and smooth interactions.
- **One-Click Copy**: Easily copy the generated tweets to your clipboard.
- **Client-Side ONLY**: No backend needed. Simply provide your Gemini API key in the UI for secure processing.

## How to Run locally

1. Open your terminal or command prompt.
2. Navigate to this project directory:
   ```bash
   cd Tweet_Generator_App
   ```
3. Start a local Python HTTP server:
   ```bash
   python -m http.server 8000
   ```
4. Open your web browser and go to: **http://localhost:8000**
5. Enter your brand details and click **"Generate Tweets"** to see the UI layout and state changes using the predefined mock data.

## How to Test

You can test this tool for different brands to see the variation in tone. Here are some examples to try:

### Example 1: Durex (Witty & Bold Tone)
- **Brand Name**: Durex
- **Industry / Category**: Health / Wellness
- **Campaign Objective**: Engagement
- **Brand / Product Description**: We sell premium condoms and lubricants. We are known for our extremely witty, slightly suggestive, humorous, and bold social media presence. We often rely on clever wordplay, memes, and topical trends to talk about sexual wellness. 

### Example 2: Apple (Premium & Minimal Tone)
- **Brand Name**: Apple
- **Industry / Category**: Technology
- **Campaign Objective**: Promotion (Sales/Signups)
- **Brand / Product Description**: We sell premium smartphones, laptops, and wearables. Our marketing is highly minimalist, confident, innovative, and focused on design and privacy. We rarely use emojis or jokes, keeping statements short and impactful.

## Deliverables included
1. **Source Code**: `index.html`, `style.css`, `app.js` 
2. **Approach Document**: `Approach_Document.md`

## Tool Stack
Frontend: HTML, CSS (Vanilla), JavaScript
AI Model: Google Gemini 1.5 Flash REST API
