import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState("");
  const ref = useRef();

  const [data, setData] = useState(null);

  const onSubmit = async () => {
    if (!email) {
      setInputError("Please enter an email");
      return;
    }

    try {
      const { data } = await axios.get(
        `https://ap-south-1.cosmocloud.io/649000ad97cc104f02b9a31f/api/subscriptions/${email}`,
        {
          params: {},
        }
      );
      setData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const showRazorPay = data?.length > 0;

  return (
    <div className="main">
      <div className="App">
        <h1>Backend Mentorship Program</h1>
        <div className="form-container">
          <div className="form">
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setInputError("");
              }}
              ref={ref}
            />
            <button className="button" type="button" onClick={onSubmit}>
              Submit
            </button>
          </div>
          {inputError && <p className="error">{inputError}</p>}
        </div>
      </div>
      {data && (
        <>
          {showRazorPay && (
            <div>
              Your Payment Link :{" "}
              <a href={data[0].rzpLink} target="_blank" rel="noreferrer">
                {data[0].rzpLink}
              </a>
            </div>
          )}

          {!showRazorPay && (
            <div className="notification">
              You have not registered or added wrong email. Please check
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
