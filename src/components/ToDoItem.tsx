import { Button } from '@mui/material';
import React from 'react';
import { ToDo } from '../../types';

type Props = {
  toDo: ToDo;
  deleteToDo: (id: string) => void;
};

export default function ToDoItem({ toDo, deleteToDo }: Props) {
  return (
    <li>
      {toDo.title} Done?: {String(toDo.done)}
      <Button variant='outlined' onClick={() => deleteToDo(toDo.id)}>
        X
      </Button>
    </li>
  );
}
