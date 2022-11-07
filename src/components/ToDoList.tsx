import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem';
import { TextField, Button } from '@mui/material';
import { db } from '../../firebase';
import {
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { ToDo } from '../../types';

type Props = {};

export default function ToDoList({}: Props) {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [toDoName, setToDoName] = useState('sasss');
  const [idCounter, setIdCounter] = useState(3);

  useEffect(() => {
    console.log('fetch items from Firestore');

    const unsubscribe = onSnapshot(
      collection(db, 'toDos'),
      (snapshot) => {
        setToDos(
          snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data()
              } as ToDo)
          )
        );
      },
      (error) => {
        console.error('Error fetching to do items', error);
      }
    );

    return () => {
      // console.log('clean up');
      // Stop listening to changes
      // unsubscribe();
    };
  }, []);

  async function addToDo() {
    console.log('adding to do');
    // setToDos([...toDos, { id: idCounter, title: toDoName, done: false }]);

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, 'toDos'), {
      title: toDoName,
      done: false,
      timestamp: serverTimestamp()
    });

    console.log('docRef:', docRef.id);

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
