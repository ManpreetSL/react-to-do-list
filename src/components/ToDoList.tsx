import React, { useState } from 'react';
import ToDoItem from './ToDoItem';
import { TextField, Button } from '@mui/material';

type Props = {};

export default function ToDoList({}: Props) {
  const [toDos, setToDos] = useState([
    { id: 1, title: 'test', done: false },
    { id: 2, title: 'test2222', done: true }
  ]);
  const [toDoName, setToDoName] = useState('sasss');
  const [idCounter, setIdCounter] = useState(3);

  function addToDo() {
    console.log('adding to do');
    setToDos([...toDos, { id: idCounter, title: toDoName, done: false }]);
    setIdCounter(idCounter + 1);
    setToDoName('');
  }
  return (
    <div>
      <h1>To do list</h1>
      <div className='card'>
        <TextField
          id='to-do-title'
          label='Task name'
          variant='outlined'
          value={toDoName}
          onChange={(e) => setToDoName(e.target.value)}
        />
        <Button variant='contained' onClick={() => addToDo()}>
          Add
        </Button>
        <ul>
          {toDos.map((toDo) => {
            return <ToDoItem toDo={toDo} key={toDo.id} />;
          })}
        </ul>
      </div>
    </div>
  );
}
