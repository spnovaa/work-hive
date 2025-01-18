import React, { useState, useEffect } from 'react';
import axiosInstance from '../../common/axiosInstance.js';

const TaskModal = ({ show, onClose, projects }) => {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        progress: 0,
        dueDate: '',
        projectId: '',
        priority: 5
    });
    
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const { title, description, progress, dueDate, projectId } = taskData;
        if (title && description  && progress <= 100 && dueDate && projectId) {
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
            const response = await axiosInstance.post('https://work-hive.liara.run/api/tasks', {
                title: taskData.title,
                description: taskData.description,
                progress: taskData.progress,
                dueDate: taskData.dueDate,
                priority: taskData.priority,
                projectId: taskData.projectId,
            });
            console.log('Task created:', response.data);
            onClose(); 
        } catch (error) {
            console.error('Error creating task:', error.response?.data || error.message);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    if (!show) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={handleCancel} 
            ></div>
            
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-lg rounded-lg z-50 w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
                
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={taskData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Task title"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={taskData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Task description"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="progress" className="block text-sm font-medium text-gray-700">Progress</label>
                    <input
                        type="number"
                        id="progress"
                        name="progress"
                        value={taskData.progress}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Progress (0 - 100)"
                        min="0"
                        max="100"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={taskData.dueDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">Select Project</label>
                    <select
                        id="projectId"
                        name="projectId"
                        value={taskData.projectId}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select a project</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-start space-x-4 mt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className={`px-4 py-2 rounded-md ${isFormValid ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                        Create
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-md bg-gray-300 text-black"
                    >
                        Discard
                    </button>
                </div>
            </div>
        </>
    );
};
const TaskPage = () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
  
    useEffect(() => {
      const fetchProjectsAndTasks = async () => {
        try {
          // Fetch all projects
          const projectResponse = await axiosInstance.get('https://work-hive.liara.run/api/projects');
          const projectsData = projectResponse.data.projects;
          setProjects(projectsData);
  
          // Fetch tasks for each project
          const allTasks = [];
          for (const project of projectsData) {
            const taskResponse = await axiosInstance.get('https://work-hive.liara.run/api/tasks', {
              params: { projectId: project.id },
            });
            allTasks.push(...taskResponse.data.tasks);
          }
  
          setTasks(allTasks); // Set all tasks in state
        } catch (error) {
          console.error('Error fetching projects or tasks:', error);
        }
      };
  
      fetchProjectsAndTasks();
    }, []);
  
    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };
  
    return (
      <div className="container mx-auto p-6">
        {/* New Task Button */}
        <button
          onClick={handleOpenModal}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 mb-6"
        >
          New Task
        </button>
  
        {/* Task List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white"
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
  
        {/* Task Modal */}
        <TaskModal show={modalOpen} onClose={handleCloseModal} projects={projects} />
      </div>
    );
  };
export default TaskPage;
