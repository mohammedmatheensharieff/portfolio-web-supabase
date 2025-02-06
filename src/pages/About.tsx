import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Server, Code2, Database, Globe, Shield, Download, BriefcaseIcon, CheckCircle, Clock, Users, Laptop } from 'lucide-react';

export default function About() {
  const skills = [
    { name: 'Cloud Architecture', icon: <Cloud size={24} />, description: 'AWS, Azure, GCP' },
    { name: 'DevOps', icon: <Server size={24} />, description: 'Jenkins, Docker, Kubernetes' },
    { name: 'Infrastructure as Code', icon: <Code2 size={24} />, description: 'Terraform, CloudFormation' },
    { name: 'Database Management', icon: <Database size={24} />, description: 'MongoDB, PostgreSQL' },
    { name: 'Network Architecture', icon: <Globe size={24} />, description: 'VPC, Security Groups' },
    { name: 'Security', icon: <Shield size={24} />, description: 'IAM, Security Best Practices' },
  ];

  const services = [
    {
      title: 'Cloud Consulting',
      description: 'Expert guidance on cloud migration and optimization strategies',
      icon: <Cloud size={24} />,
      features: ['Architecture Design', 'Cost Optimization', 'Performance Tuning']
    },
    {
      title: 'DevOps Implementation',
      description: 'End-to-end DevOps pipeline setup and automation',
      icon: <Server size={24} />,
      features: ['CI/CD Setup', 'Infrastructure as Code', 'Monitoring']
    },
    {
      title: 'Security Assessment',
      description: 'Comprehensive security audits and implementation',
      icon: <Shield size={24} />,
      features: ['Security Audits', 'Compliance', 'Best Practices']
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
          About Me
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg text-gray-300 mb-4">
              As a Cloud Architect and DevOps Lead with over 5 years of experience, I specialize in designing and implementing scalable cloud solutions that drive business transformation.
            </p>
            <p className="text-lg text-gray-300">
              My expertise spans across multiple cloud platforms and DevOps tools, enabling me to create robust, automated, and secure infrastructure solutions that meet modern business demands.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6"
            >
              <a
                href="/Mohammed_Matheen_Resume.pdf"
                download
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gradient-start to-gradient-end text-black px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                <Download size={20} />
                Download Resume
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-gradient-start to-gradient-end opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
                alt="Profile"
                className="rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </div>

        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
          Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-lg bg-gray-900 shadow-lg border border-gray-800 hover:border-gradient-start transition-all duration-300"
            >
              <div className="text-gradient-start mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-200">{skill.name}</h3>
              <p className="text-gray-400">{skill.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Hire Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            Hire Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="text-gradient-start" size={24} />
                <span className="text-gray-300">Available for full-time opportunities</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="text-gradient-start" size={24} />
                <span className="text-gray-300">Open to team leadership roles</span>
              </div>
              <div className="flex items-center gap-3">
                <Laptop className="text-gradient-start" size={24} />
                <span className="text-gray-300">Remote work preferred</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gradient-start to-gradient-end text-black px-8 py-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                <BriefcaseIcon size={20} />
                Let's Work Together
              </motion.a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gradient-start transition-all duration-300"
              >
                <div className="text-gradient-start mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle size={16} className="text-gradient-start" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}