import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  User, 
  Code, 
  FolderOpen, 
  Award, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Skill {
  _id?: string;
  name: string;
  level: number;
}

interface SkillCategory {
  _id?: string;
  id?: string;
  category: string;
  icon: string;
  skills: Skill[];
  order: number;
}

interface Project {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  github?: string;
  demo?: string;
  featured: boolean;
}

interface Achievement {
  _id?: string;
  id?: string;
  type: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  url?: string;
}

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [modalType, setModalType] = useState('');
  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const [resumeUploading, setResumeUploading] = useState(false);

  const [aboutData, setAboutData] = useState({
    title: 'About Me',
    content: ''
  });

  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [settings, setSettings] = useState({
    githubUrl: '',
    linkedinUrl: '',
    contactEmail: '',
    phoneNumber: '',
    location: ''
  });

  const [keyMetrics, setKeyMetrics] = useState([
    { icon: 'User', value: '5+', label: 'Years Experience' },
    { icon: 'Code', value: '50+', label: 'Projects Completed' },
    { icon: 'Database', value: '1M+', label: 'Data Points Processed' },
    { icon: 'Brain', value: '15+', label: 'AI Models Deployed' },
  ]);
  const [keyMetricsLoading, setKeyMetricsLoading] = useState(false);

  // Form states
  const [skillForm, setSkillForm] = useState<SkillCategory>({
    category: '',
    icon: 'Code',
    skills: [],
    order: 0
  });

  const [projectForm, setProjectForm] = useState<Project>({
    title: '',
    description: '',
    image: '',
    technologies: [],
    category: '',
    github: '',
    demo: '',
    featured: false
  });

  const [achievementForm, setAchievementForm] = useState<Achievement>({
    type: 'award',
    title: '',
    organization: '',
    date: '',
    description: '',
    url: ''
  });

  const tabs = [
    { id: 'about', label: 'About', icon: <User className="h-5 w-5" /> },
    { id: 'skills', label: 'Skills', icon: <Code className="h-5 w-5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen className="h-5 w-5" /> },
    { id: 'achievements', label: 'Achievements', icon: <Award className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const iconOptions = ['User', 'Code', 'Database', 'Brain', 'BarChart3', 'Settings', 'Zap', 'Globe', 'Cpu'];
  const achievementTypes = ['award', 'certification', 'education', 'experience'];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchKeyMetrics = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/key-metrics`);
        if (res.ok) {
          const data = await res.json();
          setKeyMetrics(data);
        }
      } catch {}
    };
    fetchKeyMetrics();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [aboutRes, skillsRes, projectsRes, achievementsRes, settingsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/about`),
        fetch(`${import.meta.env.VITE_API_URL}/api/skills`),
        fetch(`${import.meta.env.VITE_API_URL}/api/projects`),
        fetch(`${import.meta.env.VITE_API_URL}/api/achievements`),
        fetch(`${import.meta.env.VITE_API_URL}/api/settings`)
      ]);

      if (aboutRes.ok) {
        const aboutData = await aboutRes.json();
        setAboutData(aboutData);
      }

      if (skillsRes.ok) {
        const skillsData = await skillsRes.json();
        setSkills(skillsData);
      }

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
      }

      if (achievementsRes.ok) {
        const achievementsData = await achievementsRes.json();
        setAchievements(achievementsData);
      }

      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        setSettings(settingsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const saveAboutData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/about`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(aboutData)
      });

      if (response.ok) {
        toast.success('About section updated successfully');
      } else {
        toast.error('Failed to update about section');
      }
    } catch (error) {
      console.error('Error updating about data:', error);
      toast.error('Failed to update about section');
    }
  };

  const saveSettings = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        toast.success('Settings updated successfully');
      } else {
        toast.error('Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    }
  };

  const saveKeyMetrics = async () => {
    setKeyMetricsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/key-metrics`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(keyMetrics)
      });
      if (res.ok) {
        toast.success('Key metrics updated!');
      } else {
        toast.error('Failed to update key metrics.');
      }
    } catch {
      toast.error('Failed to update key metrics.');
    } finally {
      setKeyMetricsLoading(false);
    }
  };

  // Skills CRUD operations
  const openSkillModal = (skill?: SkillCategory) => {
    if (skill) {
      setSkillForm(skill);
      setEditingItem(skill);
    } else {
      setSkillForm({
        category: '',
        icon: 'Code',
        skills: [],
        order: skills.length
      });
      setEditingItem(null);
    }
    setModalType('skill');
    setShowModal(true);
  };

  const saveSkill = async () => {
    try {
      console.log('Saving skill form:', skillForm);
      
      const url = editingItem ? `${import.meta.env.VITE_API_URL}/api/skills/${editingItem.id}` : `${import.meta.env.VITE_API_URL}/api/skills`;
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(skillForm)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Skill saved successfully:', result);
        toast.success(`Skill category ${editingItem ? 'updated' : 'created'} successfully`);
        fetchData();
        setShowModal(false);
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        toast.error(`Failed to save skill category: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving skill:', error);
      toast.error('Failed to save skill category');
    }
  };

  const deleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill category?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        toast.success('Skill category deleted successfully');
        fetchData();
      } else {
        toast.error('Failed to delete skill category');
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error('Failed to delete skill category');
    }
  };

  // Projects CRUD operations
  const openProjectModal = (project?: Project) => {
    if (project) {
      setProjectForm(project);
      setEditingItem(project);
    } else {
      setProjectForm({
        title: '',
        description: '',
        image: '',
        technologies: [],
        category: '',
        github: '',
        demo: '',
        featured: false
      });
      setEditingItem(null);
    }
    setModalType('project');
    setShowModal(true);
  };

  const saveProject = async () => {
    try {
      const url = editingItem ? `${import.meta.env.VITE_API_URL}/api/projects/${editingItem.id}` : `${import.meta.env.VITE_API_URL}/api/projects`;
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(projectForm)
      });

      if (response.ok) {
        toast.success(`Project ${editingItem ? 'updated' : 'created'} successfully`);
        fetchData();
        setShowModal(false);
      } else {
        toast.error('Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        toast.success('Project deleted successfully');
        fetchData();
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  // Achievements CRUD operations
  const openAchievementModal = (achievement?: Achievement) => {
    if (achievement) {
      setAchievementForm(achievement);
      setEditingItem(achievement);
    } else {
      setAchievementForm({
        type: 'award',
        title: '',
        organization: '',
        date: '',
        description: '',
        url: ''
      });
      setEditingItem(null);
    }
    setModalType('achievement');
    setShowModal(true);
  };

  const saveAchievement = async () => {
    try {
      const url = editingItem ? `${import.meta.env.VITE_API_URL}/api/achievements/${editingItem.id}` : `${import.meta.env.VITE_API_URL}/api/achievements`;
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(achievementForm)
      });

      if (response.ok) {
        toast.success(`Achievement ${editingItem ? 'updated' : 'created'} successfully`);
        fetchData();
        setShowModal(false);
      } else {
        toast.error('Failed to save achievement');
      }
    } catch (error) {
      console.error('Error saving achievement:', error);
      toast.error('Failed to save achievement');
    }
  };

  const deleteAchievement = async (id: string) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/achievements/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        toast.success('Achievement deleted successfully');
        fetchData();
      } else {
        toast.error('Failed to delete achievement');
      }
    } catch (error) {
      console.error('Error deleting achievement:', error);
      toast.error('Failed to delete achievement');
    }
  };

  const addSkillToCategory = () => {
    console.log('Adding skill to category, current skills:', skillForm.skills);
    setSkillForm({
      ...skillForm,
      skills: [...skillForm.skills, { name: '', level: 0 }]
    });
  };

  const updateSkillInCategory = (index: number, field: string, value: any) => {
    const updatedSkills = [...skillForm.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkillForm({ ...skillForm, skills: updatedSkills });
  };

  const removeSkillFromCategory = (index: number) => {
    const updatedSkills = skillForm.skills.filter((_, i) => i !== index);
    setSkillForm({ ...skillForm, skills: updatedSkills });
  };

  const addTechnology = () => {
    setProjectForm({
      ...projectForm,
      technologies: [...projectForm.technologies, '']
    });
  };

  const updateTechnology = (index: number, value: string) => {
    const updatedTech = [...projectForm.technologies];
    updatedTech[index] = value;
    setProjectForm({ ...projectForm, technologies: updatedTech });
  };

  const removeTechnology = (index: number) => {
    const updatedTech = projectForm.technologies.filter((_, i) => i !== index);
    setProjectForm({ ...projectForm, technologies: updatedTech });
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="glass-morphism p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">
              {editingItem ? 'Edit' : 'Add'} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
            </h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {modalType === 'skill' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Programming Languages"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Icon
                </label>
                <select
                  value={skillForm.icon}
                  onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  value={skillForm.order}
                  onChange={(e) => setSkillForm({ ...skillForm, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Skills
                  </label>
                  <button
                    onClick={addSkillToCategory}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Skill</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {skillForm.skills.map((skill, index) => (
                    <div key={index} className="flex space-x-3 items-center">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateSkillInCategory(index, 'name', e.target.value)}
                        placeholder="Skill name"
                        className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        value={skill.level}
                        onChange={(e) => updateSkillInCategory(index, 'level', parseInt(e.target.value))}
                        placeholder="Level (0-100)"
                        min="0"
                        max="100"
                        className="w-24 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeSkillFromCategory(index)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={saveSkill}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
                >
                  <Save className="h-5 w-5" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {modalType === 'project' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Project description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Machine Learning, Web Development"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Technologies
                  </label>
                  <button
                    onClick={addTechnology}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Tech</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {projectForm.technologies.map((tech, index) => (
                    <div key={index} className="flex space-x-3 items-center">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => updateTechnology(index, e.target.value)}
                        placeholder="Technology name"
                        className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeTechnology(index)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.github}
                    onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Demo URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.demo}
                    onChange={(e) => setProjectForm({ ...projectForm, demo: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://demo.example.com"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 rounded focus:ring-blue-500"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                  Featured Project
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={saveProject}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
                >
                  <Save className="h-5 w-5" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {modalType === 'achievement' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={achievementForm.type}
                  onChange={(e) => setAchievementForm({ ...achievementForm, type: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {achievementTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={achievementForm.title}
                  onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Achievement title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  value={achievementForm.organization}
                  onChange={(e) => setAchievementForm({ ...achievementForm, organization: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Issuing organization"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="text"
                  value={achievementForm.date}
                  onChange={(e) => setAchievementForm({ ...achievementForm, date: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2023, June 2023"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={achievementForm.description}
                  onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Description of the achievement"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Certificate URL (Optional)
                </label>
                <input
                  type="url"
                  value={achievementForm.url}
                  onChange={(e) => setAchievementForm({ ...achievementForm, url: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://certificate.example.com"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={saveAchievement}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
                >
                  <Save className="h-5 w-5" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={aboutData.title}
                onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={aboutData.content}
                onChange={(e) => setAboutData({ ...aboutData, content: e.target.value })}
                rows={12}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Write about yourself..."
              />
            </div>
            
            <button
              onClick={saveAboutData}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
            >
              <Save className="h-5 w-5" />
              <span>Save Changes</span>
            </button>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Manage Skills</h3>
              <button
                onClick={() => openSkillModal()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
              >
                <Plus className="h-4 w-4" />
                <span>Add Skill Category</span>
              </button>
            </div>
            
            <div className="grid gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="glass-morphism p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">{skill.category}</h4>
                      <p className="text-gray-400 text-sm mb-2">Icon: {skill.icon} | Order: {skill.order}</p>
                      <div className="flex flex-wrap gap-2">
                        {skill.skills.map((s, index) => (
                          <span key={index} className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                            {s.name} ({s.level}%)
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openSkillModal(skill)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteSkill(skill.id!)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Manage Projects</h3>
              <button
                onClick={() => openProjectModal()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
              >
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
              </button>
            </div>
            
            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project.id} className="glass-morphism p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                        {project.featured && (
                          <span className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{project.category}</p>
                      <p className="text-gray-300 text-sm mb-2 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="text-xs bg-gray-600/50 text-gray-300 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-4 text-sm">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
                            <ExternalLink className="h-3 w-3" />
                            <span>GitHub</span>
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
                            <ExternalLink className="h-3 w-3" />
                            <span>Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openProjectModal(project)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id!)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Manage Achievements</h3>
              <button
                onClick={() => openAchievementModal()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
              >
                <Plus className="h-4 w-4" />
                <span>Add Achievement</span>
              </button>
            </div>
            
            <div className="grid gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="glass-morphism p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-white">{achievement.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          achievement.type === 'award' ? 'bg-yellow-600/20 text-yellow-400' :
                          achievement.type === 'certification' ? 'bg-blue-600/20 text-blue-400' :
                          'bg-green-600/20 text-green-400'
                        }`}>
                          {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-blue-400 text-sm mb-1">{achievement.organization}</p>
                      <p className="text-gray-400 text-sm mb-2">{achievement.date}</p>
                      <p className="text-gray-300 text-sm mb-2 line-clamp-2">{achievement.description}</p>
                      {achievement.url && (
                        <a href={achievement.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1">
                          <ExternalLink className="h-3 w-3" />
                          <span>View Certificate</span>
                        </a>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openAchievementModal(achievement)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteAchievement(achievement.id!)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Account Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={settings.githubUrl}
                  onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/yourusername"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={settings.linkedinUrl}
                  onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/yourusername"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={settings.phoneNumber}
                  onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={settings.location}
                  onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="San Francisco, CA"
                />
              </div>
              
              <button
                onClick={saveSettings}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
              >
                <Save className="h-5 w-5" />
                <span>Save Settings</span>
              </button>
            </div>
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <form onSubmit={handleResumeUpload} className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload/Replace Resume (PDF only)
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    ref={resumeInputRef}
                    className="block w-full text-gray-300 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={resumeUploading}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {resumeUploading ? 'Uploading...' : 'Upload Resume'}
                  </button>
                </form>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-2">Key Metrics</h3>
                  {keyMetrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center space-x-2 mb-2">
                      <select
                        value={metric.icon}
                        onChange={e => {
                          const newMetrics = [...keyMetrics];
                          newMetrics[idx].icon = e.target.value;
                          setKeyMetrics(newMetrics);
                        }}
                        className="px-2 py-1 rounded bg-slate-800 text-white border border-slate-700"
                      >
                        {iconOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={metric.value}
                        onChange={e => {
                          const newMetrics = [...keyMetrics];
                          newMetrics[idx].value = e.target.value;
                          setKeyMetrics(newMetrics);
                        }}
                        className="w-20 px-2 py-1 rounded bg-slate-800 text-white border border-slate-700"
                        placeholder="Value"
                      />
                      <input
                        type="text"
                        value={metric.label}
                        onChange={e => {
                          const newMetrics = [...keyMetrics];
                          newMetrics[idx].label = e.target.value;
                          setKeyMetrics(newMetrics);
                        }}
                        className="flex-1 px-2 py-1 rounded bg-slate-800 text-white border border-slate-700"
                        placeholder="Label"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newMetrics = keyMetrics.filter((_, i) => i !== idx);
                          setKeyMetrics(newMetrics);
                        }}
                        className="text-red-400 hover:text-red-300 px-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setKeyMetrics([...keyMetrics, { icon: 'User', value: '', label: '' }])}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm mt-2"
                  >
                    Add Metric
                  </button>
                  <button
                    type="button"
                    onClick={saveKeyMetrics}
                    disabled={keyMetricsLoading}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 mt-2"
                  >
                    {keyMetricsLoading ? 'Saving...' : 'Save Key Metrics'}
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Resume upload handler
  const handleResumeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeInputRef.current?.files?.[0]) {
      toast.error('Please select a PDF file to upload.');
      return;
    }
    const file = resumeInputRef.current.files[0];
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed.');
      return;
    }
    setResumeUploading(true);
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/upload-resume`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });
      if (response.ok) {
        toast.success('Resume uploaded successfully!');
        fetchData(); // Refresh data to show new resume link
      } else {
        const errorData = await response.json();
        toast.error(`Failed to upload resume: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error('Failed to upload resume.');
    } finally {
      setResumeUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-red-700 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>

      <div className="flex space-x-4 border-b border-gray-800 pb-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {renderTabContent()}
          {renderModal()}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;