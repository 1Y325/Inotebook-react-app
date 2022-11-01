


import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props) =>{
  const host = "http://localhost:5000"
    
  const notesInitial = []
  const [notes , setNotes] = useState(notesInitial)

  


//get all a note
const getNotes = async () =>{
  const response = await fetch(`${host}/api/notes/fetchallnote`, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token')
      
    },
   
  
  });
  const json = await response.json()
  

setNotes(json)



}





  //add a note
  const addNote = async (title , description , tag) =>{
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
        
      },
     
      body: JSON.stringify({ title , description , tag}) 
    });
    
    const note = await response.json();
    setNotes(notes.concat(note))
    
  }


  //delete note

  const deleteNote = async (id) =>{
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
        
      },
     
      
    });
    // eslint-disable-next-line
    const json =  response.json(); 
    
   const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes);
  }



  // edit note

  const editNote = async (id, title , description , tag) =>{
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
        
      },
     
      body: JSON.stringify({title , description , tag}) 
    });
    // eslint-disable-next-line
    const json =  response.json(); 
    
  
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if(element._id===id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break;
      }
    }
    setNotes(newNotes)
  }


    return (
        <NoteContext.Provider value ={{notes, addNote , deleteNote , editNote , getNotes}}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState

















































// hackwithInfy 
// codevita  , google kick start 
