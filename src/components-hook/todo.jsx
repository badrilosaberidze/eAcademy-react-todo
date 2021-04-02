import React , {useState} from "react";
import check from "../images/check.svg"
import edit from "../images/edit.svg"
import trash from "../images/trash.svg"

const Todo = (props) =>{
    const[currentEdit,setCurrentEdit] = useState("");
    const handleOnEditChange = (e) =>{
        setCurrentEdit(e.target.value);
    }

    let edit_class= props.editArr.includes(props.item) ? "edit-wrapper" : "nedit-wrapper";
    return(
        <li className="list" id={props.idx}  >
            <div>
                <button className="up" onClick={() => props.upItem(props.idx)}>UP</button>
                <button className="down" onClick={() => props.downItem(props.idx)}>DOWN</button>
            </div>
            <div className="list-txt" >{props.item}</div>
            <div className="imgs">
                <div> <img src={check} alt="alt" className="img" onClick={() => props.markAsCompleted(props.idx)}/></div>
                <div ><img src={edit} alt="alt" className="img"  onClick={() => props.edit(props.item)}/></div>
                <div><img src={trash}  alt="alt" className="img" onClick={() => props.removeFromList(props.idx)}/></div>
                <input type="checkbox" className="cBox" onChange={() => props.onCheck(props.item)}/>
            </div>
            

            <div className={edit_class}>
                <input type="text" 
                placeholder={props.item} 
                onChange={handleOnEditChange}/>
                <button className="button" onClick={() => props.handleOnEdit(props.idx,currentEdit)}>Edit</button>
            </div>

        </li> 
    )
}

export default Todo;