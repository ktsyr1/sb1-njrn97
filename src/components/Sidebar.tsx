import React from 'react';
import { BarChart2, Calendar, CheckCircle2, Clock, Folder, Home, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-l border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <CheckCircle2 className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">تاسك ماستر</h2>
      </div>

      <nav>
        <ul className="space-y-2">
          {[
            { icon: Home, label: 'الرئيسية' },
            { icon: Calendar, label: 'التقويم' },
            { icon: Folder, label: 'المشاريع' },
            { icon: Clock, label: 'المهام المؤجلة' },
            { icon: BarChart2, label: 'التقارير' },
            { icon: Settings, label: 'الإعدادات' },
          ].map(({ icon: Icon, label }) => (
            <li key={label}>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}