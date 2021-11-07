import { Button, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';
import "./Todo.css";
import React, { useState } from 'react';
import db from "./firebase";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles=makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
    },
}));

function Todo(props) {

    const classes=useStyles();

    const [modalStyle] = React.useState(getModalStyle);

    const[open, setOpen]=useState(false);
    const[input, setInput]=useState();


    const updateTodo=() => {
        // update the todo with new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true});
        setOpen(false);
    }


    return (
        <>
        <Modal
            size="lg"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={open}
            onClose={e=>setOpen(false)}
        >
            <div style={modalStyle}  className={classes.paper}>
                <h1 id="modal-modal-title">UPDATE TODO</h1>
                <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                <Button onClick={updateTodo}>Update Todo</Button>
            </div>
        </Modal>

        <List className="todo__list">
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Todo" />
            </ListItem>
            <button onClick={e=>setOpen(true)}> Edit Me </button>
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete() } />
        </List>
        </>
    )
}

export default Todo
