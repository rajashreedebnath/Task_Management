import React from "react";

function TaskList({ tasks, handleDelete }) {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-600">Effort: {task.effort} day(s)</p>
          <p className="text-sm text-gray-600">Due: {task.due_date}</p>
          <button
            onClick={() => handleDelete(task.id)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
