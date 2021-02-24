import React from "react";
import ToDo from "./ToDo";

export default function ToDoList(props) {
  let list = "";
  let remainingToDos = 0;
  try {
    for (const key in props) {
      list = props[key].map(row => {
        remainingToDos += !row.completed ? 1 : 0;
        return (
          <ToDo
            items={row}
            key={row.id}
            completeTask={props.completeTask}
          />
        );
      });
    }
  } catch (e) {}
  return ( list.length ?
    <div className="ml-10 mt-45">
      <span><h4>Total todos remaining: {remainingToDos} out of {list.length}</h4></span>
      {list}
    </div>
    : ''
  );
}
