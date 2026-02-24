const form = document.querySelector("form");
const searchField = document.querySelector(".searchField");
const currentLocation = document.querySelector('.time_location p');
const dateTime = document.querySelector('.time_location span');
const temprature = document.querySelector('.temp');
const conditionField = document.querySelector('.weather_condition span');

form.addEventListener("submit", search);

function search(e) {
  e.preventDefault();
  fetchData(searchField.value);
}

// Google Gemini API function - TESTING VERSION
async function getAISuggestions(location, condition, temp) {
  const apiKey = 'AIzaSyA8UA7JFBPTBeVYolPtZGxmokIGNrvDrDA';
  
  const prompt = `Give weather safety tips and suggestions for ${location} where the weather condition is ${condition} with a temperature of ${temp}°C.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      }
    );

    const data = await response.json();
    
    console.log("✅ Gemini Response:", data);

    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No suggestions available.';

  } catch (error) {
    console.error('❌ AI Suggestion Error:', error);
    return 'Unable to fetch AI suggestions.';
  }
}
async function fetchData(target) {
  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=47f86a96d9874b7591e22147251805&q=${target}&aqi=yes`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    
    const data = await response.json();
    
    console.log('✅ Weather data received:', data);
    
    let currentLocation = data.location.name;
    let currentCondition = data.current.condition.text;
    let currentTemp = data.current.temp_c;
    let currentTime = data.location.localtime;
    let currentIcon = data.current.condition.icon;
    
    updateValues(currentTime, currentLocation, currentCondition, currentTemp, currentIcon);
    
    // Show loading message
    document.querySelector('.ai_suggestions').innerText = '🤖 Loading AI suggestions...';
    
    const aiSuggestions = await getAISuggestions(currentLocation, currentCondition, currentTemp);
    document.querySelector('.ai_suggestions').innerText = '💡 ' + aiSuggestions;
    
  } catch (error) {
    console.error("❌ Cannot Fetch Weather:", error);
    alert('Error fetching weather data. Please check the location and try again.');
  }
}

function updateValues(time, location, condition, temp, icon) {
  dateTime.innerText = time;
  currentLocation.innerText = location;
  conditionField.innerText = condition;
  temprature.innerText = temp + '°C';
  
  const weatherIcon = document.querySelector('.weather_condition img');
  weatherIcon.src = `https:${icon}`;
  weatherIcon.alt = condition;
}

document.addEventListener("DOMContentLoaded", () => {
  console.log('🚀 App loaded, fetching Gorakhpur weather...');
  fetchData("Gorakhpur");
});