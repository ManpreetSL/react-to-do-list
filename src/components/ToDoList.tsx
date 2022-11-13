import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem';
import { TextField, Button, FormControl as form, List } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { db } from '../../firebase';
import {
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { ToDo } from '../../types';

type Props = {};

export default function ToDoList({}: Props) {
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [toDoName, setToDoName] = useState('sasss');
  const [idCounter, setIdCounter] = useState(3);

  const toDosQuery = query(
    collection(db, 'toDos'),
    orderBy('timestamp', 'desc')
  );

  function findToDoById(id: string) {
    return toDos.find((toDo) => toDo.id === id);
  }

  useEffect(() => {
    console.log('fetch items from Firestore');

    const unsubscribe = onSnapshot(
      toDosQuery,
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
      createdTime: serverTimestamp()
    });

    console.log('docRef:', docRef.id);

    setIdCounter(idCounter + 1);
    setToDoName('');
  }

  async function setDone(id: string, done: boolean) {
    console.log('Setting done state for', id, 'to', done);

    const docRef = doc(db, 'toDos', id);
    console.log('docRef', docRef);
    await updateDoc(docRef, {
      done: done
    });
  }

  async function saveChanges(id: string, newTitle: string) {
    console.log('Saving changes to doc', id, 'New name is', newTitle);

    if (findToDoById(id)?.title === newTitle) {
      return console.log('saveChanges: No changes. Returning...');
    }

    const docRef = doc(db, 'toDos', id);
    await updateDoc(docRef, {
      title: newTitle,
      updatedTime: serverTimestamp()
    });
  }

  async function deleteToDo(id: string) {
    console.log('Deleting doc', id);
    await deleteDoc(doc(db, 'toDos', id));
  }

  return (
    <div>
      <h1>To do list</h1>
      <div className='card'>
        <form>
          <Grid container spacing={2}>
            <Grid xs={10}>
              <TextField
                id='to-do-title'
                label='Task name'
                variant='outlined'
                fullWidth
                value={toDoName}
                onChange={(e) => setToDoName(e.target.value)}
              />
            </Grid>
            <Grid xs={2}>
              <Button
                size='large'
                variant='contained'
                onClick={() => addToDo()}
              >
                Add
              </Button>
            </Grid>
            <Grid xs={12}>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper'
                }}
              >
                {toDos.map((toDo) => {
                  return (
                    <ToDoItem
                      toDo={toDo}
                      key={toDo.id}
                      setDone={setDone}
                      saveChanges={saveChanges}
                      deleteToDo={deleteToDo}
                    />
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
