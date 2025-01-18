import React, { useState, useEffect } from 'react';
import axiosInstance from '../../common/axiosInstance.js';

const TaskModal = ({ show, onClose, projects, task, refreshTasks }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    progress: 0,
    dueDate: '',
    projectId: '',
    priority: 5,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (task) {
      setTaskData({
        title: task.title,
        description: task.description,
        progress: task.progress,
        dueDate: task.dueDate.split('T')[0],
        projectId: task.project.id,
        priority: task.priority,
      });
    } else {
      setTaskData({
        title: '',
        description: '',
        progress: 0,
        dueDate: '',
        projectId: '',
        priority: 5,
      });
    }
  }, [task]);

  useEffect(() => {
    const { title, description, progress, dueDate, projectId } = taskData;
    if (title && description && progress <= 100 && dueDate && projectId) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [taskData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const url = task
        ? `https://work-hive.liara.run/api/tasks/${task.id}`
        : `https://work-hive.liara.run/api/tasks`;

      const method = task ? 'put' : 'post';

      await axiosInstance[method](url, taskData);

      alert(task ? 'Task updated successfully!' : 'Task created successfully!');
      refreshTasks();
      onClose();
    } catch (error) {
      console.error('Error submitting task:', error.response?.data || error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`https://work-hive.liara.run/api/tasks/${task.id}`);
      alert('Task deleted successfully!');
      refreshTasks();
      onClose();
    } catch (error) {
      console.error('Error deleting task:', error.response?.data || error.message);
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-lg rounded-lg z-50 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4">{task ? 'Update Task' : 'Create New Task'}</h3>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Task title"
        />
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Task description"
        />
        <input
          type="number"
          name="progress"
          value={taskData.progress}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Progress (0 - 100)"
          min="0"
          max="100"
        />
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <select
          name="projectId"
          value={taskData.projectId}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="priority"
          value={taskData.priority}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Priority (1-10)"
        />

        <div className="flex justify-between mt-4">
          {task && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`px-4 py-2 ${
              isFormValid ? 'bg-green-500' : 'bg-gray-300'
            } text-white rounded-lg`}
          >
            {task ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
