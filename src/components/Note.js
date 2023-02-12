import React from 'react'
import {GrNotes} from 'react-icons/gr'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Note({note,handleDelete,handleUpdate}) {
  return (
    <>
        <Card  bg='light' className='shadow m-2' border="light" style={{ width: '20rem'}}>
          <Card.Header><GrNotes style={{marginRight:"10px"}}/>Note</Card.Header>
          <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <div style={{fontSize:"12px"}} className='fw-bold text-info'>Created : {note.date.slice(0,10)} {note.date.slice(11,16)}</div>
          <Card.Text>
              {note.noteData}
          </Card.Text>
          <Button className='me-2' onClick={() => handleDelete(note._id)} variant="danger" size='sm'>Delete</Button>
          <Button onClick={() => handleUpdate(note._id,note.noteData,note.title)} variant="primary" size='sm'>Update</Button>
          </Card.Body>
      </Card>
    </>
  )
}
