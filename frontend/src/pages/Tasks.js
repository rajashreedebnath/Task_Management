import React, { useState, useEffect } from 'react';
import { apiTasks } from '../api';
import { useNavigate } from 'react-router-dom';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', effort: 1, due_date: '' });
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await apiTasks.get('/tasks/');
      setTasks(res.data);
    } catch {
      alert('Token expired. Please login again.');
      localStorage.clear();
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiTasks.post('/tasks/', form);
    setForm({ title: '', description: '', effort: 1, due_date: '' });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await apiTasks.delete(`/tasks/${id}/`);
    fetchTasks();
  };

  // const handleExport = () => {
  //   const token = localStorage.getItem("token");
  //   window.open(`http://localhost:8000/api/tasks/export/?token=${token}`, "_blank");
  // };

  const handleExport = async () => {
  try {
    const res = await apiTasks.get('/tasks/export/', {
      responseType: 'blob', // required for file download
    });
    const blob = new Blob([res.data], { type: res.headers['content-type'] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert('Export failed');
  }
};


  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Tasks</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Task</button>
      </form>

      <div className="mb-4">
        <button onClick={handleExport} className="bg-green-500 text-white px-4 py-2 rounded">
          Export to Excel
        </button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-600">Effort: {task.effort} day(s)</p>
            <p className="text-sm text-gray-600">Due: {task.due_date}</p>
            <button onClick={() => handleDelete(task.id)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
