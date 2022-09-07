import React, { useState } from "react";
import styled from "styled-components";
import { BiTask } from "react-icons/bi";
import { v4 as uuid } from "uuid";
import { FiPlusSquare } from "react-icons/fi";
import TodoItem from "./TodoItem";
import { useDispatch } from "react-redux";
import { addTodo, updateTask } from "../features/todoSlice";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";

const TodoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 2rem;

  .todo_box {
    max-width: 55rem;
    padding: 1.8rem;
    background-color: #fefef4;
    box-shadow: 0 0.4rem 0.5rem rgba(0, 0, 0, 0.2);
    width: 100%;

    .heading {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0.5rem;
      margin-bottom: 1.5rem;

      .icon_box {
        height: 5rem;
        width: 5rem;

        .icon {
          width: 100%;
          height: 100%;
          color: #8388f3;
        }
      }
      h2 {
        font-size: 2.6rem;
        font-weight: 550;
        color: #444;
        text-transform: uppercase;
      }
    }

    .form_box {
      display: flex;
      align-items: center;
      text-align: center;
      gap: 3rem;

      form {
        width: 85%;

        input {
          width: 100%;
          padding: 1.2rem 1rem;
          font-size: 1.7rem;
          color: #444;
          outline: none;
          border: 0.2rem solid #bdbdbd;
        }
      }

      .plus {
        height: 3rem;
        width: 3rem;
        padding: 0.78rem 1rem;
        background-color: #8388f3;
        box-shadow: 0 0.4rem 0.5rem rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;

        .plus_icon {
          width: 100%;
          height: 100%;
          color: #eee;
          cursor: pointer;
        }
      }
    }
  }
  .no_todos {
    font-size: 2rem;
    font-weight: 500;
    margin-top: 1.5rem;
  }
`;

function Todo() {
  const taskList = useSelector((state) => state.task.tasks);
  const [task, setTask] = useState("");
  const [isUpdating, setUpdating] = useState("");
  const dispatch = useDispatch();

  function taskHandler(e) {
    e.preventDefault();

    if (!task) {
      alert("Add Task First !!");
    } else {
      if (isUpdating === "") {
        dispatch(
          addTodo({
            id: uuid(),
            task,
            time: new Date().toLocaleString(),
          })
        );
        setTask("");
        toast.success("Task added successfully");
      } else {
        dispatch(updateTask({ isUpdating, task }));
      }
    }
  }

  const updateTodo = (id, task) => {
    setUpdating(id);
    setTask(task);
  };

  return (
    <TodoDiv>
      <div className="todo_box">
        <div className="heading">
          <div className="icon_box">
            <BiTask className="icon" />
          </div>
          <h2> todo app </h2>
        </div>
        <div className="form_box">
          <form>
            <input
              type="text"
              placeholder="Enter task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </form>
          <div className="plus">
            {isUpdating ? (
              <BiEdit className="plus_icon" onClick={taskHandler} />
            ) : (
              <FiPlusSquare className="plus_icon" onClick={taskHandler} />
            )}
          </div>
        </div>
        {taskList.length > 0 ? (
          taskList.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              updateTodo={() => updateTodo(item.id, item.task)}
            />
          ))
        ) : (
          <h2 className="no_todos"> No Tasks Added Yet </h2>
        )}
      </div>
    </TodoDiv>
  );
}

export default Todo;
