import React from "react";
import check from "../images/check.svg"
import edit from "../images/edit.svg"
import trash from "../images/trash.svg"


class Todo extends React.Component{
    constructor (props){
        super(props);
        this.state= {
            currentEdit:""
        };
    }
    handleOnEditChange = (e) =>{
        this.setState({currentEdit: e.target.value});
    }
    
    render(){
        let edit_class= this.props.editArr.includes(this.props.item) ? "edit-wrapper" : "nedit-wrapper";
        return (
        <li className="list" id={this.props.idx}  >
            <div>
                <button className="up" onClick={() => this.props.upItem(this.props.idx)}>UP</button>
                <button className="down" onClick={() => this.props.downItem(this.props.idx)}>DOWN</button>
            </div>
            <div className="list-txt" >{this.props.item}</div>
            <div className="imgs">
                <div> <img src={check} alt="alt" className="img" onClick={() => this.props.markAsCompleted(this.props.idx)}/></div>
                <div ><img src={edit} alt="alt" className="img"  onClick={() => this.props.edit(this.props.item)}/></div>
                <div><img src={trash}  alt="alt" className="img" onClick={() => this.props.removeFromList(this.props.idx)}/></div>
                <input type="checkbox" className="cBox" onChange={() => this.props.onCheck(this.props.item)}/>
            </div>
            

            <div className={edit_class}>
                <input type="text" 
                placeholder={this.props.item} 
                onChange={this.handleOnEditChange}/>
                <button className="button" onClick={() => this.props.handleOnEdit(this.props.idx,this.state.currentEdit)}>Edit</button>
            </div>

        </li> 
    )}
}

export default Todo;