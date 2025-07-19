import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Brain, BarChart3, Settings, Zap, Globe, Cpu } from 'lucide-react';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills');
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Code': <Code className="h-8 w-8" />,
      'Database': <Database className="h-8 w-8" />,
      'Brain': <Brain className="h-8 w-8" />,
      'BarChart3': <BarChart3 className="h-8 w-8" />,
      'Settings': <Settings className="h-8 w-8" />,
      'Zap': <Zap className="h-8 w-8" />,
      'Globe': <Globe className="h-8 w-8" />,
      'Cpu': <Cpu className="h-8 w-8" />
    };
    return icons[iconName] || <Code className="h-8 w-8" />;
  };

  const SkillBar = ({ skill, delay }: { skill: { name: string; level: number }, delay: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 font-medium">{skill.name}</span>
        <span className="text-blue-400 font-bold">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1.5, delay: delay + 0.5 }}
          className="skill-bar h-2 rounded-full"
        />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across various domains
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              className="glass-morphism p-8 rounded-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="text-blue-400 mr-3">
                  {getIconComponent(category.icon)}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {category.category}
                </h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    delay={categoryIndex * 0.1 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 glass-morphism p-8 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Always Learning
          </h3>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            The field of AI and machine learning is constantly evolving. I'm committed to
            staying at the forefront of technological advances through continuous learning,
            research, and hands-on experimentation with emerging technologies.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;