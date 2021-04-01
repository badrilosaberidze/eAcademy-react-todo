import React from "react";
import trash from "../images/trash.svg"

class Done extends React.Component{
    render(){
        return (
            <li className="list done-list" id={this.props.idx} >
                <div>
                    <button className="up" onClick={() => this.props.upItem(this.props.idx)}>UP</button>
                    <button className="down" onClick={() => this.props.downItem(this.props.idx)}>DOWN</button>
                </div>
                <div className="list-txt done-txt" >{this.props.item}</div>
                <div className="imgs">
                    <div><img src={trash}  alt="alt" className="img" onClick={() => this.props.removeFromList(this.props.idx)}/></div>
                </div>
            </li> 
    )}
}

export default Done;