import React from "react";
import Todo from "./Todo";
import Done from "./Done";

class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      currentInput: "",
      currentEdit: "",
      done: [],
      check: [],
      err: "",
      edit: [],
    };
  }

  addOnList = () => {
    let newTodo = this.state.currentInput;
    let todoArr = [...this.state.todos];

    if (this.state.currentInput.trim().length) {
      if (!todoArr.includes(newTodo) && this.state.currentInput !== "") {
        todoArr.push(newTodo);
        this.setState({
          todos: todoArr,
          currentInput: "",
          err: "",
        });
      } else {
        if (this.state.currentInput !== "") {
          this.setState({ err: "this task already exists in list" });
        } else {
          this.setState({ err: "type somthing to input" });
        }
      }
    } else {
      this.setState({ err: "type something to input" });
    }
  };

  handleOnEditChange = (e) => {
    this.setState({ currentEdit: e.target.value });
  };

  handleOnInputChange = (e) => {
    this.setState({ currentInput: e.target.value });
  };

  removeFromList = (idx) => {
    let item = this.state.todos[idx];
    this.setState({ todos: this.state.todos.filter((it) => it !== item) });

    if (this.state.done.includes(item)) {
      this.setState({ done: this.state.done.filter((it) => it !== item) });
    }
  };

  markAsCompleted = (idx) => {
    let doneArr = [...this.state.done];
    let item = this.state.todos[idx];
    doneArr.push(item);

    this.setState({ done: doneArr });
  };

  upItem = (idx) => {
    if (idx !== 0) {
      let arr = [...this.state.todos];
      arr[idx - 1] = this.state.todos[idx];
      arr[idx] = this.state.todos[idx - 1];
      this.setState({ todos: arr });
    }
  };

  downItem = (idx) => {
    if (idx !== this.state.todos.length - 1) {
      let arr = [...this.state.todos];
      arr[idx + 1] = this.state.todos[idx];
      arr[idx] = this.state.todos[idx + 1];
      this.setState({ todos: arr });
    }
  };

  onCheck = (item) => {
    let arr = [...this.state.check];
    if (this.state.check.includes(item)) {
      arr = arr.filter((it) => it !== item);
    } else {
      arr.push(item);
    }
    this.setState({ check: arr });
  };

  clearAll = () => {
    this.setState({
      todos: [],
      done: [],
    });
  };

  clearCompleted = () => {
    let arr = [...this.state.todos];
    this.state.done.forEach((item) => (arr = arr.filter((it) => it !== item)));
    this.setState({
      todos: arr,
      done: [],
    });
  };

  clearCheckboxed = () => {
    let arr = [...this.state.todos];
    let doneArr = [...this.state.done];
    this.state.check.forEach((item) => {
      if (doneArr.includes(item)) {
        doneArr = doneArr.filter((it) => it !== item);
      }
      arr = arr.filter((it) => it !== item);
    });

    this.setState({
      todos: arr,
      done: doneArr,
      check: [],
    });
  };

  edit = (item) => {
    let arr = [...this.state.edit];
    if (arr.includes(item)) {
      arr = arr.filter((it) => it !== item);
    } else {
      arr.push(item);
    }
    this.setState({
      edit: arr,
    });
  };

  handleOnEdit = (idx, currentEdit) => {
    let arr = [...this.state.todos];
    let arredit = [...this.state.edit];
    if (currentEdit !== "" && !arr.includes(currentEdit)) {
      arr[idx] = currentEdit;
      arredit = arredit.filter((it) => it !== arr[idx]);
      this.setState({
        todos: arr,
        edit: arredit,
        err: "",
      });
    } else {
      if (currentEdit !== "") {
        this.setState({
          err: "this task already exists in list",
        });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="header">To-Do List</div>

        <div className="input-line">
          <input
            type="text"
            id="input"
            maxLength="20"
            placeholder="Input Task"
            onChange={this.handleOnInputChange}
            value={this.state.currentInput}
          />
          <button className="button" onClick={this.addOnList}>
            ADD
          </button>
          <button className="button" onClick={this.clearAll}>
            Clear
          </button>
          <button className="button" onClick={this.clearCompleted}>
            ClearCompleted
          </button>
          <button className="button" onClick={this.clearCheckboxed}>
            ClearCheckboxed
          </button>
        </div>

        <div className="blank"></div>

        <ul id="list-cont">
          {this.state.todos.map((item, idx) => {
            if (!this.state.done.includes(item)) {
              return (
                <Todo
                  key={idx}
                  idx={idx}
                  item={item}
                  editArr={this.state.edit}
                  markAsCompleted={this.markAsCompleted}
                  removeFromList={this.removeFromList}
                  upItem={this.upItem}
                  downItem={this.downItem}
                  onCheck={this.onCheck}
                  edit={this.edit}
                  handleOnEdit={this.handleOnEdit}
                  handleOnEditChange={this.handleOnEditChange}
                />
              );
            } else {
              return (
                <Done
                  key={idx}
                  idx={idx}
                  item={item}
                  removeFromList={this.removeFromList}
                  upItem={this.upItem}
                  downItem={this.downItem}
                />
              );
            }
          })}
        </ul>
        {this.state.err !== "" && <div id="pop-up">{this.state.err}</div>}

        <div className="blank"></div>
      </div>
    );
  }
}

export default Todos;
