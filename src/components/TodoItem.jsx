import React from "react";
import styled from "styled-components";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { deleteTodo } from "../features/todoSlice";

const ItemDiv = styled.div`
  margin-top: 1.6rem;

  .item_box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .task_title {
      background-color: #e1d9ff;
      width: 83%;
      padding: 1rem 1rem;
      color: #333;
      font-size: 1.6rem;
      font-weight: 450;
      box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.2);
      margin-right: 0.5rem;
    }

    .flex_btns {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.3rem;

      .flex_icon {
        background-color: #8388f3;
        font-size: 3rem;
        padding: 0.5rem 0.5rem;
        color: #eee;
        border-radius: 0.5rem;
        cursor: pointer;
        box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

function TodoItem({ item, updateTodo }) {
  const dispatch = useDispatch();

  const deleteTask = () => {
    dispatch(deleteTodo(item.id));
    toast.success("Task Deleted Successfully");
  };
  return (
    <ItemDiv>
      <div>
        <div className="item_box">
          <h3 className="task_title"> {item.task} </h3>
          <div className="flex_btns">
            <BiEdit className="flex_icon" onClick={updateTodo} />
            <BsTrash className="flex_icon" onClick={deleteTask} />
          </div>
        </div>
      </div>
    </ItemDiv>
  );
}

export default TodoItem;
