import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Cloud, Server, Code2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const socialVariants = {
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: { scale: 0.95 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
    hover: {
      y: -15,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center bg-gradient-to-br from-background-dark via-gray-900 to-background-dark overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center relative z-10"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent animate-gradient-x"
        >
          Mohammed Matheen
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 mb-4"
        >
          Cloud Architect & DevOps Lead
        </motion.p>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto px-4"
        >
          Transforming businesses through innovative cloud solutions and DevOps practices. 
          Specializing in scalable architectures, automation, and secure infrastructure design.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex gap-6 justify-center mb-12"
        >
          {[
            { icon: <Github size={24} />, href: "https://github.com" },
            { icon: <Linkedin size={24} />, href: "https://linkedin.com" },
            { icon: <Mail size={24} />, href: "mailto:contact@example.com" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={socialVariants}
              whileHover="hover"
              whileTap="tap"
              className="p-3 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end text-black hover:shadow-xl transition-shadow duration-300"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="w-full max-w-4xl p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Cloud size={40} />,
              title: "Cloud Architecture",
              description: "Designing scalable and resilient cloud infrastructure solutions"
            },
            {
              icon: <Server size={40} />,
              title: "DevOps",
              description: "Implementing efficient CI/CD pipelines and automation"
            },
            {
              icon: <Code2 size={40} />,
              title: "Infrastructure",
              description: "Building secure and automated infrastructure as code"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-white transition-all duration-300 transform-gpu"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="text-gradient-start mb-4"
              >
                {card.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 bg-gradient-start opacity-5 rounded-full blur-3xl"
            animate={{
              x: [Math.random() * 100, Math.random() * -100],
              y: [Math.random() * 100, Math.random() * -100],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}