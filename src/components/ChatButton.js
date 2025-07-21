import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import './ChatButton.css';
import { BsChatTextFill } from 'react-icons/bs'; // Example: A filled chat bubble icon from Bootstrap Icons

const ChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="chat-toggle-button" onClick={toggleChat}>
                <BsChatTextFill className="chat-icon" /> {/* Use the icon component here */}
            </button>
            {isOpen && <ChatWindow onClose={toggleChat} />}
        </>
    );
};

export default ChatButton;