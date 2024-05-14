import React, { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, { text: `You: ${inputValue}` }]);
    // Call a function to fetch student data based on the input roll number
    // Replace this with your actual logic to fetch student data
    fetchStudentData(inputValue);
    setInputValue('');
  };

  const fetchStudentData = (rollNumber) => {
    // Replace this with your actual API call to fetch student data
    // For now, let's assume we have a mock student data object
    const studentData = {
      rollNumber: rollNumber,
      name: 'John Doe',
      grade: 'A',
      marks: {
        math: 90,
        science: 85,
        english: 95
      }
    };
    setMessages([
      ...messages,
      {
        text: `Bot: Student Data - Name: ${studentData.name}, Grade: ${studentData.grade}, Marks: Math - ${studentData.marks.math}, Science - ${studentData.marks.science}, English - ${studentData.marks.english}`
      }
    ]);
  };

  return (
    <div>
      <h1>ChatBot</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter roll number"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;
