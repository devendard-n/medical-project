import React, { useState, useEffect, useRef } from "react";
import API from "../api";
import "../global.css";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 Tell me your symptoms" }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!message) return;

    const newMessages = [...messages, { sender: "user", text: message }];
    setMessages(newMessages);

    try {
      const res = await API.post("/chatbot", { message });

      setMessages([
        ...newMessages,
        { sender: "bot", text: res.data.reply }
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Server error" }
      ]);
    }

    setMessage("");
  }

  return (
  <div className="chat-fullpage">

    <div className="chat-header">
      🧑‍⚕️ Doctor Assistant
    </div>

    <div className="chat-body">
      {messages.map((msg, i) => (
        <div key={i} className={`msg ${msg.sender}`}>
          {msg.text}
        </div>
      ))}
      <div ref={chatEndRef}></div>
    </div>

    <div className="chat-footer">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your symptoms..."
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>

  </div>
);
}

export default Chatbot;