import { useState, useRef } from 'react';
import './App.css';
import runChat from './geminiAI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faHistory, faCog, faMicrophone} from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle, faFileImage, faPaperPlane } from '@fortawesome/free-regular-svg-icons';


function App() {
  const [pargraph, setParagraph] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [plus, setPlus] = useState("");
  const inputRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const Askme = async (inputValue) => {
    try {
      setEmpty(false)
      setIsLoading(true);
      const response = await runChat(inputValue);
      const paragraphs = response.text().split("**");
      setParagraph(paragraphs);
      setHistory([...history, inputValue]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  const restoreAnswer = async(inputValue) =>{
    try {
      setEmpty(false)
      setIsLoading(true); 
      inputRef.current.value = inputValue;
      const response = await runChat(inputValue);
      const paragraphs = response.text().split("**");
      setParagraph(paragraphs);
    } catch (error) {
      console.error('Error:', error);
    }
    finally {
      setIsLoading(false); 
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
    setParagraph([]);
    setEmpty(true)
    inputRef.current.value = "";
  }

  const handleIdeaClick = (idea) => {
    Askme(idea)
    inputRef.current.value = idea;
  };

  const isEmpty = () =>{
    console.log(inputRef.current.value)
    if(inputRef.current.value!==""){
      setEmpty(false)
      
    }
    else
      setEmpty(true)
  }

  
  
 
  return (
    <div className='container'>
      <div className={`${isExpanded ? 'first-half-open' : 'first-half-closed'}`}>
        <a href="#" onClick={expand}><FontAwesomeIcon icon={faBars} /></a>
        <div className={`${isExpanded ? 'plus-open' : 'plus-closed'}`}>
            <a href="#" onClick={reset}><FontAwesomeIcon className="ayy"icon={faPlus} />  {plus}</a>
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
          <div><a><FontAwesomeIcon className="ayy" icon={faQuestionCircle} /></a> {isExpanded && <span>Help</span>}</div>
          <br></br>
          <div><a><FontAwesomeIcon className="ayy" icon={faHistory} /></a> {isExpanded && <span>Activity</span>}</div>
          <br></br>
          <div><a><FontAwesomeIcon className="ayy" icon={faCog} /></a> {isExpanded && <span>Settings</span>}</div>
          <br></br>
        </div>
      </div>
      <div className="second-half">
        {isLoading &&  (<div id="load">
                  <div>G</div>
                  <div>N</div>
                  <div>I</div>
                  <div>D</div>
                  <div>A</div>
                  <div>O</div>
                  <div>L</div>
                </div>)}
        <div className='upper-second-half'>
          <h2 className='title'>Gemini</h2>
          <div className='user-icon'></div>
          {pargraph.length > 0 && !isLoading ? (
            <div className='answer-box'>
              {pargraph.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <div className='tagroba'><h2 className='main-title'>How can I help you today?!</h2></div>
          )}
          {pargraph.length === 0 && !isLoading &&  (
            <div className='ideas'>
              <div className='first-idea' onClick={() => handleIdeaClick('to see the pyramids in Egypt')}>
                <h3>Plan a trip</h3>
                <p>to see the pyramids in Egypt</p>
              </div>
              <div className='second-idea' onClick={() => handleIdeaClick('to see the northern lights in Norway')}>
                <h3>Plan a trip</h3>
                <p>to see the northern lights in Norway</p>
              </div>
              <div className='third-idea' onClick={() => handleIdeaClick('to convert a date to the weekday')}>
                <h3>Write a spreadsheet formula</h3>
                <p>to convert a date to the weekday</p>
              </div>
              <div className='fourth-idea' onClick={() => handleIdeaClick('Create a tool to schedule my posts')}>
                <h3>Automate social media posts</h3>
                <p>Create a tool to schedule my posts</p>
              </div>
            </div>
          )}
        </div>
        <div className='bottom-second-half'>
          <div className="input-container">
          <textarea  className='text-box' rows="5" cols="50" ref={inputRef} onChange={isEmpty} placeholder='Enter Prompt Here'></textarea>
            <div className="icon-container">
              <a href='#'><FontAwesomeIcon icon={faFileImage} /></a>
              <a href='#'><FontAwesomeIcon icon={faMicrophone} /></a>
              {!empty && <a href="#" onClick={() => Askme(inputRef.current.value)}>
              {isLoading ? ( 
                <div className="spinner"></div>
              ) : (
                <FontAwesomeIcon icon={faPaperPlane} />
              )}
              </a> }
            </div>
          </div>
          <p>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
        </div>
      </div>
    </div>
  );
}

export default App;
