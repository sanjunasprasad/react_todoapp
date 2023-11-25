import React from "react";
import "./todo.css";
import { useState ,useRef,useEffect} from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

function Todo() {

  
  const [todo, settodo] = useState(""); //newly entered data
  const [todos, settodos] = useState([]); //already entered data

  const handlesubmit = (e) => {
    e.preventDefault();
  };

  const addtodo = () => {
    settodos([...todos, {list:todo, id:Date.now(), status:false}]);
    console.log("data", todos);
    settodo('')
  };

  const inputref = useRef('null')
  useEffect(()=>{
    console.log(inputref.current)
    inputref.current.focus()
  })

  const onDelete = (id) =>{
      settodos(todos.filter((input) =>input.id !== id))
  }

  const oncomplete = (id) =>{
    let  complete= todos.map((list)=>{
        if(list.id === id){
          return({ ...list, status: !list.status })
        }
        return list
    })
    settodos(complete)
}

  return (
    <div className='container'>
      <h2>TODO APP</h2>
      <form className='form-group' onSubmit={handlesubmit}>
        <input type="text" value={todo} ref={inputref} placeholder=" Enter your task" className="form-control" onChange={(event) => settodo(event.target.value)}/> {/* {input} */}
        <button onClick={addtodo}>ADD</button>
      </form>
      <div className='list'>
        <ul>

          {
             todos.map((input) => (
            <li className="list-items">
             <div className="list-item-list"  id={ input.status? 'list-item' : '' }>  {input.list} </div>
              <span>
                 <IoMdDoneAll className="list-item-icons" id='complete' title="complete" onClick={()=> oncomplete (input.id)}/>
                 <FiEdit className="list-item-icons" id='edit' title="edit"/>
                 <MdDeleteOutline className="list-item-icons" id='delete' title="delete" onClick={()=> onDelete(input.id)}/>
              </span>
            </li>
            ))
          }

        </ul>
      </div>
    </div>
  );
}

export default Todo;
