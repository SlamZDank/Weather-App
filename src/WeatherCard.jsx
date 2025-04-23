import { useEffect, useState } from 'react'
import axios from 'axios';

const WeatherCard = ({ query }) => {
  // Weather data will be a state to control the rendering of the application for when the weatherData Changes
  // example resubmit a new search term....
  const [weatherData, setWeatherData] = useState(null);
  // Is error is set to false, this will render a personalized component
  // for when there is an error (The user inputted bogus search, error in the api...)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    // The fetch weather function is used to get the weather details and set the weatherDetails variable
    // accordingly, the function is asynchronous because it is a potentially long-running task
    const fetchWeather = async () => {
      // The key must be an .env file that must contain:
      // VITE_API_KEY="your free weahter api key"
      try {
        const response = await axios({
          method: "get",
          // To further learn about the return codes of the api function
          // there is an interesting funny website that is interesting
          // https://http.cat/
          // I promise you, you will find it educational xD
          url: "http://api.weatherapi.com/v1/current.json",
          // Params are url parameters that are used to specify the behavior of a website
          // you can clearly see it in youtube where:
          // https://www.youtube.com/watch?v=dQw4w9WgXcQ
          //                               ^ v is a parameter with the content of: dQw4w9WgXcQ
          params: {
            // api key so we can authenticate to the api server to make it allow us to
            // use the api
            key: import.meta.env.VITE_API_KEY,
            // q is the search term
            q: query,
          }
        }
        );
        // Change the weather data and set error to false
        setWeatherData(response.data);
        setIsError(false)
      } catch (err) {
        // Output the error and set is error to true
        setIsError(true);
        console.error(err);
      }
    }

    // Use the fetchWeather function with useEffect
    fetchWeather();
    // useEffect will start when:
    // The component (The weather card component) is loaded (mounted into the website)
    // Or the query is updated (useEffect yched goal)
  }, [query])

  return (
    <>
      <div className='weather-card'>
        {/* 
            This is a format for a conditional rendering where: 
            if there is an error, show "Query unsuccessful"
            If the weather data is not null or undefined,
            load a div containinig information such as:
              - Weather icon
              - Location and Country
              - Weather condition
              - Current temperature in celsius
              - Feels like temperature in celsius
            If nothing is available then:
            Load a spinning circle to show the user that 
            the component is indeed loading
        */}
        {isError ? (
          <h1 className="error-message">Query Unsuccessful</h1>
        ) : weatherData ? (
          <div>
            <img src={weatherData.current?.condition.icon} alt="Weather icon" />
            <h1>{weatherData.location?.country}, {weatherData.location?.region}</h1>
            <h2>{weatherData.current?.condition.text}</h2>
            <h2>Is currently: {weatherData.current?.temp_c}°C</h2>
            <h2>Feels Like: {weatherData.current?.feelslike_c}°C</h2>
          </div>
        ) : (
          <div className="loading-spinner" />
        )}
      </div>
    </>
  )
}

export default WeatherCard
