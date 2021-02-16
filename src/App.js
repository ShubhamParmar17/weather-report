import { useState } from "react";
import Alert from "./components/Alert";
import Container from "./components/Container";

const url = `api.openweathermap.org/data/2.5/weather?q={city name}&appid=2dd5a2e33b52d2c41dd99d036b929c31s`;
const key = process.env.REACT_APP_API_KEY;

function App() {
  const [text, setText] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [weather, setWeather] = useState({
    temperature: 0,
    desc: "-",
    iconId: "unknown",
    humidity: 0,
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${key}`
      );
      const data = await response.json();
      setWeather({
        temperature: Math.floor(data.main.temp - 273),
        desc: data.weather[0].description,
        iconId: data.weather[0].icon,
        humidity: data.main.humidity,
      });
    } catch (err) {
      showAlert(true, "invalid city name", "danger");
      setText("");
      setWeather({
        temperature: 0,
        desc: "-",
        iconId: "unknown",
        humidity: 0,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      fetchData();
    } else {
      showAlert(true, "enter a value", "danger");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  return (
    <section>
      <header>
        <h1>Weather Report</h1>
      </header>
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <div className="header-container">
          <input
            className="weather-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter city name"
          />
          <button type="submit" className="btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>

      <div className="weather-container">
        <Container weather={weather} />
      </div>
    </section>
  );
}

export default App;
