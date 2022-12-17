import React, { useState, useRef } from 'react';
import useAutosizeTextArea from "./useAutosizeTextArea";
import { AiOutlineSend } from 'react-icons/ai';
import './ChatInput.css';
import Loading from '../loading/Loading';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  clearThread: () => void;
  loading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, clearThread, loading }) => {
  const [message, setMessage] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, message);

  const sendMessage = () => {
    if (message === '' || message === undefined) return;
    onSendMessage(message as string);
    setMessage('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (message === '' || message === undefined) return;
    // check if the key pressed is the "Enter" key
    if (event.keyCode === 13) {
      // prevent the default behavior of the "Enter" key
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className='input-area'>
      <div className="input-container">
        <textarea
          className='input'
          ref={textAreaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="button" onClick={sendMessage} disabled={loading}>
          {/* should show animated loading dots when loading */}
          {loading ? <Loading /> : <AiOutlineSend className="icon" />}
        </button>
      </div>
      <button onClick={clearThread} className="reset-button button">Reset thread</button>
    </div>
  );
};

export default ChatInput;