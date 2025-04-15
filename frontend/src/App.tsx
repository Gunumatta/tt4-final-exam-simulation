import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Task } from './types/Task';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Partial<Task>>({ title: '', description: '', completed: false });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = async () => {
    try {
      await axios.post(API_URL, newTask);
      setNewTask({ title: '', description: '', completed: false });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      await axios.put(`${API_URL}/${task.id}`, task);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Task Manager</h1>
      
      {/* Create Task Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Create New Task</h5>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </div>
          <button className="btn btn-primary" onClick={handleCreateTask}>
            Create Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Tasks</h5>
          <div className="list-group">
            {tasks.map((task) => (
              <div key={task.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">{task.title}</h6>
                    <p className="mb-1">{task.description}</p>
                  </div>
                  <div>
                    <div className="form-check form-switch mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleUpdateTask({ ...task, completed: !task.completed })}
                      />
                      <label className="form-check-label">Completed</label>
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 