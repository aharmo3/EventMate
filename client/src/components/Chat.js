import React, { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import "./Chat.css";
import Local from "../helpers/Local";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function Chat(props) {
  //states for the view of the sender name and receiver name
  const [senderId] = useState(Local.getUserId()); // default sender ID
  const [receiverId, setReceiverId] = useState(2); // default receiver ID
  let [messages, setMessages] = useState([]);
  let [text, setText] = useState(""); //state for the chat input bar
  const pusherRef = useRef(null);
  const socketIdRef = useRef(null);
  const [visible, setVisible] = useState(props.isVisible);

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
    if (props.showChat.inviterId === props.showChat.inviteeId) {
      return;
    }
    let rId = "";
    if (senderId === props.showChat.inviterId) {
      rId = props.showChat.inviteeId;
    } else {
      rId = props.showChat.inviterId;
    }
    setReceiverId(rId);

    let ids = [senderId, rId].sort();
    let channelName = "channel-" + ids.join("-");
    console.log("channel name here", channelName);

    let channel = pusherRef.current.subscribe(channelName);
    channel.bind("message", function (msg) {
      setMessages((messages) => [...messages, msg]);
    });
    console.log(senderId, receiverId);
    getRecentMessages(senderId, rId);

    return () => {
      pusherRef.current.unsubscribe(channelName);
    };
  }, [senderId, receiverId]);

  //send and receive messages when users change
  // useEffect(() => {

  //   console.log("send and receive messages when users change");
  // }, [senderId, receiverId]);

  // GET loading previous messages from the database
  async function getRecentMessages(sId, rID) {
    try {
      let response = await axios.get(`/api/chat/${sId}/${rID}`);
      setMessages(response.data);
    } catch (err) {
      if (err.response) {
        let r = err.response;
        console.log(`Server Error: ${r.status} ${r.statusText}`);
      } else {
        console.log(`Network Error: ${err.message}`);
      }
    }
  }

  async function sendMessage(text) {
    try {
      // Send text and socketId to our server
      //each user has a socketId so we send it to the server so that in the backend with the trigger, the server uses the socketId to tell pusher to send the message to everyone on the channel but not the user with that socketId
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
        console.log(`Server error: ${r.status} ${r.statusText}`);
      } else {
        console.log(`Network error: ${err.message}`);
      }
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
    console.log(messages);
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

  function handleClickX() {
    setVisible(!visible);
  }
  return (
    <div className="Chat" style={{ display: visible ? "block" : "none" }}>
      <IconButton aria-label="notifications" sx={{ mx: 2 }}>
        <CloseIcon
          fontSize="large"
          onClick={handleClickX}
          className="button-close"
        />
      </IconButton>

      <h1 className="text-center my-4">Let's Go Mate</h1>

      <div className="d-flex justify-content-between mb-1">
        <p> {JSON.stringify(props.showChat.inviterUsername)}</p>
        <p>{JSON.stringify(props.showChat.inviteeUsername)}</p>
      </div>

      <div className="messagesList" ref={listDiv}>
        {messages.map((message) => (
          <p
            key={message.id}
            className={message.senderId === senderId ? "sender" : "receiver"}
          >
            <span title={formatDT(message.dateTime)} className="spanning">
              {message.text}
            </span>
          </p>
        ))}
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

//possible things causing the problem
//why does it show in the console that pusher is connecting and disconnecting?
//in the subscribtion useEffect it is called twice....what means subscribe? arent they subscribed the minute a channel has been opened?...it is calling the channel name twice this means the senderId and receiverId is being changed twice when in reality it should only change once when clicked

//the problem is that it sees that the senderID and receiverId is changing
//and it is noticing that the messages are changing it is just not rendering the new messages

//check the waterfall as well
