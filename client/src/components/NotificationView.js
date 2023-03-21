import React, { useState, useEffect } from "react";
import Local from "../helpers/Local";
import ClientAPI from "../helpers/ClientAPI";

export default function NotificationView() {
  const userId = Local.getUserId();
  let [connections, setConnections] = useState([]);

  useEffect(() => {
    getConnections();
  }, []);

    // Gets the connections for the notification view
  async function getConnections(userId) {
    console.log("user: ", userId);
    let uresponse = await ClientAPI.getConnections();

    if (uresponse.ok) {
      console.log("data: ", uresponse.data)
      setConnections(uresponse.data);
    }
    else {
      console.log('Error!', uresponse.error);
    }
  }



  return(
    <div>
    
    {
      connections &&
      connections.map(connection => (
        <div></div>
      ))
    }
    
    </div>
  );

}
