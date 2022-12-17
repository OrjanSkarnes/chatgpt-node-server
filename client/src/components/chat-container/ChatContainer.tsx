import * as React from 'react';
import './ChatContainer.css';

type ChatBubbleProps = {
    message: string;
    isLeft: boolean;
    selectedOption: any;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isLeft, selectedOption }) => {
    const className = isLeft ? 'chat-bubble-left' : 'chat-bubble-right';
    return (
        <div className={`chat-bubble ${className}`} style={{ whiteSpace: "pre-line" }}>
            {isLeft ? "" : message}
            {isLeft ?
                (<span className="chat-icon chat-icon-left material-symbols-outlined">{selectedOption.icon || ''}</span>) :
                (<span className="chat-icon chat-icon-right material-symbols-outlined">person</span>)
            }
            {isLeft ? message : ""}
        </div>
    );
}

type ChatContainerProps = {
    leftChats: string[];
    rightChats: string[];
    selectedOption: any;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ leftChats, rightChats, selectedOption }) => {
    const maxLength = Math.max(leftChats.length, rightChats.length);

    return (
        <div className='chat-main-container'>
        <div className='chat-container'>
            {Array.from({ length: maxLength }).map((_, index) => (
                <React.Fragment key={index}>
                    {index < rightChats.length && <ChatBubble message={rightChats[index]} isLeft={false} selectedOption={selectedOption} />}
                    {index < leftChats.length && <ChatBubble message={leftChats[index]} isLeft selectedOption={selectedOption} />}
                </React.Fragment>
            ))}
        </div>
        </div>
    );
}

export default ChatContainer;