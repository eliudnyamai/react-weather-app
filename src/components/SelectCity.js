import React from 'react';

const SelectCity = ({ cities, onChange, currentCity }) => {
  const handleChange = event => {
    const selectedCity = JSON.parse(event.target.value);
    onChange(selectedCity);
  };

  return (
    <div className="relative">
      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        defaultValue=""
        onChange={handleChange} 
      >
        <option value={JSON.stringify(currentCity)}>
          {currentCity[0]}
        </option>
        {cities.map(city => (
          <option key={city.Key} value={JSON.stringify(city)}>
            {city.EnglishName}, {city.Country.EnglishName}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M12.95 8.95a.5.5 0 0 0-.91 0l-3.4 6a.5.5 0 0 0 .42.75h6.8a.5.5 0 0 0 .42-.75l-3.4-6zM10 0a.5.5 0 0 0-.5.5v4.5a.5.5 0 1 0 1 0V.5a.5.5 0 0 0-.5-.5zM9 15a.5.5 0 0 0 .5-.5v-4.5a.5.5 0 1 0-1 0v4.5a.5.5 0 0 0 .5.5z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SelectCity;
