import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";
import { Card } from "primereact/card";
import { Fieldset } from "primereact/fieldset";
import { Checkbox } from 'primereact/checkbox';
import "./css/ScrollPanelDemo.css";
import "./css/ButtonDemo.css";
import "./css/FormDemo.css";


const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);
  const inputRef = useRef(null);
  const [inputState, setInputState] = useState("");
  const [doneTodoItems, setDoneTodoItems] = useState([]);
  const [undoneTodoItems, setUndoneTodoItems] = useState([]);

  const deleteTodo = (id) => {
    const outputTodo = todoItems.filter((v, i) => {
      return v.id !== id;
    });
    setTodoItems(outputTodo);
  };

  useEffect(() => {
    renderDoneAndUndone();
  }, []);

  useEffect(() => {
    renderDoneAndUndone();
  }, [todoItems]);

  const renderDoneAndUndone = () => {
    const doneInStatus = todoItems.filter((v, i) => {
      return v.status === "done";
    });
    const undoneInStatus = todoItems.filter((v, i) => {
      return v.status === "undone";
    });
    setDoneTodoItems(doneInStatus);
    setUndoneTodoItems(undoneInStatus);
  };

  const toggleTodoItem = (event, item, index) => {
    const selectedTodo = todoItems.filter((v, i) => {
      return v.id === item.id;
    });
    const restTodoItems = todoItems.filter((v, i) => {
      return v.id !== item.id;
    });
    setTodoItems(restTodoItems);
    if (selectedTodo[0].status === "undone") {
      selectedTodo[0].status = "done";
    } else {
      selectedTodo[0].status = "undone";
    }
    setTodoItems([...restTodoItems, ...selectedTodo]);
    renderDoneAndUndone();
  };

  const addTodoItem = () => {
    const newTodoItems = [
      {
        id: Math.floor(Math.random() * 10000000),
        title: inputRef.current.value,
        status: "undone",
      },
    ];
    setTodoItems([...todoItems, ...newTodoItems]);
    setInputState("");
  };

  const inputChange = (event) => {
    setInputState(event.target.value);
  };

  return (
    <>
      <div className="scrollpanel-demo">
        <Card
          style={{
            width: "60%",
            margin: "1px auto",
          }}
        >
          <div className="card">
            <div style={{ textAlign: "center", marginTop: "-10px" }}>
              <Avatar
                icon="pi pi-list"
                size="xlarge"
                shape="circle"
                style={{
                  backgroundColor: "#2196F3",
                  color: "#ffffff",
                  marginBottom: "15px",
                }}
              />
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: "600",
                  marginLeft: "10px",
                }}
              >
                ToDo List
              </span>
              <div className="add-todo-items">
                <InputText
                  placeholder="Add task here...."
                  value={inputState}
                  ref={inputRef}
                  onChange={(event) => inputChange(event)}
                />
                <Button
                  icon="pi pi-plus"
                  className="p-button-rounded ms-2"
                  style={{
                    backgroundColor: "#2196F3",
                    color: "#ffffff",
                    marginLeft: "20px",
                  }}
                  aria-label="Bookmark"
                  onClick={() => addTodoItem()}
                />
              </div>
            </div>
            <div className="grid">
              <div className="col-12 md:col-12">
                <Fieldset legend="Completed Tasks">
                  <ScrollPanel style={{ width: "100%", height: "150px" }}>
                    <div style={{ padding: "1em", lineHeight: "1.5" }}>
                    {doneTodoItems.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            item.status === "undone"
                              ? "undone-item"
                              : "done-item"
                          }
                        >
                           <Checkbox  onChange={(event) =>
                                toggleTodoItem(event, item, index)
                              } checked={
                                item.status === "undone" ? false : true
                              }></Checkbox>
                          <h4 className="todo-title">{item.title}</h4>
                          <i className="pi pi-trash pi-color" onClick={() => deleteTodo(item.id)}></i>
                          </div>
                          );
                        })}
                      {doneTodoItems.length === 0 ? (
                        <h4>Great! You Completed all your task</h4>
                      ) : null}
                    </div>
                  </ScrollPanel>
                </Fieldset>
              </div>
              <div className="col-12 md:col-12">
                <Fieldset legend="Pending Task">
                  <ScrollPanel style={{ width: "100%", height: "150px" }}>
                    <div style={{ padding: "1em", lineHeight: "1.5" }}>
                        {undoneTodoItems.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={
                                item.status === "undone"
                                  ? "undone-item"
                                  : "done-item"
                              }
                            >
                             <Checkbox  onChange={(event) =>
                                    toggleTodoItem(event, item, index)
                                  } checked={
                                    item.status === "undone" ? false : true
                                  }></Checkbox>
                              <h4 className="todo-title">{item.title}</h4>
                              <i className="pi pi-trash pi-color" onClick={() => deleteTodo(item.id)}></i>  
                            </div>
                          );
                        })}
                      {undoneTodoItems.length === 0 ? (
                        <h4>No Pending Task</h4>
                      ) : null}
                    </div>
                  </ScrollPanel>
                </Fieldset>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TodoList;
