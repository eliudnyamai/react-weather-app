import React from 'react';

function WeatherDetails({ weather }) {
  return (
    <div className="bg-green-100 p-4 rounded-md w-full flex flex-col ">
      <h2 className="text-xl font-bold mb-4">Weather Details</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-green-200 text-green-800 border border-green-600 rounded-md">
          <thead>
            <tr>
              <th className="px-4 py-2">Current Conditions</th>
              <th className="px-4 py-2">Forecast For Tomorrow</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-center">
                <p>{weather[0].data.WeatherText}</p>
                <p>Temperature: {weather[0].data.Temperature.Imperial.Value}°{weather[0].data.Temperature.Imperial.Unit}</p>
                <img className='mx-auto' src={`/images/${weather[0].data.WeatherIcon}-s.png`} alt="Current Weather Icon" />
              </td>
              <td className="px-4 py-2 text-center">
                <p>{weather[1].data.Day.IconPhrase}</p>
                <p>High: {weather[1].data.Temperature.Maximum.Value}°{weather[1].data.Temperature.Maximum.Unit}</p>
                <p>Low: {weather[1].data.Temperature.Minimum.Value}°{weather[1].data.Temperature.Minimum.Unit}</p>
                <img className='mx-auto' src={`/images/${weather[1].data.Day.Icon}-s.png`} alt="Forecast Weather Icon" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WeatherDetails;
