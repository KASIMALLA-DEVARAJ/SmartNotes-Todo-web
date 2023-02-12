import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import AppNavbar from './AppNavbar';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import {GrNotes} from 'react-icons/gr'
import Note from './Note';
import { URL } from '../App';

export default function Notes(){

  const navigate = useNavigate();

  const [username,setUsername] = useState('');
  const [notes,setNotes] = useState([])
  const [noteData,setNoteData] = useState('');
  const [title,setTitle] = useState('');
  const [userid,setUserid] = useState('')
  const [findItem,setFinditem] = useState('')
  const [update,setUpdate] = useState(false);
  const [noteid,setNoteid] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${URL}/addnotes`,{username,title,noteData,date:Date().toString(),userid}).then(res => {
      setTitle('');
      setNoteData('');
      // console.log(res);
      setNotes([...notes,{username,title,noteData,date:Date().toString()}])
    }).catch(err => {
      console.log(err);
    })
  }

  const displayData = () => {
    axios.post(`${URL}/notes`,{username:username}).then(res => {
        setNotes([...res.data.notes])
        // console.log([...res.data.notes]);
      }).catch(err => {
        console.log(err);
      })
  }

  function handleDelete(id){
    axios.post(`${URL}/deletenote`,{id}).then(res => {
      console.log(res);
      displayData();
    }).catch(err => {
      console.log(err);
    })
  }

  const handleUpdate = (id,data,title) => {
    setUpdate(true);
    setNoteData(data);
    setNoteid(id);
    setTitle(title)
  }

  const updateNote = () => {
    axios.post(`${URL}/updatenote`,{noteid,noteData,title}).then(res => {
      // console.log(res);
      setNoteData('');
      setTitle('')
      displayData();
      setUpdate(false)
    }).catch(err => {
      console.log(err);
    })
  }

  const cancelUpdate = () => {
    setNoteData('');
      setTitle('')
      setUpdate(false);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log(token)
    axios.get(`${URL}/protected`,{
      headers : {
        Authorization : token,
      }
    }).then(res => {
      setUsername(res.data.user.username);
      // setTnotes(res.data.uer.notes);
      setUserid(res.data.user.id);
      // console.log(res.data.user.id);
      axios.post(`${URL}/notes`,{username:res.data.user.username}).then(res => {
        setNotes([...res.data.notes])
        
        // console.log([...res.data.notes]);
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
      navigate("/signin");
    })
  },[])

  return (
    <>
    <AppNavbar logged={true}/>
    <h3 className='text-center' style={{color:"#011440"}}>Save & Organise Notes</h3>
    <br/>
    <Container className='border shadow p-5 rounded' style={{minHeight:"600px",backgroundColor:"white"}}>
    <div className='d-lg-flex justify-content-between  '><h4 className='text-primary'>Welcome {username}</h4>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label className='text-success'>Search Notes:</Form.Label>
        <Form.Control value={findItem} onChange={(e) => setFinditem(e.target.value)} type="text" placeholder="Search notes.." required/>
      </Form.Group>
    </div>
    
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Write your Notes..</Form.Label>
        <Form.Control value={noteData} onChange={(e) => setNoteData(e.target.value)} name="noteData" as="textarea" rows={3} required/>
      </Form.Group>
      
      {update ? <>
          <Button className='me-2' onClick={updateNote} variant="primary"> Update </Button> 
          <Button onClick={cancelUpdate} variant="danger" type="Cancel">Cancel</Button>
        </> : <Button variant="primary" type="submit">Submit</Button>}
    </Form>
    <br/>
    <Container>
      <h4>Your Notes :</h4>
    {notes.length != 0 ? <Row style={{maxHeight:"455px",}} className='overflow-auto'>
     {notes.filter(note => note.title.toLowerCase().includes(findItem.toLowerCase())).map((note,indx) => <Note note={note} key={indx} handleDelete={handleDelete} handleUpdate={handleUpdate} />)}
        </Row> : <h3>No notes</h3> }
    </Container>

    </Container>
    </>
  )
}
