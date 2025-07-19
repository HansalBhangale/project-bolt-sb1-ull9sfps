import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Code, Database, Brain, BarChart3, Settings, Zap, Globe, Cpu } from 'lucide-react';

const iconMap: Record<string, JSX.Element> = {
  User: <User className="h-8 w-8" />,
  Code: <Code className="h-8 w-8" />,
  Database: <Database className="h-8 w-8" />,
  Brain: <Brain className="h-8 w-8" />,
  BarChart3: <BarChart3 className="h-8 w-8" />,
  Settings: <Settings className="h-8 w-8" />,
  Zap: <Zap className="h-8 w-8" />,
  Globe: <Globe className="h-8 w-8" />,
  Cpu: <Cpu className="h-8 w-8" />,
};

const About = () => {
  const [aboutData, setAboutData] = useState({
    title: 'About Me',
    content: ''
  });

  const [keyMetrics, setKeyMetrics] = useState([
    { icon: 'User', value: '5+', label: 'Years Experience' },
    { icon: 'Code', value: '50+', label: 'Projects Completed' },
    { icon: 'Database', value: '1M+', label: 'Data Points Processed' },
    { icon: 'Brain', value: '15+', label: 'AI Models Deployed' },
  ]);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/about');
        if (response.ok) {
          const data = await response.json();
          setAboutData(data);
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    const fetchKeyMetrics = async () => {
      try {
        const res = await fetch('/api/key-metrics');
        if (res.ok) {
          const data = await res.json();
          setKeyMetrics(data);
        }
      } catch {}
    };
    fetchKeyMetrics();
  }, []);

  return (
    <div id="about-section" className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {aboutData.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-morphism p-8 rounded-2xl">
              <div className="prose prose-lg text-gray-300 max-w-none">
                {aboutData.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-morphism p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-6">
                {keyMetrics.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-blue-400 flex justify-center mb-2">
                      {iconMap[stat.icon] || <User className="h-8 w-8" />}
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-morphism p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Core Values</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Innovation through continuous learning and adaptation</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Ethical AI development and responsible data usage</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Collaborative problem-solving and knowledge sharing</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;