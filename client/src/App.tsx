import { useState } from "react";
import ChatContainer from './components/chat-container/ChatContainer';
import ChatInput from './components/chat-input/ChatInput';
import Dropdown from './components/dropdown/Dropdown';
import './App.css';
import SideBar from "./components/sidebar/SideBar";

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  // a list of all the messages
  const [messages, setMessages] = useState<string[]>([]);
  const [gptResponses, setGptResponses] = useState<string[]>([]);

  // the selected option from the dropdown
  const [selectedOption, setSelectedOption] = useState<any>("");

  // Count the number of messages sent
  const [messageCount, setMessageCount] = useState<number>(0);

  const sendToChatGPT = async (message: string) => {
    setMessages([...messages, message]);
    if (messageCount === 0) {
      await sendToGPT(`${selectedOption.value || ''}"${message}"`)
    } else {
      await sendToGPT(message);
    }
    setMessageCount(messageCount + 1);
  }

  const sendToGPT = async (message: string) => {
    setLoading(true);
    // set gpt response to be loading
    const resp = await (await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat/${message}`)).json()
     // remove the loading message and add the response
    if (resp.error !== undefined) {
      setGptResponses([...gptResponses, resp.error]);
      setLoading(false);
      return;
    }
    setGptResponses([...gptResponses, resp.answer]);
    setLoading(false);
  }

  const postConversation = async () => {
    // post the conversation to the backend
    const resp = await (await fetch(`${import.meta.env.VITE_BACKEND_URL}/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: messages,
        response: gptResponses
      })
    }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err)));
  }

  const clearThread = async () => {
    setMessages([]);
    setGptResponses([]);
    setMessageCount(0);
    await (await fetch(`${import.meta.env.VITE_BACKEND_URL}/reset`)).json();
  }

  const dropdownChange = async (option: any) => {
    setSelectedOption(option);
    await clearThread();
  }


  return (
    <div className="app">
      <SideBar clearThread={clearThread} />
      <div className="main-content">
        <main>
          <h1>Chat with {selectedOption.label || "ChatGPT"}</h1>
          {selectedOption.info && <p>{selectedOption.info}</p>}
          <button onClick={postConversation}>Post Conversation</button>
          <Dropdown Change={dropdownChange}></Dropdown>
          <ChatContainer leftChats={gptResponses} rightChats={messages} selectedOption={selectedOption} loading={loading}></ChatContainer>
          <ChatInput onSendMessage={sendToChatGPT} loading={loading} />
        </main>
      </div>
    </div>
  );
}

export default App;
