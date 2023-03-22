import React, { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import "./Chat.css";

export default function Chat() {
  //states for the view of the sender name and receiver name
  const [senderId, setSenderId] = useState(1); // default sender ID
  const [receiverId, setReceiverId] = useState(2); // default receiver ID
  let [messages, setMessages] = useState([]);
  let [text, setText] = useState(""); //state for the chat input bar
  const pusherRef = useRef(null);
  const socketIdRef = useRef(null);

  // Connect to Pusher; called once, when component mounts
  useEffect(() => {
    Pusher.logToConsole = true;
    let pusherKey = process.env.REACT_APP_PUSHER_KEY;
    let options = { cluster: "eu", forceTLS: true };
    pusherRef.current = new Pusher(pusherKey, options);

    pusherRef.current.connection.bind("connected", () => {
      socketIdRef.current = pusherRef.current.connection.socket_id;
    });

    return () => {
      pusherRef.current.disconnect();
    };
  }, []);

  //subscribe to channel
  useEffect(() => {
    if (senderId === receiverId) {
      return;
    }
    let ids = [senderId, receiverId].sort();
    let channelName = "channel-" + ids.join("-");

    let channel = pusherRef.current.subscribe(channelName);
    channel.bind("message", function (msg) {
      setMessages((messages) => [...messages, msg]);
    });

    return () => {
      pusherRef.current.unsubscribe(channelName);
    };
  }, [senderId, receiverId]);

  //send and receive messages when users change
  useEffect(() => {}, [senderId, receiverId]);

  //GET loading previous messages from the database
  async function getRecentMessages() {
    try {
      let response = await axios.get(`/api/chat/${senderId}/${receiverId}`);
      setMessages = response.data;
    } catch (err) {
      if (err.response) {
        let r = err.response;
        console.log(`Server Error: ${r.status} ${r.statusText}`);
      } else {
        console.log(`Network Error: ${err.message}`);
      }
    }
  }

  //POST send messages to the server
  async function sendMessage(text) {
    try {
      let body = { text, socketId: socketIdRef.current };
      let response = await axios.post(
        `/api/chat/${senderId}/${receiverId}`,
        body
      );

      // Server responds with "complete" msg (including ID and date/time)
      let completeMsg = response.data;
      setMessages((messages) => [...messages, completeMsg]);
    } catch (err) {
      if (err.response) {
        let r = err.response;
        console.log(`Server Error: ${r.status} ${r.statusText}`);
      } else {
        console.log(`Network Error: ${err.message}`);
      }
    }
  }

  //FUNCTION FOR USER NAMES WHEN CHATTING
  function handleChangeUser(event) {
    let { name, value } = event.target;
    if (name === "senderId") {
      setSenderId(Number(value));
    } else {
      setReceiverId(Number(value));
    }
  }

  //FUNCTION FOR CHATLIST WHERE ALL THE MESSAGES THAT ARE SENT AND RECEIVED ARE VISIBLE

  let listDiv = useRef(null);

  //   When new msg is added, scroll if necessary so it's visible
  useEffect(() => {
    let lastPara = listDiv.current.lastElementChild; //.current is an HTML element..this gets the last message
    if (lastPara) {
      lastPara.scrollIntoView(false); //always make the last message visible...it is a JS function
    }
  }, [messages]);

  function formatDT(dt) {
    return new Date(dt).toLocaleString();
  }

  //FUNCTION FOR THE CHAT INPUT
  function handleChangeInput(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(text);
    setText("");
  }
  return (
    <div className="Chat">
      <h1 className="text-center my-4">Let's Go Mate</h1>

      <div className="d-flex justify-content-between mb-1">
        <select
          name="receiverId"
          value={receiverId}
          onChange={handleChangeUser}
        >
          <option value="1">Maria</option>
          <option value="2">Raul</option>
          <option value="3">Ana</option>
          <option value="4">Sam</option>
        </select>

        <select name="senderId" value={senderId} onChange={handleChangeUser}>
          <option value="1">Maria</option>
          <option value="2">Raul</option>
          <option value="3">Ana</option>
          <option value="4">Sam</option>
        </select>
      </div>

      <div className="messagesList" ref={listDiv}>
        {messages.map((message) => {
          <p
            key={message.id}
            className={message.senderId === senderId ? "sender" : "receiver"}
          >
            <span title={formatDT(message.dateTime)}>{message.text}</span>
          </p>;
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChangeInput}
          name="text"
          value={text}
        ></input>
      </form>
    </div>
  );
}
