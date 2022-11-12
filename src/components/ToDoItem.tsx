import {
  Button,
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useState } from 'react';
import { ToDo } from '../../types';

type Props = {
  toDo: ToDo;
  deleteToDo: (id: string) => void;
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ToDoItem({ toDo, deleteToDo }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [newToDoName, setNewToDoName] = useState(toDo.title);

  function toggleEditMode() {
    console.log('toggling edit');
    setEditMode(!editMode);
  }

  return (
    <ListItem
      secondaryAction={
        <Button variant='outlined' onClick={() => deleteToDo(toDo.id)}>
          X
        </Button>
      }
    >
      <ListItemButton>
        Done?:
        <ListItemIcon>
          <Checkbox
            edge='start'
            {...label}
            checked={toDo.done}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
      </ListItemButton>
      {editMode ? (
        <TextField
          label='Task name'
          variant='outlined'
          fullWidth
          value={newToDoName}
          onChange={(e) => setNewToDoName(e.target.value)}
        />
      ) : (
        <ListItemText>{toDo.title}</ListItemText>
      )}
      {editMode ? (
        <div>
          <ListItemButton>
            <ListItemIcon>
              <DoneIcon />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <CancelIcon />
            </ListItemIcon>
          </ListItemButton>
        </div>
      ) : (
        <ListItemButton onClick={toggleEditMode}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
        </ListItemButton>
      )}
    </ListItem>
  );
}
