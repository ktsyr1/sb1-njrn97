import React from 'react';
import { Filter, Flame, Clock as ClockIcon, Snowflake, AlertCircle, CheckCircle2, HourglassIcon } from 'lucide-react';
import { TaskState, TaskStatus } from '../types';

interface TaskFiltersProps {
  selectedState: TaskState | 'all';
  selectedStatus: TaskStatus | 'all';
  onStateChange: (state: TaskState | 'all') => void;
  onStatusChange: (status: TaskStatus | 'all') => void;
}

export default function TaskFilters({ 
  selectedState, 
  selectedStatus, 
  onStateChange, 
  onStatusChange 
}: TaskFiltersProps) {
  const showPriorityFilter = selectedStatus === 'all' || selectedStatus === 'pending';

  const statusIcons = [
    { value: 'all', icon: Filter, label: 'الكل' },
    { value: 'pending', icon: HourglassIcon, label: 'قيد التنفيذ' },
    { value: 'completed', icon: CheckCircle2, label: 'مكتملة' },
    { value: 'postponed', icon: ClockIcon, label: 'مؤجلة' },
    { value: 'problematic', icon: AlertCircle, label: 'مشكلة' },
  ];

  const stateIcons = [
    { value: 'all', icon: Filter, label: 'الكل' },
    { value: 'urgent', icon: Flame, label: 'مستعجل' },
    { value: 'time-sensitive', icon: ClockIcon, label: 'مع مرور الوقت' },
    { value: 'cold', icon: Snowflake, label: 'باردة' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex gap-2">
          {statusIcons.map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              title={label}
              onClick={() => onStatusChange(value as TaskStatus | 'all')}
              className={`p-2 rounded-lg transition-colors ${
                selectedStatus === value
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>

        {showPriorityFilter && (
          <div className="flex gap-2">
            {stateIcons.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                title={label}
                onClick={() => onStateChange(value as TaskState | 'all')}
                className={`p-2 rounded-lg transition-colors ${
                  selectedState === value
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}