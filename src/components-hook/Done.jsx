import React , {useState} from "react";
import trash from "../images/trash.svg"

const Done = (props) => {
    return (
        <li className="list done-list" id={props.idx} >
            <div>
                <button className="up" onClick={() => props.upItem(props.idx)}>UP</button>
                <button className="down" onClick={() => props.downItem(props.idx)}>DOWN</button>
            </div>
            <div className="list-txt done-txt" >{props.item}</div>
            <div className="imgs">
                <div><img src={trash}  alt="alt" className="img" onClick={() => props.removeFromList(props.idx)}/></div>
            </div>
        </li> 
    )
}

export default Done;