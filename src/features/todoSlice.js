import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = () => {
  let localStorageItem = window.localStorage.getItem("taksInfo");
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
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
