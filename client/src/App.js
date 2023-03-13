import React, {useState, useEffect} from "react";
import './App.css';
import ClientAPI from "./ClientAPI";


function App() {
  let [message, setMessage] = useState("");

  useEffect(() => {
    commect();
  }, []);

  async function commect() {
    let uresponse = await ClientAPI.commect();
    if (uresponse.ok) {
      setMessage(uresponse.data.welcome)
    }
    else {
      console.log('Error!', uresponse.error);
    }
  }
  


  return (
    <div className="App">
    {
      message && <p>{message}</p>
    }
    </div>
  );
}

export default App;
