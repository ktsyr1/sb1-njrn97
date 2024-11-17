import React from 'react';
import { AlertCircle, CheckCircle2, Clock, MoveRight, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskList({ tasks, setTasks }: TaskListProps) {
  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">لا توجد مهام حالياً</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <div
          key={task.id}
          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div className={`w-2 h-2 rounded-full ${
            task.priority === 'urgent' ? 'bg-red-500' :
            task.priority === 'normal' ? 'bg-yellow-500' :
            'bg-green-500'
          }`} />
          
          <p className="flex-1 text-gray-900">{task.title}</p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateTaskStatus(task.id, 'postponed')}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="تأجيل"
            >
              <Clock className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => updateTaskStatus(task.id, 'completed')}
              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="إتمام"
            >
              <CheckCircle2 className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => updateTaskStatus(task.id, 'problematic')}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="مشكلة"
            >
              <AlertCircle className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => deleteTask(task.id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="حذف"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}