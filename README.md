# AI-Enhanced Weather Application

An interactive weather application that provides real-time weather information along with AI-generated safety tips and contextual suggestions using Google Gemini.

## Features
- Search weather by city name
- Displays current temperature, location, local time, and weather condition
- Dynamic weather icons based on live conditions
- AI-generated weather safety tips and suggestions
- Default weather loaded on app start
- Loading states and graceful error handling

## Tech Stack
- HTML5
- CSS3
- JavaScript (ES6+)
- WeatherAPI (Real-time weather data)
- Google Gemini API (AI suggestions)

## How It Works
1. User searches for a city
2. App fetches real-time weather data from WeatherAPI
3. Weather details are dynamically rendered on the UI
4. Weather context is sent to Google Gemini
5. Gemini returns safety tips and suggestions based on conditions
6. UI updates asynchronously with AI insights

## APIs Used
- WeatherAPI – Current weather data
- Google Gemini – AI-generated safety recommendations

## Error Handling
- Invalid city input handling
- API failure alerts
- Loading indicators for AI responses

## Security Note
API keys are used for demonstration purposes only.  
In production, keys should be stored securely on the server and accessed via backend APIs.

## Future Improvements
- Weather forecast support
- Temperature unit toggle (°C / °F)
- Location auto-detection
- Backend proxy for secure API handling
- UI enhancements and animations

## Project Motivation
Built to explore real-world API integration and practical AI usage in frontend applications by combining deterministic APIs with generative AI.
