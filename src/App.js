import logo from './logo.svg';
import './App.css';
import AppNavbar from './components/AppNavbar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${URL}/protected`,{
      headers : {
        Authorization : token,
      }
    }).then(res => {
      navigate('/notes')
      // console.log(res);
    }).catch(err => {
      console.log(err);
      navigate("/");
    })
  },[])

  return (
    <>
    <AppNavbar />
    <Container className="p-4 font-mono">
      <Row>
        <div className='d-lg-flex align-items-center justify-content-evenly'>
          <div className='p-lg-5'>
          <h1 className='text-sm-fs-1'>Get more from your note-taking app</h1>
          <br></br>
          <p className='fs-4'>Capture important ideas and information in ways that help you stay productive.</p>
          <br/>
          <div className="d-grid">
            <Button variant="primary" size="lg">
             <Link to='/signup'><span style={{color:"white",textDecoration:null}}>Sign up for free </span></Link>
            </Button>
          </div>
          <br/>
          <br/>
          </div>
          <div><img className='w-100 ' src="https://evernote.com/c/assets/features/notes-app/note_app_hero_image@2x.png?31e8ccec3cb7328f" /></div>
        </div>
      </Row>
      <br/>
      <br/>
      <br/>
      <br/>
      {/* <Row>
      <div className=' d-lg-flex align-items-center justify-content-evenly'>
      <div><img className='w-100' src="https://evernote.com/c/assets/features/notes-app/searching_made_easy@2x.png?f5f007e5bd4d17dd" /></div>
      
      <div className='p-lg-5'>
      <h1>Searching made easy</h1>
        <br></br>
        <p className='fs-4'>Find notes by searching for titles, dates, content types, and keywords—including words in pictures and handwriting—and get suggestions while you type.</p></div>
        </div>
      </Row> */}
      <br/>
      <br/>
      <br/>
      <br/>
      <Row>
      <div className=' d-lg-flex align-items-center justify-content-evenly'>
      <div><img className='w-100' src="https://evernote.com/c/assets/features/notes-app/take_notes_take_action@2x.png?fec1a66f5a0b2c68" /></div>
      <div className='p-lg-5'>
      <h1>Take notes and take action</h1>
        <br></br>
        <p className='fs-4'>Create tasks inside your notes to give your to-dos context, streamline your workflow, and get more done—faster.</p></div>
        
        </div>
      </Row>
      <Row>
        <div className='container text-center '>© 2023 SmartNotes project. All rights reserved.Security Legal Privacy</div>
      </Row>
    </Container>
  
    </>
    
  );
}
  export default App;
  