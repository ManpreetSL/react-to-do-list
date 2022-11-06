import React from 'react';

type Props = {
  toDo: {
    id?: number;
    title: string;
    done: boolean;
  };
};

export default function ToDoItem({ toDo }: Props) {
  return (
    <div>
      <li>
        {toDo.title} Done?: {String(toDo.done)}
      </li>
    </div>
  );
}
