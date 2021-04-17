import React, { useState } from "react";
import Done from "./Done";
import Todo from "./Todo";

const Todos = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [currentEdit, setCurrentEdit] = useState("");
  const [todos, setTodos] = useState([]);
  const [err, setErr] = useState("");
  const [done, setDone] = useState([]);
  const [check, setCheck] = useState([]);
  const [edit, setEdit] = useState([]);

  const handleOnInputChange = (e) => {
    setCurrentInput(e.target.value);
  };
  const handleOnEditChange = (e) => {
    setCurrentEdit(e.target.value);
  };

  const handleOnKeyPress = (event) => {
    if (event.key === "Enter") {
      addOnList();
    }
  };

  const addOnList = () => {
    let newTodo = currentInput;
    let todoArr = [...todos];
    if (currentInput.trim().length) {
      if (!todoArr.includes(newTodo) && currentInput !== "") {
        todoArr.push(newTodo);
        setTodos(todoArr);
        setCurrentInput("");
        setErr("");
      } else {
        if (currentInput !== "") {
          setErr("this task already exists in list");
        } else {
          setErr("type something to input");
        }
      }
    } else {
      setErr("type something to input");
    }
  };

  const clearCompleted = () => {
    let arr = [...todos];
    done.forEach((item) => {
      arr = arr.filter((it) => it !== item);
    });
    setTodos(arr);
    setDone([]);
  };

  const clearCheckboxed = () => {
    let arr = [...todos];
    check.forEach((item) => {
      arr = arr.filter((it) => it !== item);
    });
    setTodos(arr);
    setCheck([]);
  };

  const clearAll = () => {
    setDone([]);
    setTodos([]);
    setCheck([]);
  };

  const Edit = (item) => {
    let arr = [...edit];
    if (arr.includes(item)) {
      arr = arr.filter((it) => it !== item);
    } else {
      arr.push(item);
    }
    setEdit(arr);
  };

  const handleOnEdit = (idx, currentEdit) => {
    let arr = [...todos];
    let arredit = [...edit];
    if (currentEdit !== "" && !arr.includes(currentEdit)) {
      arr[idx] = currentEdit;
      arredit = arredit.filter((it) => it !== arr[idx]);
      setTodos(arr);
      setEdit(arredit);
      setErr("");
    } else {
      if (currentEdit !== "") {
        setErr("this task already exists in list");
      }
    }
  };

  const markAsCompleted = (idx) => {
    let doneArr = [...done];
    let item = todos[idx];
    doneArr.push(item);
    setDone(doneArr);
  };

  const moveItem = (direction, idx) => {
    let arr = [...todos];
    let currentIndex;

    if (direction === "up" && idx !== 0) {
      currentIndex = idx - 1;
    }

    if (direction === "down" && idx !== todos.length - 1) {
      currentIndex = idx + 1;
    }

    if (currentIndex !== undefined) {
      arr[currentIndex] = todos[idx];
      arr[idx] = todos[currentIndex];
      setTodos(arr);
    }
  };

  const removeFromList = (idx) => {
    let item = todos[idx];
    setTodos(todos.filter((it) => it !== item));
    if (done.includes(item)) {
      setDone(done.filter((it) => it !== item));
    }
  };

  const onCheck = (item) => {
    let arr = [...check];
    if (check.includes(item)) {
      arr = arr.filter((it) => it !== item);
    } else {
      arr.push(item);
    }
    setCheck(arr);
  };

  return (
    <div className="container">
      <div className="header">To-Do List</div>

      <div className="input-line">
        <input
          type="text"
          id="input"
          maxLength="20"
          placeholder="Input Task"
          onChange={handleOnInputChange}
          value={currentInput}
          onKeyPress={handleOnKeyPress}
        />
        <button className="button" onClick={addOnList}>
          ADD
        </button>
        <button className="button" onClick={clearAll}>
          Clear
        </button>
        <button className="button" onClick={clearCompleted}>
          ClearCompleted
        </button>
        <button className="button" onClick={clearCheckboxed}>
          ClearCheckboxed
        </button>
      </div>

      <div className="blank"></div>

      <ul id="list-cont">
        {todos.map((item, idx) => {
          if (!done.includes(item)) {
            return (
              <Todo
                key={idx}
                idx={idx}
                item={item}
                editArr={edit}
                markAsCompleted={markAsCompleted}
                removeFromList={removeFromList}
                moveItem={moveItem}
                onCheck={onCheck}
                edit={Edit}
                handleOnEdit={handleOnEdit}
                handleOnEditChange={handleOnEditChange}
                handleOnKeyPress={handleOnKeyPress}
              />
            );
          } else {
            return (
              <Done
                key={idx}
                idx={idx}
                item={item}
                removeFromList={removeFromList}
                moveItem={moveItem}
              />
            );
          }
        })}
      </ul>
      {err !== "" && <div id="pop-up">{err}</div>}

      <div className="blank"></div>
    </div>
  );
};

export default Todos;
