import React from "react";

export default function ToDo(props) {
  const { id, todo: task, completed } = props.items;

  const itemStyle = () => {
    return {
      textDecoration: completed ? "line-through" : "none",
      cursor: "pointer"
    };
  };

  return (
    <React.Fragment>
      <div className="list-div">
      
        <div key={id} onClick={() => props.completeTask(id)}  >
        
          <span className="ml-3" style={itemStyle()}>{task}</span>

        </div>
      </div>
    </React.Fragment>
  );
}
