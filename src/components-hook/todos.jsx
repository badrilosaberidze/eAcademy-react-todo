import React , {useState} from "react";
import Done from "./Done"
import Todo from "./todo"

const Todos = () =>{

    const[currentInput,setCurrentInput] = useState("");
    const[currentEdit,setCurrentEdit] = useState("");
    const[todos,setTodos] = useState([]);
    const[err,setErr] = useState("");
    const[done,setDone] = useState([]);
    const[check,setCheck] = useState([]);
    const[edit,setEdit] = useState([]);

    const handleOnInputChange = (e) =>{
        setCurrentInput(e.target.value);
    }
    const handleOnEditChange = (e) =>{
        setCurrentEdit(e.target.value);
    }


    const addOnList = () =>{
        let newTodo=currentInput;
        let todoArr=[...todos];
        let k=true;

        if (currentInput===""){
            k=false;
        }

        if (!todoArr.includes(newTodo) && k){
            todoArr.push(newTodo);
            setTodos(todoArr);
            setCurrentInput("");
            setErr("");
        }else{
            if (k!==false){
                setErr("this task already exists in list");
            }
        }
    }

    const clearCompleted = () =>{
        let arr=[...todos];
        for (let i=0; i<done.length; i++){
            arr=arr.filter((it) => it!==done[i]);
        }
        setTodos(arr);
        setDone([]);
    }

    const clearCheckboxed = () =>{
        let arr=[...todos];
        let doneArr=[...done];
        for (let i=0; i<check.length; i++){
            arr = arr.filter((it) => it!==check[i]);

            if (doneArr.includes(check[i])){
                doneArr = doneArr.filter((it) => it!==check[i]);
            }
        }

        setTodos(arr);
        setDone(doneArr);
        setCheck([]);
    }

    const clearAll = () =>{
        setDone([]);
        setTodos([]);
        setCheck([]);
    }

    const Edit = (item) =>{
        let arr=[...edit];
        if (arr.includes(item)){
            arr=arr.filter((it) => it!==item);
        }else{
            arr.push(item);
        }
        setEdit(arr);
    }

    const handleOnEdit = (idx , currentEdit) =>{
        let arr=[...todos];
        let arredit=[...edit];
        if (currentEdit!=="" && !arr.includes(currentEdit)){
            arr[idx]=currentEdit;
            arredit=arredit.filter((it) => it!==arr[idx]);
            setTodos(arr);
            setEdit(arredit);
            setErr("");
        }  else{
            if (currentEdit!==""){
                setErr("this task already exists in list");
            }
        }
    }

    const markAsCompleted = (idx) =>{
        let doneArr=[...done];
        let item=todos[idx];
        doneArr.push(item);
        setDone(doneArr);
    }

    const upItem = (idx) =>{
        if (idx!==0){
            let arr=[...todos];
            arr[idx-1]=todos[idx];
            arr[idx]=todos[idx-1];
            setTodos(arr);
        }
    }

    const downItem = (idx) =>{
        if (idx!==todos.length-1){
            let arr=[...todos];
            arr[idx+1]=todos[idx];
            arr[idx]=todos[idx+1];
            setTodos(arr);
        }
    }

    
    const removeFromList = (idx) =>{
        let item =todos[idx];
        setTodos(todos.filter((it) => it!==item));
        if (done.includes(item)){
            setDone(done.filter((it) => it!==item));
        }
    }

    const onCheck = (item) =>{
        let arr=[...check];
        if (check.includes(item)){
            arr=arr.filter((it) => it!==item);
        }else{
            arr.push(item);
        }
        setCheck(arr);
    }


    return (
        <div className="container">

                <div className="header">To-Do List</div>

                <div className="input-line">
                    <input type="text" id="input" maxLength="20"
                        placeholder="Input Task"
                        onChange={handleOnInputChange}
                        value={currentInput}
                    />
                    <button className="button" onClick={addOnList}>ADD</button>
                    <button className="button" onClick={clearAll}>Clear</button>
                    <button className="button" onClick={clearCompleted}>ClearC</button>
                    <button className="button" onClick={clearCheckboxed}>ClearCB</button>
                </div>

                <div className="blank"></div>

                <ul id="list-cont">

                {todos.map((item,idx) =>{
                    if (!done.includes(item)){
                        return (
                            <Todo 
                            key={idx}
                            idx={idx}
                            item={item}
                            editArr={edit}
                            markAsCompleted={markAsCompleted}
                            removeFromList={removeFromList}
                            upItem={upItem}
                            downItem={downItem}
                            onCheck={onCheck}
                            edit={Edit}
                            handleOnEdit={handleOnEdit}
                            handleOnEditChange={handleOnEditChange}
                            />
                        )}else{

                        return(
                            <Done
                            key={idx}
                            idx={idx}
                            item={item}
                            removeFromList={removeFromList}
                            upItem={upItem}
                            downItem={downItem}
                            />
                        )}
                })}
                </ul>
                { err !== "" && ( <div id="pop-up">{err}</div> ) }

                <div className="blank"></div>
            </div>
    );
}

export default Todos;