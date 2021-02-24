import React, { useState, useEffect } from "react";
import ToDoList from "./List";
import uuid from "react-uuid";
import "./App.css";

const LOCAL_STORAGE_TODOS = "LOCAL_STORAGE_TODOS";

export default function App() {

  const [toDo, setToDo] = useState('');
  const [todos, updateList] = useState([]);
  const [showErr, updateErrState] = useState(false);


  //To get the todos from local storage
  useEffect(() => {
    const allTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS));
    if (allTodos) 
      updateList(allTodos);
    }, 
  []);


  //To save the todos in local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(todos));
  }, [todos]);


  //To handle input value
  const handleInputValue = e => {
    if(e.target.value && e.target.value.trim()){
      setToDo(e.target.value);
      if (showErr) {
        updateErrState(false);
      }
    }else{
      setToDo('');
    }
  };


  //To handle add button click
  const handleAddItem = () => {
    if (toDo !== "") {
      const item = {
        id: uuid(),
        todo: toDo,
        completed: false
      };
      updateList(items => {
        return [...items, item];
      });
      setToDo("");
    } else {
      updateErrState(true);
    }
  };

  //To handle enter key press
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  }

  //it completes the task
  const completeTask = id => {
    const toDo = todos.map(item => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    updateList(toDo);
  };


  return (
    <React.Fragment>
          <div className="ml-10">
            <h1 className="heading">ToDo App</h1>
          </div>

          <div>
            <span>
              <input 
                  type="text" 
                  className="ml-10 input-bx"
                  placeholder="Enter your todo here."
                  value={toDo}
                  onChange={handleInputValue}
                  onKeyUp={handleKeyPress}
              />
            </span>
            <span>
                <button
                  className="add-btn"
                  onClick={handleAddItem}
                > Add
                </button>
            </span>
          </div>

          {showErr ? <div className="ml-10 error">Please enter a todo</div> :'' }  
          
          <ToDoList todos={todos} completeTask={completeTask} />
    
    </React.Fragment>
  );
}
