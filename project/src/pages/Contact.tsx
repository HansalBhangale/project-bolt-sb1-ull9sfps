import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [contactInfo, setContactInfo] = useState([
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      value: '',
      link: ''
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      value: '',
      link: ''
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Location',
      value: '',
      link: ''
    },
  ]);

  const [socialLinks, setSocialLinks] = useState([
    {
      icon: <Github className="h-6 w-6" />,
      name: 'GitHub',
      url: '',
      color: 'hover:text-gray-400'
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      name: 'LinkedIn',
      url: '',
      color: 'hover:text-blue-400'
    },
  ]);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`);
        if (response.ok) {
          const data = await response.json();
          
          // Update contact info
          setContactInfo([
            {
              icon: <Mail className="h-6 w-6" />,
              title: 'Email',
              value: data.contactEmail || '',
              link: data.contactEmail ? `mailto:${data.contactEmail}` : ''
            },
            {
              icon: <Phone className="h-6 w-6" />,
              title: 'Phone',
              value: data.phoneNumber || '',
              link: data.phoneNumber ? `tel:${data.phoneNumber}` : ''
            },
            {
              icon: <MapPin className="h-6 w-6" />,
              title: 'Location',
              value: data.location || '',
              link: 'https://maps.google.com'
            },
          ]);

          // Update social links
          setSocialLinks([
            {
              icon: <Github className="h-6 w-6" />,
              name: 'GitHub',
              url: data.githubUrl || '',
              color: 'hover:text-gray-400'
            },
            {
              icon: <Linkedin className="h-6 w-6" />,
              name: 'LinkedIn',
              url: data.linkedinUrl || '',
              color: 'hover:text-blue-400'
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchContactData();
  }, []);

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
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Let's discuss how we can work together to solve your data challenges
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-morphism p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{info.title}</p>
                      <a
                        href={info.link}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-morphism p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Connect With Me
              </h3>
              
              <div className="flex space-x-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className={`p-3 glass-morphism rounded-full text-gray-400 ${social.color} transition-all duration-300 hover:scale-110`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="glass-morphism p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">
                Let's Collaborate
              </h3>
              <p className="text-gray-300 leading-relaxed">
                I'm always interested in discussing new opportunities, innovative projects,
                and collaborations. Whether you're looking to implement AI solutions,
                need data science consulting, or want to explore cutting-edge technologies,
                I'd love to hear from you.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-morphism p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project or question..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;