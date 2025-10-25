import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Cloud, Server, Code2 } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Projects() {
  useDocumentTitle('Projects — Mohammed Matheen');
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const projects = [
    {
      title: 'Cloud Infrastructure Platform',
      description: 'Automated cloud infrastructure deployment using Terraform and AWS',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      technologies: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
      github: 'https://github.com',
      demo: 'https://example.com',
      icon: <Cloud className="w-8 h-8" />,
    },
    {
      title: 'DevOps Pipeline',
      description: 'CI/CD pipeline implementation with Jenkins and Docker',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80',
      technologies: ['Jenkins', 'Docker', 'GitLab', 'Ansible'],
      github: 'https://github.com',
      demo: 'https://example.com',
      icon: <Server className="w-8 h-8" />,
    },
    {
      title: 'Microservices Architecture',
      description: 'Scalable microservices deployment on Kubernetes',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      technologies: ['Kubernetes', 'Istio', 'Prometheus', 'Grafana'],
      github: 'https://github.com',
      demo: 'https://example.com',
      icon: <Code2 className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-gray-900 to-background-dark py-16 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        <motion.h1 
          variants={projectVariants}
          className="text-4xl font-bold mb-8 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={projectVariants}
              whileHover="hover"
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gradient-start transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90 z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-gradient-start to-gradient-end p-2 rounded-lg text-black z-20">
                  {project.icon}
                </div>
              </div>
              
              <div className="p-6 relative">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gradient-start transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-full text-sm border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Github size={20} />
                    <span>Code</span>
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink size={20} />
                    <span>Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
