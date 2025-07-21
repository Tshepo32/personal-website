import React, { useState, useRef, useEffect } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const userMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        try {
            // Replace with your actual backend URL
            const response = await fetch('https://personal-website-16.onrender.com/api/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: input }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const botMessage = { text: data.answer, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = { text: "Sorry, I couldn't get an answer right now. Please try again later.", sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>About Me Chatbot</h3>
                <button className="close-button" onClick={onClose}>X</button>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;