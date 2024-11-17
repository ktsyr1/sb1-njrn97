import React, { useState } from 'react';
import { Plus, Flame, Clock as ClockIcon, Snowflake, AlertCircle, CheckCircle2, HourglassIcon } from 'lucide-react';
import { Task, TaskPriority, TaskState } from '../types';

interface TaskInputProps {
  onAdd: (task: Task) => void;
}

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('normal');
  const [state, setState] = useState<TaskState>('time-sensitive');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      id: Date.now().toString(),
      title,
      priority,
      state,
      status: 'pending',
      createdAt: new Date().toISOString(),
      children: [],
    });
    setTitle('');
  };

  const priorityIcons = {
    urgent: { icon: AlertCircle, label: 'عاجل', color: 'text-red-500' },
    normal: { icon: HourglassIcon, label: 'موجلة', color: 'text-yellow-500' },
    low: { icon: CheckCircle2, label: 'مسودة', color: 'text-green-500' },
  };

  const stateIcons = [
    { value: 'urgent', icon: Flame, label: 'مستعجل', color: 'text-red-500' },
    { value: 'time-sensitive', icon: ClockIcon, label: 'مع الوقت', color: 'text-yellow-500' },
    { value: 'cold', icon: Snowflake, label: 'باردة', color: 'text-blue-500' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="أدخل عنوان المهمة الجديدة..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            إضافة
          </button>
        </div>

        <div className="flex gap-6">
          {/* <div className="flex gap-2">
            {Object.entries(priorityIcons).map(([value, { icon: Icon, label, color }]) => (
              <button
                key={value}
                type="button"
                title={label}
                onClick={() => setPriority(value as TaskPriority)}
                className={`p-2 rounded-lg transition-colors ${
                  priority === value
                    ? `${color} bg-gray-100`
                    : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div> */}

          <div className="flex gap-2">
            {stateIcons.map(({ value, icon: Icon, label, color }) => (
              <button
                key={value}
                type="button"
                title={label}
                onClick={() => setState(value as TaskState)}
                className={`p-2 rounded-lg transition-colors ${
                  state === value
                    ? `${color} bg-gray-100`
                    : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}