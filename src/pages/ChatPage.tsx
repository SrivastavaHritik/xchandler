import Header from "../components/Header";
import { SquareGanttChart, Trash } from "lucide-react";
import avatar from "../assets/avatar.png";
import { useEffect, useState } from "react";
import ScopeEditor from "../components/ScopeEditor";
import {SendHorizonalIcon} from "lucide-react"
import axios from "axios";
import { EditorContentChanged } from "../components/ScopeEditor";
import Markdown from 'react-markdown'


export default function ChatPage() {
  const [showEditor, setShowEditor] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [inputText, setInputText] = useState("");
  const [scopeDocument, setScopeDocument] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isChatCleared, setIsChatCleared] = useState(false);
  const [modify, setModify] = useState(false);
  

  function handleScopeChange(value:EditorContentChanged ) {
    setScopeDocument(value.markdown);
  }
  
  function handleSubmit(text: string) {
    if (!text.trim()) return; // Don't submit empty text
   
    const existingChatId = localStorage.getItem("chatId");
    axios
      .post("http://20.191.225.169:8000/generate_scope/", null, {
        params: { requirement: text, chatId: existingChatId || null },
      })
      .then((res) => {
        console.log(res.data);
        setChatId(res.data.chatId);
        localStorage.setItem("chatId", res.data.chatId);
        console.log(res.data["scope document"]);
        setScopeDocument(res.data["scope document"]);
        setShowEditor(true);
        setIsApproved(false);
        setInputText(""); // Clear input after submission
      })
      .catch((error) => {
        console.error("Error sending requirement:", error);
      });
  }
  
  // Handle key press for the input field
  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && inputText.trim()) {
      handleSubmit(inputText);
    }
  }
  
  useEffect(() => {
    const storedChatId = localStorage.getItem("chatId");
    if (storedChatId) {
      setChatId(storedChatId);
    }
  }, []);

  function handleScopeApprove(){
    setIsApproved(true);
  }

  function handleScopeModify(){
    setIsApproved(false);
  }
 
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-100">
      {/* Header Component */}
      <Header />
      {/* Main Content */}
      <main
        className={`flex flex-col items-center ${
          !showEditor ? "justify-center" : "justify-items-start"
        } flex-1 text-center mt-10`}
      >
        {!showEditor ? (
          <div className="flex flex-col items-center">
            {/* Clear Chat Button */}
            <button className="absolute top-30 right-10 flex items-end text-gray-600 hover:text-red-500">
              <Trash className="w-5 h-6 mr-1" />
              Clear Chat
            </button>
            
            {/* Profile Image */}
            <img
              src={avatar}
              alt="LexX"
              className="w-20 h-20 rounded-full mb-4"
            />

            {/* Greeting Text */}
            <h1 className="text-3xl font-bold ">Hi, LexX here!</h1>
            <p className="text-gray-600 mt-2 ">How can I help?</p>
            <p className="text-gray-600 mt-2 ">There is the problem</p>
          
            {/* Action Buttons */}
            <div className="mt-2 flex gap-5">
              <button
                className="bg-[#0971ce] text-white w-[175px] h-[50px] rounded-lg shadow-md hover:bg-[#0b5aa6]" >
                Create A New Scope Document
              </button>
              <button
                className="bg-[#0971ce] text-white w-[194px] h-[50px] rounded-lg shadow-md hover:bg-[#0b5aa6]">
                Update An Existing Scope Document
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* Scope Editor */}
            <ScopeEditor value={scopeDocument as string} onChange={handleScopeChange}/>
            {/* Approve, Modify, and Save Buttons */}
            <div className="mt-4 flex gap-4">
              {!isApproved ? (
                <>
                  <button
                    className="bg-[#0971CE] text-white px-6 py-3 rounded-lg shadow-md"
                    onClick={handleScopeApprove}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-[#0971CE] text-white px-6 py-3 rounded-lg shadow-md"
                    onClick={handleScopeModify}
                  >
                    Modify
                  </button>
                </>
              ) : (
                <button
                  className="bg-[#0971CE] text-white px-6 py-3 rounded-lg shadow-md"
                  
                >
                  Save
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Chat Input Box */}
      <div className="fixed bottom-10 flex items-center w-[70vw] h-[60px] bg-white shadow-lg rounded-[20px] p-3 mx-auto left-0 right-0">
        <input
          type="text"
          placeholder="Please generate the Scope document"
          className="flex-1 outline-none bg-transparent px-4"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className={`text-gray-600 ${
            inputText.trim() ? "hover:text-black" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => handleSubmit(inputText)}
          disabled={!inputText.trim()} // Disable button if input is empty
        >
         <SendHorizonalIcon className="w-6 h-6"/>
        </button>
      </div>
    </div>
  );
}