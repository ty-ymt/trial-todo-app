import { TodoApp } from "./components/TodoApp";

function App() {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="w-full max-w-xl pt-10">
        <TodoApp />
      </div>
    </div>
  );
}

export default App;