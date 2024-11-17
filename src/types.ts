export type TaskPriority = 'urgent' | 'normal' | 'low';
export type TaskStatus = 'pending' | 'completed' | 'postponed' | 'problematic';
export type TaskState = 'cold' | 'time-sensitive' | 'urgent';

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  state: TaskState;
  createdAt: string;
  children?: Task[];
}