import React, { useState, useEffect } from 'react';
import { Task, TaskState, TaskStatus } from './types';
import TaskInput from './components/TaskInput';
import TaskGrid from './components/TaskGrid';
import TaskFilters from './components/TaskFilters';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [selectedState, setSelectedState] = useState<TaskState | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const filteredTasks = tasks.filter(task => {
    const stateMatch = selectedState === 'all' || task.state === selectedState;
    const statusMatch = selectedStatus === 'all' || task.status === selectedStatus;
    return stateMatch && statusMatch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { urgent: 0, normal: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority] || 
           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة المهام</h1>
          <p className="text-gray-600">نظّم مهامك بكفاءة وفعالية</p>
        </header>

        <div className="space-y-6">
          <TaskInput onAdd={addTask} />
          <TaskFilters
            selectedState={selectedState}
            selectedStatus={selectedStatus}
            onStateChange={setSelectedState}
            onStatusChange={setSelectedStatus}
          />
          <TaskGrid 
            tasks={sortedTasks} 
            setTasks={setTasks}
          />
        </div>
      </div>
    </div>
  );
}

export default App;