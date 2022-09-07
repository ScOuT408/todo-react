import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = () => {
  let localStorageItem = window.localStorage.getItem("taskInfo");
  if (localStorageItem) {
    return JSON.parse(localStorageItem);
  }
  window.localStorage.setItem("taskInfo", []);
  return [];
};

const initialValue = {
  tasks: getLocalStorage(),
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push(action.payload);
      const todoList = window.localStorage.getItem("taskInfo");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem("taskInfo", JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          "taskInfo",
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    deleteTodo: (state, action) => {
      const localItem = window.localStorage.getItem("taskInfo");
      if (localItem) {
        const todoArr = JSON.parse(localItem);
        todoArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("taskInfo", JSON.stringify(todoArr));
        state.tasks = todoArr;
      }
    },
    updateTask: (state, action) => {
      const localItem = window.localStorage.getItem("taskInfo");
      if (localItem) {
        const taskArr = JSON.parse(localItem);
        taskArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.task = action.payload.task;
          }
        });
        window.localStorage.setItem("taskInfo", JSON.stringify(taskArr));
        state.tasks = [...taskArr];
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTask } = todoSlice.actions;
export default todoSlice.reducer;
