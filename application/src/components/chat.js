import React, { useState } from 'react';
import styles from '../styles/chat.module.css'; // Make sure the path to your CSS module is correct

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = (message) => {
    fetch('http://127.0.0.1:5000/send_message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
      .then(response => response.json())
      .then(data => {
        receiveMessage(data.response);
      })
      .catch(error => console.error('Error:', error));
  };

  const receiveMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, { text: message, sender: 'PathFinder' }]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages(prevMessages => [...prevMessages, { text: inputMessage, sender: 'User' }]);
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <aside className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        Chat with PathFinder
      </div>
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${message.sender === 'PathFinder'
                ? styles.pathfinderMessage
                : styles.userMessage
              }`}
          >
            <span className={styles.messageSender}>
              {message.sender === 'User' ? 'You: ' : 'PathFinder: '}
            </span>
            {message.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className={styles.inputArea}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit" className={styles.sendButton}>Send</button>
      </form>
    </aside>
  );
};

export default Chat;