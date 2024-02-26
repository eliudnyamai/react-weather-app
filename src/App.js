import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WeatherDetails from './components/WeatherDetails';

const API_KEY = '';  

function App() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [weather, setWeather] = useState(null); // Changed to null to match initial state
  
  const handleCityChange = city => {
    setSelectedCity([city.EnglishName, city.Key]);  
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem('selectedCityData');
        
        if (storedData) {
          const { data, expiry } = JSON.parse(storedData);
          if (expiry && new Date(expiry) > new Date()) {
            setSelectedCity([data.ParentCity.EnglishName, data.ParentCity.Key]);
            return;
          }
          localStorage.removeItem('selectedCityData');
        }

        const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${API_KEY}`);
        const data = await response.json();
        
        const expiry = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
        localStorage.setItem('selectedCityData', JSON.stringify({ data, expiry }));

        setSelectedCity([data.ParentCity.EnglishName, data.ParentCity.Key]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedCities = localStorage.getItem('citiesData');

        if (storedCities) {
          setCities(JSON.parse(storedCities));
        } else {
          const response = await fetch(`http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=${API_KEY}`);
          const data = await response.json();
          setCities(data);
          localStorage.setItem('citiesData', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (selectedCity.length > 1) { // Check if selectedCity has valid data
          const currentConditionsResponse = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${selectedCity[1]}?apikey=${API_KEY}`);
          const currentConditionsData = await currentConditionsResponse.json();
          const forecastResponse = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${selectedCity[1]}?apikey=${API_KEY}`);
          const forecastData = await forecastResponse.json();
  
          const weatherData = [
            {
              type: 'currentConditions',
              data: currentConditionsData[0] // Assuming the first object in the array is the current condition
            },
            {
              type: 'forecast',
              data: forecastData.DailyForecasts[0] 
                        }
          ];
  
          setWeather(weatherData);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
  
    fetchWeatherData();
  }, [selectedCity]);
  
  return (
    <div className="p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full md:h-90 w-full  border border-green-500 bg-green-50">
    <Header currentCity={selectedCity} onChange={handleCityChange} cities={cities}/>
    {weather && <WeatherDetails weather={weather}/>}
  </div>
  );
}

export default App;
