import Todo from "./components/Todo";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Todo />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1.7rem",
          },
        }}
      />
    </>
  );
}

export default App;
