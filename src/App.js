import React from "react";
import "./App.css";

function App() {
  const [USD, setUSD] = React.useState([]);
  const [EUR, setEUR] = React.useState([]);
  const [firstInput, setfirstInput] = React.useState(Number);
  const [secondInput, setSecondInput] = React.useState(Number);
  const [firstSelect, setFirstSelect] = React.useState(1);
  const [secondSelect, setSecondSelect] = React.useState(1);

  const handleChangeFirst = (e) => {
    setfirstInput(e.currentTarget.value);
    setSecondInput(((e.currentTarget.value * firstSelect)/secondSelect).toFixed(2));
  };

  const handleChangeSecond = (e) => {
    setSecondInput(e.currentTarget.value);
    setfirstInput(((e.currentTarget.value * secondSelect)/firstSelect).toFixed(2))
  };

  const firstChange = (event) => {
    setFirstSelect(event.target.value);
  };

  const secondChange = (event) => {
    setSecondSelect(event.target.value);
  };

  React.useEffect(() => {
    fetch("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5")
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setUSD(arr.filter((key) => key.ccy.includes("USD")));
        setEUR(arr.filter((key) => key.ccy.includes("EUR")));
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <header>
        <div className="table">
          {USD.map((item) => (
            <div key={item.ccy}>
              <h1>
                {item.ccy} - <span>{item.buy.slice(0, 5)}</span>
              </h1>
            </div>
          ))}
        </div>
        <div className="table">
          {EUR.map((item) => (
            <div key={item.ccy}>
              <h1>
                {item.ccy} - <span>{item.buy.slice(0, 5)}</span>
              </h1>
            </div>
          ))}
        </div>
      </header>
      <div className="content">
        <input type="number" value={firstInput} onChange={handleChangeFirst} />
        <select className="select-css" name="select" onChange={firstChange} value={firstSelect}>
          {<option value={1}>UAH</option>}
          {USD.map((item) => (
            <option value={item.buy} key={item.ccy}>
              USD 
            </option>
          ))}
          {EUR.map((item) => (
            <option value={item.buy} key={item.ccy}>
              EUR 
            </option>
          ))}
        </select>
        <br />
        <input type="number" value={secondInput} onChange={handleChangeSecond} />
        <select className="select-css" name="select" onChange={secondChange} value={secondSelect}>
          {<option value={1}>UAH</option>}
          {USD.map((item) => (
            <option value={item.buy} key={item.ccy}>
              USD
            </option>
          ))}
          {EUR.map((item) => (
            <option value={item.buy} key={item.ccy}>
              EUR
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
