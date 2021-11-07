import { Button, FormControl, Input, InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import './App.css';
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase/compat/app"

function App() {
  const[todos, setTodos]=useState([]);
  const[input, setInput]=useState('');
  console.log(input);

  // when the app loads, we need to listen to  the database and fetch new todos as they are added/removed
  useEffect(() => {
    // this code here fires when the app loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data().todo))
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    });
  }, [])

  const addTodo =(event) =>{
    // this gets fired off when button is clicked
    event.preventDefault(); // will stop the refresh after submitting the form , i.e. after clicking add todo button

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    console.log('Yayyyyyyyy');
    setTodos([...todos, input]);
    setInput('');
    console.log(todos);
  }
  return (
    <div className="App">
      <h1>Hello World</h1>
      <form>
        <FormControl>
          <InputLabel>✔ Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="conatained" color="warning">Add Todo</Button>
      </form>
      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
          // <li>{todo}</li>
        ))} 
        {/*Todos is an array and todo is each item */}
      </ul>
    </div>
  );
}

export default App;
