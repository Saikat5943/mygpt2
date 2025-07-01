import './App.css';
import gptLogo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import rocket from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptImgLogo from './assets/chatgptLogo.svg'
import {sendMsgToopenAI} from './openai.js'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineMicrophone } from "react-icons/hi2";
import { PiMicrophoneSlashDuotone } from "react-icons/pi";
function App() {
  const msgEnd=useRef(null);
  const [input,setInput]=useState("");
  const [messages,setMessages]=useState([
    {
    text:"Hi, I am Generated Model, a state-of-art language model",
    isBot:true
  }
]);
const [res,setRes]=useState("Hi, I am Generated Model, a state-of-art language model");
const [inp1,setInp1]=useState("");
  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages]);
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, browserSupportsSpeechRecognition ,resetTranscript,listening} = useSpeechRecognition();
  useEffect(() =>{
    if(listening && transcript){
      let utr=input+transcript+' ';
      setInput(utr);
      resetTranscript();
    }
    
},[listening,transcript,setInput]);
  if (!browserSupportsSpeechRecognition) {
      return null
  }
  
  
  
  const handleSend=async()=>{
    const text=input;
    SpeechRecognition.stopListening();
    resetTranscript();
    setInp1(input);
    setInput('');
    setMessages([
      ...messages,
      {text,isBot:false}
    ])
    const res= await sendMsgToopenAI(input);
    setMessages([
      ...messages,
      { text,isBot: false },
      { text: res, isBot: true}
    ])
    setRes(res);
    //console.log(res);
   
  }
  const handleEnter=async(e)=>{
      if(e.key==='Enter'){
        SpeechRecognition.stopListening();
        resetTranscript();
        setInput('');
        await handleSend();
      }
      
  }
  const handleQuery=async(e)=>{
    const text=e.target.value;
    setInput('');
    setMessages([
      ...messages,
      {text,isBot:false}
    ])
    const res= await sendMsgToopenAI(text);
    setMessages([
      ...messages,
      { text,isBot: false },
      { text: res, isBot: true}
    ])
  }
  
  const handleit=(e)=>{
    resetTranscript();
   
    setInput(e.target.value);
  }
  const handleSpeak=()=>{
    const value=new SpeechSynthesisUtterance(res);
    window.speechSynthesis.speak(value);

   }
   const handleson=()=>{
    const value=new SpeechSynthesisUtterance(inp1);
    window.speechSynthesis.speak(value);
   }
  return (
    <div className="App">
          <div className='sideBar'>
                <div className='upperSide'>
                      <div className='upperSideTop'><img src={gptLogo} alt="" className='logo'/><span className='brand'>MyGpt</span></div>
                      <button className='midBtn' onClick={()=>{window.location.reload()}}><img src={addBtn} alt="" className='addBtn'/>New Chat</button>
                      <div className='upperSideBottom'>
                        <button className='query' onClick={handleQuery}  value={"What is OS?"}><img src={msgIcon} alt=""/>What is OS?</button>
                        <button className='query' onClick={handleQuery} value={"What is DBMS?"}><img src={msgIcon} alt=""/>What is DBMS?</button>
                      </div>
                </div>
                <div className='lowerSide'>
                   <div className='listItems'><img src={home}alt="" className='listItemsImg'/>Home</div>
                   <div className='listItems'><img src={saved} alt="" className='listItemsImg'/>Save</div>
                   <div className='listItems'><img src={rocket} alt="" className='listItemsImg'/>Upgrade to Pro</div>
                </div>

          </div>
          
          <div className='main'>
                  <div className='chats'>

                        {
                          messages.map((message,i)=>
                           <div key={i} className={message.isBot?'chat bot':'chat'}>
                           
                            <img className='chatImg' src={message.isBot?gptImgLogo:userIcon} onClick={message.isBot?handleSpeak:handleson} alt=""/><p className='txt'> {message.text}</p>
                           
                           
                            </div>
                           
                            
                            
                          
                        )}
                        <div ref={msgEnd}></div>
                  </div>
                  <div className='chatFooter'>
                    <div className='inp'>
                      <input type='text' placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={handleit}/>{listening?<HiOutlineMicrophone className="listBtn" onClick={SpeechRecognition.stopListening}/>:< PiMicrophoneSlashDuotone  className="listBtn" onClick={startListening}/>}
<button className='send' onClick={handleSend}><img src={sendBtn} alt=""/></button>
                    </div>
                    
                      <p>MyGpt may produce inaccurate information about your topic</p>
                  </div>
          </div>
    </div>
  );
}

export default App;
