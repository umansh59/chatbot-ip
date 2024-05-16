import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [rollNumber, setRollNumber] = useState('');
  const [messages, setMessages] = useState([]);
  const [student, setStudent] = useState(null);
  const [messageId, setMessageId] = useState(0);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [messages]);

  const handleChange = (event) => {
    setRollNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userMessage = { id: messageId, text: `Roll Number: ${rollNumber}`, sender: 'user' };
    sendMessage(userMessage);
    fetchStudentData();
    setRollNumber('');
    setMessageId(messageId + 1);
    scrollChatToBottom();
  };

  const sendMessage = (message) => {
    setMessages([...messages, message]);
  };

  const receiveMessage = (text) => {
    const botMessage = { id: messageId, text, sender: 'bot' };
    setMessages([...messages, botMessage]);
    setMessageId(messageId + 1);
    scrollChatToBottom();
  };

  const fetchStudentData = () => {
    fetch(`data.json`)
      .then((response) => response.json())
      .then((data) => {
        const studentData = data.find((student) => student['roll no'] === parseInt(rollNumber));
        setStudent(studentData);
        if (studentData) {
          receiveMessage(
            `Name: ${studentData.Name}, University ID: ${studentData['university id']}`
          );
        } else {
          receiveMessage('Invalid Roll Number. Please enter a valid Roll Number');
        }
      })
      .catch(() => {
        receiveMessage('An error occurred while fetching data');
      });
  };

  const scrollChatToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  return (
    <div className="App">
      <div className='bot-head'><img id="bot-img" src={require('./cute-sheep-cartoon-icon-illustration-concept-idul-adha-vector.jpg')} /><h3>Roll No bot here</h3></div>
      <div ref={chatContainerRef} className="chat-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={rollNumber}
          onChange={handleChange}
          placeholder="Enter Student Roll Number"
          className="chat-input"
          ref={inputRef}
        />
        <button type="submit" className="chat-send">
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
