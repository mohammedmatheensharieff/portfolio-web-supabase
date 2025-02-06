import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Activity, Users, Server, Database, Cloud, Settings } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const stats = [
    { name: 'Active Projects', value: '12', icon: <Activity size={24} /> },
    { name: 'Team Members', value: '24', icon: <Users size={24} /> },
    { name: 'Servers', value: '48', icon: <Server size={24} /> },
    { name: 'Databases', value: '16', icon: <Database size={24} /> },
  ];

  const recentActivities = [
    { action: 'Deployed new server', time: '2 hours ago', icon: <Cloud size={20} /> },
    { action: 'Updated database cluster', time: '4 hours ago', icon: <Database size={20} /> },
    { action: 'Added team member', time: '1 day ago', icon: <Users size={20} /> },
    { action: 'Configuration update', time: '2 days ago', icon: <Settings size={20} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.email}</h1>
          <p className="text-gray-400">Here's what's happening with your projects today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-white transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-gradient-start">{stat.icon}</div>
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <h3 className="text-gray-400 text-sm">{stat.name}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900 rounded-lg border border-gray-800 p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 text-gray-400"
                >
                  <div className="text-gradient-start">{activity.icon}</div>
                  <div>
                    <p className="text-white">{activity.action}</p>
                    <p className="text-sm">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900 rounded-lg border border-gray-800 p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">System Status</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">CPU Usage</span>
                  <span className="text-white">65%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-gradient-start to-gradient-end h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Memory Usage</span>
                  <span className="text-white">48%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-gradient-start to-gradient-end h-2 rounded-full" style={{ width: '48%' }}></div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Storage</span>
                  <span className="text-white">82%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-gradient-start to-gradient-end h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}