import React, { useState, useEffect } from 'react';
import axiosInstance from '../../common/axiosInstance.js';
import TaskModal from './taskModal.jsx';

const TaskPage = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); 

  useEffect(() => {
    const fetchProjectsAndTasks = async () => {
      try {
        const projectResponse = await axiosInstance.get('https://work-hive.liara.run/api/projects');
        const projectsData = projectResponse.data.projects;
        setProjects(projectsData);

        const allTasks = [];
        for (const project of projectsData) {
          const taskResponse = await axiosInstance.get('https://work-hive.liara.run/api/tasks', {
            params: { projectId: project.id },
          });
          allTasks.push(...taskResponse.data.tasks);
        }

        setTasks(allTasks);
      } catch (error) {
        console.error('Error fetching projects or tasks:', error);
      }
    };

    fetchProjectsAndTasks();
  }, []);

  const handleOpenModal = (task = null) => {
    setSelectedTask(task); 
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => handleOpenModal()}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 mb-6"
      >
        New Task
      </button>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white cursor-pointer"
            onClick={() => handleOpenModal(task)}
          >
            <div>
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p className="text-sm text-gray-500">{task.description}</p>
              <p className="text-sm">
                <span className="font-semibold">Progress:</span> {task.progress}%
              </p>
              <p className="text-sm">
                <span className="font-semibold">Due Date:</span>{" "}
                {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Priority:</span> {task.priority}
              </p>
            </div>
            <div className="flex items-center">
              <img
                src={task.project.img}
                alt={task.project.name}
                className="w-16 h-16 rounded-md mr-4"
              />
              <div>
                <p className="text-sm font-semibold">{task.project.name}</p>
                <p className="text-sm text-gray-500">
                  Team: {task.project.team.team_name}
                </p>
                <p className="text-sm text-gray-500">
                  Lead: {task.project.team.team_lead}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>


      <TaskModal
        show={modalOpen}
        onClose={handleCloseModal}
        projects={projects}
        task={selectedTask}
        refreshTasks={() => window.location.reload()} 
      />
    </div>
  );
};

export default TaskPage;
