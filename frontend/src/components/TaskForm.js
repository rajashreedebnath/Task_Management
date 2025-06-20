import React from "react";

function TaskForm({ form, setForm, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">Create New Task</h2>

      <input
        className="w-full mb-2 px-3 py-2 border rounded"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        className="w-full mb-2 px-3 py-2 border rounded"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="w-full mb-2 px-3 py-2 border rounded"
        type="number"
        placeholder="Effort (in days)"
        value={form.effort}
        onChange={(e) => setForm({ ...form, effort: e.target.value })}
      />

      <input
        className="w-full mb-2 px-3 py-2 border rounded"
        type="date"
        value={form.due_date}
        onChange={(e) => setForm({ ...form, due_date: e.target.value })}
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
