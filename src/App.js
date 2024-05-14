import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [rollNumber, setRollNumber] = useState('');
  const [messages, setMessages] = useState([]);
  const [student, setStudent] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [messages]);

  const handleChange = (event) => {
    setRollNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(`Roll Number: ${rollNumber}`);
    fetchStudentData();
    setRollNumber('');
  };

  const sendMessage = (text) => {
    setMessages([...messages, { text, type: 'user' }]);
  };

  const receiveMessage = (text) => {
    setMessages([...messages, { text, type: 'bot' }]);
  };

  const fetchStudentData = () => {
    fetch(`data.json`)
      .then((response) => response.json())
      .then((data) => {
        const studentData = data[rollNumber];
        setStudent(studentData);
        if (studentData) {
          receiveMessage(
            `Name: ${studentData.name}, Age: ${studentData.age}, Grade: ${studentData.grade}`
          );
        } else {
          receiveMessage('Hello PLease Enter a Valid Roll No');
        }
      })
      .catch(() => {
        receiveMessage('An error occurred while fetching data');
      });
  };

  return (
    <div className="App">
      <div className='bot-head'><img id="bot-img" src={require('./cute-sheep-cartoon-icon-illustration-concept-idul-adha-vector.jpg')} /><h3>Roll No bot here</h3></div>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={rollNumber}
          onChange={handleChange}
          placeholder="Enter Student Key to get the data"
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
