import React, { useState } from 'react';
import ToDoItem from './ToDoItem';

type Props = {};

export default function ToDoList({}: Props) {
  const [toDos, setToDos] = useState([
    { title: 'test', done: false },
    { title: 'test2222', done: true }
  ]);

  function addToDo() {}
  return (
    <div>
      <h1>To do list</h1>
      <div className='card'>
        <button onClick={() => addToDo}>Add</button>
        <ul>
          {toDos.map((toDo) => {
            return <ToDoItem toDo={toDo} />;
          })}
        </ul>
      </div>
    </div>
  );
}
