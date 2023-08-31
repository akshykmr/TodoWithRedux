import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, removeAllTodo} from './../actions/actionPerformer'; 

const Output = () => {

   
  const dispatch = useDispatch();
  const list = useSelector((state) => state.totoReducer.list);
console.log("list", list)
  return (
    <div>
      {list.map((elem) => {
        return (
            <ul key={elem.id}>
            <li>{elem.data.task}</li>
            <button
              type="button"
              onClick={() => dispatch(deleteTodo(elem.id))} // Call the addTodo action
              className="btn btn-primary"
            >
              delete
            </button>
          </ul>
        )
      })}
      {list.length ? <button
        type="button"
        onClick={() => dispatch(removeAllTodo())} // Call the addTodo action
        className="btn btn-primary"
      >
        delete all
      </button> : ""}
      
    </div>
  );
}

export default Output;
