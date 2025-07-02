import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  stats?: { label: string; value: string }[];
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  stats = [], 
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">
        {description}
      </p>
      
      {stats.length > 0 && (
        <div className="flex justify-between text-sm">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleCard;