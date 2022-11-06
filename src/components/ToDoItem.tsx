import React from 'react';

type Props = {
  toDo: {
    id?: string;
    title: string;
    done: boolean;
  };
};

export default function ToDoItem({ toDo }: Props) {
  return (
    <li>
      {toDo.title} Done?: {String(toDo.done)}
    </li>
  );
}
