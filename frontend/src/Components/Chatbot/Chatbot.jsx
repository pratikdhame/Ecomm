import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post('/chatbot', { message: input });
      setMessages([...messages, { text: input, sender: 'user' }, { text: response.data.response, sender: 'bot' }]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.sender === 'user' ? `You: ${msg.text}` : `Bot: ${msg.text}`}</div>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
