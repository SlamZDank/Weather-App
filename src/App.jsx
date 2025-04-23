import WeatherCard from './WeatherCard';
import { useState } from 'react';
import Search from './Search';

function App() {
  // A list of the Countries to show in the UI
  const recommendedCountries = [
    "Tunisia",
    "France",
    "Germany",
    "Italy",
    "India",
    "China",
    "Japan",
    "Sweden"
  ];

  const [query, setQuery] = useState("");

  return (
    <>
      <div className="search-area">
        <h1 className='title'>Search Current Weather for a Country: </h1>
        { /* 
             Set Query is a function that sets the query state
             it is used and arguement for the search components to
             set the search query to the input
        */ }
        < Search setQuery={setQuery} />
        {query !== "" &&
          <>
            {/* this is used to get the weather details of the query inputted in the search field */}
            <WeatherCard query={query} />
          </>
        }
      </div>


      {/* This is to reuse the weather card component to apply on the list of favourite countries */}
      <div className="grid-container">
        {recommendedCountries.map((country, idx) => (
          <WeatherCard query={country} key={idx} />
        ))}
      </div>
    </>
  )


}

export default App
