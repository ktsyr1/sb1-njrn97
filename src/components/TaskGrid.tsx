import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Clock, Flame, HourglassIcon, Snowflake, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskGridProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskGrid({ tasks, setTasks }: TaskGridProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = (taskId: string) => {
    if (editTitle.trim()) {
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, title: editTitle } : task
      ));
    }
    setEditingId(null);
  };

  const getStateIcon = (state: Task['state']) => {
    switch (state) {
      case 'urgent':
        return <Flame className="h-5 w-5 text-red-500" title="مستعجل" />;
      case 'time-sensitive':
        return <Clock className="h-5 w-5 text-yellow-500" title="مع مرور الوقت" />;
      case 'cold':
        return <Snowflake className="h-5 w-5 text-blue-500" title="باردة" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-50';
      case 'normal':
        return 'bg-yellow-50';
      case 'low':
        return 'bg-green-50';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <p className="text-gray-500">لا توجد مهام حالياً</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <div
          key={task.id}
          className={`rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group ${getPriorityColor(task.priority)}`}
        >
          <div className="flex items-center gap-3 mb-4">
            {getStateIcon(task.state)}
            {editingId === task.id ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => saveEdit(task.id)}
                onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                autoFocus
              />
            ) : (
              <h3
                onClick={() => startEditing(task)}
                className={`text-lg flex-1 cursor-pointer ${
                  task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'
                }`}
              >
                {task.title}
              </h3>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => updateTaskStatus(task.id, 'postponed')}
              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="تأجيل"
            >
              <Clock className="h-4 w-4" />
            </button>
            <button
              onClick={() => updateTaskStatus(task.id, 'completed')}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="إتمام"
            >
              <CheckCircle2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => updateTaskStatus(task.id, 'problematic')}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="مشكلة"
            >
              <AlertCircle className="h-4 w-4" />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="حذف"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}