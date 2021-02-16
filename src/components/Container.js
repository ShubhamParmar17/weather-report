import React from "react";

const Container = ({ weather }) => {
  const { temperature, desc, iconId, humidity } = weather;
  return (
    <div className="card">
      <img src={`/icons/${iconId}.png`} alt="weather-icon" />
      <p className="temperature-value">
        {temperature}°<span>C</span>
      </p>
      <p className="temperature-description">{desc}</p>
      <p className="humidity">{humidity}%</p>
    </div>
  );
};

export default Container;
