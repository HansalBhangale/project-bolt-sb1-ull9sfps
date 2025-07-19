import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, GraduationCap, ExternalLink } from 'lucide-react';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  const [selectedType, setSelectedType] = useState('all');

  // Dynamically compute types from achievements
  const typeSet = new Set(achievements.map(a => a.type).filter(Boolean));
  const dynamicTypes = [
    { value: 'all', label: 'All' },
    ...Array.from(typeSet).map(type => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1) + (type === 'certification' ? 's' : '')
    }))
  ];

  const filteredAchievements = selectedType === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.type === selectedType);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('/api/achievements');
        if (response.ok) {
          const data = await response.json();
          setAchievements(data);
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };

    fetchAchievements();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'award':
        return 'from-yellow-400 to-orange-500';
      case 'certification':
        return 'from-blue-400 to-purple-500';
      case 'education':
        return 'from-green-400 to-blue-500';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'award':
        return <Trophy className="h-6 w-6" />;
      case 'certification':
        return <Award className="h-6 w-6" />;
      case 'education':
        return <GraduationCap className="h-6 w-6" />;
      default:
        return <Award className="h-6 w-6" />;
    }
  };

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
            Achievements & Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Recognition and credentials that validate my expertise in data science and AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {dynamicTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedType === type.value
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'glass-morphism text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {type.label}
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass-morphism p-6 rounded-2xl hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full bg-gradient-to-r ${getTypeColor(achievement.type)}`}>
                  <div className="text-white">
                    {getTypeIcon(achievement.type)}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {achievement.title}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {achievement.date}
                    </span>
                  </div>
                  
                  <p className="text-blue-400 font-medium mb-3">
                    {achievement.organization}
                  </p>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {achievement.description}
                  </p>
                  
                  {achievement.url && (
                    <a
                      href={achievement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View Certificate</span>
                    </a>
                  )}
                </div>
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
            Continuous Learning
          </h3>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            I believe in lifelong learning and continuously update my skills to stay current
            with the latest developments in AI and data science. My certifications and
            achievements reflect my commitment to excellence and professional growth.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Achievements;