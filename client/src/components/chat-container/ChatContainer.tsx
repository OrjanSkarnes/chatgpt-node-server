import * as React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './ChatContainer.scss';

type ChatBubbleProps = {
    message: string;
    isLeft: boolean;
    selectedOption: any;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isLeft, selectedOption }) => {
    const className = isLeft ? 'chat-bubble-left' : 'chat-bubble-right';
    return (
        <div className={`chat-bubble ${className}`} style={{ whiteSpace: "pre-line" }}>
            {isLeft ? "" : <ReactMarkdown children={message} className="chat-md-content"/>}
            {isLeft ?
                (<span className="chat-icon chat-icon-left material-symbols-outlined">{selectedOption.icon || ''}</span>) :
                (<span className="chat-icon chat-icon-right material-symbols-outlined">person</span>)
            }
            {isLeft ? <ReactMarkdown className="chat-md-content" children={message} remarkPlugins={[remarkGfm]} /> : ""}
        </div>
    );
}

type ChatContainerProps = {
    leftChats: string[];
    rightChats: string[];
    selectedOption: any;
    loading: boolean;
}
const ChatContainer: React.FC<ChatContainerProps> = ({ leftChats, rightChats, selectedOption, loading }) => {
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
                { loading && <ChatBubble message="..." isLeft selectedOption={selectedOption} /> }
            </div>
        </div>
    );
}

export default ChatContainer;