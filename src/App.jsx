import { useState } from "react";

function App() {
  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      items: [
        { id: "1", content: "Market Research" },
        { id: "2", content: "Write Projects" },
      ],
    },
    inProgress: {
      name: "In Progress",
      items: [{ id: "3", content: "Design UI mockups" }],
    },
    done: {
      name: "Done",
      items: [{ id: "5", content: "Set up Repository" }],
    },
  });

  const [newTask, setNewTask] = useState("");
  const [activeColumns, setactiveColumns] = useState("todo");
  const [dragedItems, setDraggedItems] = useState(null);
  const addNewTask = () => {
    if (newTask.trim() === "") return;
    const updatedColumns = { ...columns };
    updatedColumns[activeColumns].items.push({
      id: Date.now().toString(),
      content: newTask,
    });
    setColumns(updatedColumns);
    setNewTask("");
  };
  const removeTask = (columnId, taskId) => {
    const updatedColumns = { ...columns };
    updatedColumns[columnId].items = updatedColumns[columnId].items.filter(
      (item) => item.id !== taskId
    );
    setColumns(updatedColumns);
  };
  const handleDragStart = (columnId, item) => {
    setDraggedItems({ columnId, item });
  };
  const handleDragover = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (!dragedItems) return;

    const { columnId: sourceColumnId, item } = dragedItems;

    if (sourceColumnId === columnId) return;

    const updatedColumns = { ...columns };
    updatedColumns[sourceColumnId].items = updatedColumns[
      sourceColumnId
    ].items.filter((i) => i.id != item.id);

    updatedColumns[columnId].items.push(item);

    setColumns(updatedColumns);
    setDraggedItems(null);
  };
  const columnStyle = {
    todo: {
      header: "bg-gradient-to-r from-red-600 to red-400",
      border: "border-blue-400",
    },
    inProgress: {
      header: "bg-gradient-to-r from-yellow-600 to yellow-400",
      border: "border-yellow-400",
    },
    done: {
      header: "bg-gradient-to-r from-green-600 to green-400",
      border: "border-green-400",
    },
  };
  return (
    <>
      <div className="p-6 w-full min-h-scrren bg-gradient-to-b from-zinc-900 to-zinc -800 flex items-center justify-center">
        <div className="flex items-center justify-center flex-col gap-4 w-full max-w-6xl">
          <h1 className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-blue-500 to-green-400">
            Kanban Board
          </h1>
          <div className="mb-8 flex w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new Task..."
              className="flex-grow p-3 bg-zinc-700 text-white"
              onKeyDown={(e) => e.key === "Enter" && addNewTask()}
            />
            <select
              value={activeColumns}
              onChange={(e) => setactiveColumns(e.target.value)}
              className="p-3 bg-zinc-700 text-white border-0 border-1 border0-zinc-600"
            >
              [
              {Object.keys(columns).map((columnId) => (
                <option value={columnId} key={columnId}>
                  {columns[columnId].name}
                </option>
              ))}
              ]
            </select>
            <button
              onClick={addNewTask}
              className="px-6 bg-gradient-to-r from-red=600 to-amber-500 text-white font-medium hover:from-green-500 hover:to-amber-500 transition-all duration-200 cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
