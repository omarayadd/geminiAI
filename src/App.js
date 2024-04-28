import { useState, useRef } from 'react'; // Import useRef hook
import './App.css';
import runChat from './geminiAI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faHistory, faCog, faMicrophone} from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle, faFileImage, faPaperPlane } from '@fortawesome/free-regular-svg-icons';


function App() {
  const [answer, setAnswer] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [plus, setPlus] = useState("");
  const inputRef = useRef(null);
  const [history, setHistory] = useState([]);

  const Askme = async (inputValue) => {
    try {
      const response = await runChat(inputValue);
      setAnswer(response.text());
      setHistory([...history, inputValue])
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const restoreAnswer = async(inputValue) =>{
    try {
      inputRef.current.value = inputValue;
      const response = await runChat(inputValue);
      setAnswer(response.text());
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const expand = () => {
    setIsExpanded(!isExpanded);
    if(!isExpanded){
      setPlus("New Chat")
    }
    else{
      setPlus("")
    }
  };

  const reset = () =>{
    setAnswer("");
    inputRef.current.value = "";
  }

  const handleIdeaClick = (idea) => {
    Askme(idea)
    inputRef.current.value = idea;
  };
 
  return (
    <div className='container'>
      <div className={`${isExpanded ? 'first-half-open' : 'first-half-closed'}`}>
        <a href="#" onClick={expand}><FontAwesomeIcon icon={faBars} /></a>
        <div className={`${isExpanded ? 'plus-open' : 'plus-closed'}`}>
            <a href="#" onClick={reset}><FontAwesomeIcon icon={faPlus} />  {plus}</a>
        </div>
        {isExpanded && <h3 className='hh3'>Recent</h3>} 
        <div className='items-div'>
            {isExpanded && history.map((item, index) => (
              <div className='ayhaga'>
                <a onClick={() => restoreAnswer(item)} key={index}>{item}</a>
                <br></br>
              </div>  
            ))}
        </div>
        
        <div className='bottom-first-half'>
          <div><a><FontAwesomeIcon icon={faQuestionCircle} /></a> {isExpanded && <span>Help</span>}</div>
          <br></br>
          <div><a><FontAwesomeIcon icon={faHistory} /></a> {isExpanded && <span>Activity</span>}</div>
          <br></br>
          <div><a><FontAwesomeIcon icon={faCog} /></a> {isExpanded && <span>Settings</span>}</div>
          <br></br>
        </div>
      </div>
      <div className="second-half">
        <div className='upper-second-half'>
          <h2 className='title'>Gemini</h2>
          <div className='user-icon'></div>
          <div className='answer-box'>{answer}</div>
          <h2>How can I help you today?!</h2>
          {answer.length===0 && <div className='ideas'>
            <div className='first-idea' onClick={() => handleIdeaClick('to see the pyramids in Egypt')}>
              <h3>Plan a trip</h3>
              <p>to see the pyramids in Egypt</p>
            </div>
            <div className='second-idea' onClick={() => handleIdeaClick('to see the northen lights in Norway')}>
              <h3>Plan a trip</h3>
              <p>to see the northen lights in Norway</p>
            </div>
            <div className='third-idea' onClick={() => handleIdeaClick('to convert a date to the weekday')}>
              <h3>Write a spreadsheet formula</h3>
              <p>to convert a date to the weekday</p>
            </div>
            <div className='fourth-idea' onClick={() => handleIdeaClick('Create a tool to schedule my posts')}>
              <h3>Automate social media posts</h3>
              <p>Create a tool to schedule my posts</p>
            </div>
          </div>}
        </div>
        <div className='bottom-second-half'>
          <div className="input-container">
            <input ref={inputRef} className='text-box' type='text' placeholder='Enter Prompt Here'/> {}
            <div className="icon-container">
              <a href='#'><FontAwesomeIcon icon={faFileImage} /></a>
              <a href='#'><FontAwesomeIcon icon={faMicrophone} /></a>
              <a href="#" onClick={() => Askme(inputRef.current.value)}><FontAwesomeIcon icon={faPaperPlane} /></a> {}
            </div>
          </div>
          <p>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
        </div>
      </div>
    </div>
  );
}

export default App;
