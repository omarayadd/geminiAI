import { useState } from 'react';
import './App.css';
import runChat from './geminiAI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faHistory, faCog, faMicrophone} from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle, faFileImage, faPaperPlane } from '@fortawesome/free-regular-svg-icons';


function App() {
  // const [value, setValue] = useState('');
  const [answer, setAnswer] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [plus, setPlus] = useState("")

  const Askme = async () => {
    const inputValue = document.querySelector('input[type="text"]').value;
    // setValue(inputValue);

    try {
      const response = await runChat(inputValue);
      // console.log(response.text)
      setAnswer(response.text());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const expand = () => {
    setIsExpanded(!isExpanded);
    if(!isExpanded){
      setPlus("New Chat")
    }
    else{
      setPlus("")
    }
  };
 
  return (
    <div className='container'>
      <div className={`${isExpanded ? 'first-half-open' : 'first-half-closed'}`}>
        <a href="#" onClick={expand}><FontAwesomeIcon icon={faBars} /></a>
        <div className={`${isExpanded ? 'plus-open' : 'plus-closed'}`}>
            <a href="#"><FontAwesomeIcon icon={faPlus} />{plus}</a>
        </div>
        {isExpanded && <h3>Recent</h3>}
        <div className='bottom-first-half'>
          <a><FontAwesomeIcon icon={faQuestionCircle} /></a> {isExpanded && <span>Help</span>}
          <br></br>
          <a><FontAwesomeIcon icon={faHistory} /></a> {isExpanded && <span>Activity</span>}
          <br></br>
          <a><FontAwesomeIcon icon={faCog} /></a> {isExpanded && <span>Settings</span>}
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
            <div className='first-idea'>
              <h3>Plan a trip</h3>
              <p>to see the pyramids in Egypt</p>
            </div>
            <div className='second-idea'>
              <h3>Plan a trip</h3>
              <p>to see the northen lights in Norway</p>
            </div>
            <div className='third-idea'>
              <h3>Write a spreadsheet formula</h3>
              <p>to convert a date to the weekday</p>
            </div>
            <div className='fourth-idea'>
              <h3>Automate social media posts</h3>
              <p>Create a tool to schedule my posts</p>
            </div>
          </div>}
        </div>
        <div className='bottom-second-half'>
          <div className="input-container">
            <input className='text-box' type='text' placeholder='Enter Prompt Here'/>
            <div className="icon-container">
              <a href='#'><FontAwesomeIcon icon={faFileImage} /></a>
              <a href='#'><FontAwesomeIcon icon={faMicrophone} /></a>
              <a onClick={Askme}><FontAwesomeIcon icon={faPaperPlane} /></a>
            </div>
          </div>
          <p>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
        </div>
      </div>
    </div>
  );
}

export default App;
