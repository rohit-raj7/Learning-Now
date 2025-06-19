







import { useState, useEffect } from 'react';

const EducatorProfile = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Create floating particles
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('absolute', 'rounded-full', 'bg-purple-500', 'bg-opacity-30', 'animate-float');
      
      // Random size between 5px and 15px
      const size = Math.random() * 10 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = `-${size}px`;
      
      // Random animation duration between 10s and 20s
      const duration = Math.random() * 10 + 10;
      particle.style.animationDuration = `${duration}s`;
      
      // Random delay
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particlesContainer.appendChild(particle);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      {/* Background with dark overlay */}
      <div className={`fixed inset-0 z-0 ${darkMode ? 'bg-gradient-to-b from-gray-900/90 to-gray-900/95' : 'bg-gradient-to-b from-gray-100/90 to-gray-100/95'}`}>
        <img 
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating particles */}
      <div id="particles" className="fixed inset-0 pointer-events-none z-0"></div>

      {/* Theme toggle */}
      <button 
        onClick={toggleDarkMode}
        className={`fixed top-5 right-5 w-12 h-12 rounded-full flex items-center justify-center z-50 transition-all ${
          darkMode ? 'bg-gray-800 border-gray-700 hover:bg-purple-600' : 'bg-white border-gray-200 hover:bg-purple-200'
        } border`}
      >
        {darkMode ? (
          <i className="fas fa-moon text-gray-200"></i>
        ) : (
          <i className="fas fa-sun text-gray-800"></i>
        )}
      </button>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Profile Header */}
        <header className="flex flex-col items-center mb-12">
          <img 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="Educator Profile" 
            className="w-36 h-36 rounded-full object-cover border-4 border-purple-600 shadow-lg shadow-purple-500/30 transition-transform hover:scale-105"
          />
          <h1 className={`text-4xl mt-6 mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dr. Sarah Johnson</h1>
          <p className="text-xl text-purple-400 mb-4 font-light">Professor of Computer Science | Education Specialist</p>
          <p className="max-w-2xl text-center leading-relaxed opacity-90 mb-8">
            Passionate educator with 12+ years of experience in computer science and pedagogy. 
            Dedicated to creating engaging learning experiences and fostering student success 
            through innovative teaching methods and curriculum development.
          </p>
          <div className="flex gap-6 mb-8">
            <a href="#" className={`text-2xl transition-all ${darkMode ? 'text-gray-200 hover:text-purple-500' : 'text-gray-700 hover:text-purple-600'}`}>
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className={`text-2xl transition-all ${darkMode ? 'text-gray-200 hover:text-purple-500' : 'text-gray-700 hover:text-purple-600'}`}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className={`text-2xl transition-all ${darkMode ? 'text-gray-200 hover:text-purple-500' : 'text-gray-700 hover:text-purple-600'}`}>
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className={`text-2xl transition-all ${darkMode ? 'text-gray-200 hover:text-purple-500' : 'text-gray-700 hover:text-purple-600'}`}>
              <i className="fab fa-researchgate"></i>
            </a>
            <a href="#" className={`text-2xl transition-all ${darkMode ? 'text-gray-200 hover:text-purple-500' : 'text-gray-700 hover:text-purple-600'}`}>
              <i className="fas fa-envelope"></i>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className={`px-8 py-4 rounded-lg text-center transition-all ${darkMode ? 'bg-purple-500/10 border-purple-500/20 hover:shadow-purple-500/20' : 'bg-purple-100 border-purple-200 hover:shadow-purple-200'} border hover:-translate-y-1 hover:shadow-lg`}>
              <div className="text-3xl font-bold text-purple-600 mb-2">12+</div>
              <div className="text-sm opacity-80">Years Experience</div>
            </div>
            <div className={`px-8 py-4 rounded-lg text-center transition-all ${darkMode ? 'bg-purple-500/10 border-purple-500/20 hover:shadow-purple-500/20' : 'bg-purple-100 border-purple-200 hover:shadow-purple-200'} border hover:-translate-y-1 hover:shadow-lg`}>
              <div className="text-3xl font-bold text-purple-600 mb-2">2.4K</div>
              <div className="text-sm opacity-80">Students Taught</div>
            </div>
            <div className={`px-8 py-4 rounded-lg text-center transition-all ${darkMode ? 'bg-purple-500/10 border-purple-500/20 hover:shadow-purple-500/20' : 'bg-purple-100 border-purple-200 hover:shadow-purple-200'} border hover:-translate-y-1 hover:shadow-lg`}>
              <div className="text-3xl font-bold text-purple-600 mb-2">48</div>
              <div className="text-sm opacity-80">Courses Created</div>
            </div>
            <div className={`px-8 py-4 rounded-lg text-center transition-all ${darkMode ? 'bg-purple-500/10 border-purple-500/20 hover:shadow-purple-500/20' : 'bg-purple-100 border-purple-200 hover:shadow-purple-200'} border hover:-translate-y-1 hover:shadow-lg`}>
              <div className="text-3xl font-bold text-purple-600 mb-2">4.9</div>
              <div className="text-sm opacity-80">Avg. Rating</div>
            </div>
          </div>
        </header>

        {/* Areas of Expertise */}
        <section className={`mb-12 p-8 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-gray-200'} border`}>
          <h2 className={`text-2xl mb-6 pb-2 relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Areas of Expertise
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-purple-600 rounded"></span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {['Computer Science Education', 'Curriculum Development', 'Pedagogical Research', 'Machine Learning', 
              'Data Structures', 'Algorithms', 'Web Development', 'Online Learning', 'Student Engagement', 
              'Assessment Design'].map((skill) => (
              <span 
                key={skill}
                className={`px-4 py-2 rounded-full text-sm transition-all ${darkMode ? 'bg-purple-500/20 hover:bg-purple-500' : 'bg-purple-100 hover:bg-purple-200'}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Featured Courses */}
        <section className={`mb-12 p-8 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-gray-200'} border`}>
          <h2 className={`text-2xl mb-6 pb-2 relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Courses
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-purple-600 rounded"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Advanced Algorithms",
                description: "Master complex algorithms and data structures with practical applications in modern computing. Includes dynamic programming, graph algorithms, and NP-completeness.",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                duration: "12 Weeks",
                level: "Advanced"
              },
              {
                title: "Machine Learning Fundamentals",
                description: "Introduction to machine learning concepts, algorithms, and applications. Covers supervised and unsupervised learning, neural networks, and model evaluation.",
                image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
                duration: "8 Weeks",
                level: "Intermediate"
              },
              {
                title: "Web Development Bootcamp",
                description: "Comprehensive course covering HTML, CSS, JavaScript, and modern frameworks. Build responsive, interactive websites from scratch to deployment.",
                image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                duration: "10 Weeks",
                level: "Beginner"
              }
            ].map((course) => (
              <div 
                key={course.title}
                className={`rounded-xl overflow-hidden transition-all ${darkMode ? 'bg-gray-700/80 border-gray-600 hover:shadow-purple-500/20' : 'bg-white border-gray-200 hover:shadow-purple-200'} border hover:-translate-y-1 hover:shadow-lg`}
              >
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className={`text-xl mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{course.title}</h3>
                  <p className="text-sm opacity-80 mb-4 leading-relaxed">{course.description}</p>
                  <div className="flex justify-between text-xs opacity-70 mb-4">
                    <span><i className="fas fa-clock mr-1"></i> {course.duration}</span>
                    <span><i className="fas fa-users mr-1"></i> {course.level}</span>
                  </div>
                  <button className={`w-full py-3 px-6 rounded-full font-medium transition-all ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white`}>
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teaching Philosophy */}
        <section className={`mb-12 p-8 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-gray-200'} border`}>
          <h2 className={`text-2xl mb-6 pb-2 relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Teaching Philosophy
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-purple-600 rounded"></span>
          </h2>
          <p className="mb-6 leading-relaxed">
            I believe education should be accessible, engaging, and transformative. My approach combines:
          </p>
          <ul className="mb-6 pl-6 leading-relaxed">
            <li className="mb-3"><strong className="text-purple-500">Active Learning:</strong> Students learn best by doing, so my courses emphasize hands-on projects and real-world applications.</li>
            <li className="mb-3"><strong className="text-purple-500">Scaffolded Instruction:</strong> Complex concepts are broken down into manageable steps with appropriate support at each level.</li>
            <li className="mb-3"><strong className="text-purple-500">Inclusive Pedagogy:</strong> Creating an environment where all students feel valued and supported in their learning journey.</li>
            <li className="mb-3"><strong className="text-purple-500">Continuous Feedback:</strong> Regular assessments and feedback loops to help students track their progress and improve.</li>
          </ul>
          <p className="leading-relaxed">
            My ultimate goal is to empower students to become independent, critical thinkers who can apply their knowledge creatively to solve problems.
          </p>
        </section>

        {/* Contact Form */}
        <section className={`mb-12 p-8 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/80 border-gray-200'} border`}>
          <h2 className={`text-2xl mb-6 pb-2 relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Get In Touch
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-purple-600 rounded"></span>
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm opacity-80 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Your name"
                className={`w-full px-4 py-3 rounded-lg transition-all ${darkMode ? 'bg-gray-700/50 border-gray-600 focus:border-purple-500 focus:bg-purple-500/10' : 'bg-gray-100 border-gray-200 focus:border-purple-500 focus:bg-purple-100'} border`}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm opacity-80 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Your email"
                className={`w-full px-4 py-3 rounded-lg transition-all ${darkMode ? 'bg-gray-700/50 border-gray-600 focus:border-purple-500 focus:bg-purple-500/10' : 'bg-gray-100 border-gray-200 focus:border-purple-500 focus:bg-purple-100'} border`}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="subject" className="block text-sm opacity-80 mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                placeholder="Subject"
                className={`w-full px-4 py-3 rounded-lg transition-all ${darkMode ? 'bg-gray-700/50 border-gray-600 focus:border-purple-500 focus:bg-purple-500/10' : 'bg-gray-100 border-gray-200 focus:border-purple-500 focus:bg-purple-100'} border`}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm opacity-80 mb-2">Message</label>
              <textarea 
                id="message" 
                placeholder="Your message"
                rows="5"
                className={`w-full px-4 py-3 rounded-lg transition-all ${darkMode ? 'bg-gray-700/50 border-gray-600 focus:border-purple-500 focus:bg-purple-500/10' : 'bg-gray-100 border-gray-200 focus:border-purple-500 focus:bg-purple-100'} border`}
              ></textarea>
            </div>
            <button 
              type="submit"
              className={`py-3 px-6 rounded-full font-medium transition-all ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white`}
            >
              Send Message
            </button>
          </form>
        </section>
      </div>

      {/* Add Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Add animation keyframes */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default EducatorProfile;
