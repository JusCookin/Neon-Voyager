// Weather API integration using OpenWeatherMap (free tier)
// For production, you would use process.env.OPENWEATHER_API_KEY

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export async function fetchWeatherData(lat: number, lng: number): Promise<WeatherData> {
  // In production, you would use a real API key
  // const apiKey = process.env.OPENWEATHER_API_KEY;
  // For demo purposes, we'll simulate realistic weather data
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate realistic weather data based on location
    const conditions = ['Clear Sky', 'Partly Cloudy', 'Neon Rain', 'Digital Fog', 'Cyber Storm'];
    const icons = ['clear-day', 'partly-cloudy', 'neon-rain', 'digital-fog', 'cyber-storm'];
    
    const conditionIndex = Math.floor(Math.random() * conditions.length);
    
    return {
      temperature: Math.floor(Math.random() * 30) + 10, // 10-40°C
      condition: conditions[conditionIndex],
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      icon: icons[conditionIndex]
    };
  } catch (error) {
    console.error('Weather API error:', error);
    // Return default data on error
    return {
      temperature: 22,
      condition: 'Clear Sky',
      humidity: 65,
      windSpeed: 10,
      icon: 'clear-day'
    };
  }
}

export async function fetchExtendedWeatherForecast(lat: number, lng: number) {
  // Extended forecast for 7 days
  const forecast = [];
  for (let i = 0; i < 7; i++) {
    const weather = await fetchWeatherData(lat, lng);
    forecast.push({
      ...weather,
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  }
  return forecast;
}