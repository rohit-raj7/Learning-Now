import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/student/SearchBar';
import './Hero.css';

function Hero() {
  const navigate = useNavigate();
  const words = ['Streaming Data', 'Real-time Insights', 'Live Events'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    const iconLink = document.createElement('link');
    iconLink.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    iconLink.rel = "stylesheet";
    document.head.appendChild(iconLink);
  }, []);

  return (
    <div className='bg-white'>
      <main>
        <section className="left-panel" aria-label="Promotional information">
         <div className=' '>
          <h1 className=" text-gray-100 text-2xl sm:text-2xl md:text-4xl lg:text-4xl font-medium">
            <span  className='Empower'>Empower</span> your future with the !!
          </h1>
          <h1 className=" text-gray-100 mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium max-w-full break-words">
            courses Built for{' '}
            <span className="inline-block px-3 mt-4 py-1 border border-[#15d693] rounded-[12px] text-[#10b27c] font-[Courier_New] transition-opacity duration-500 ease-in-out whitespace-nowrap">
              {words[index]}
            </span>
          </h1>
          </div>

          <button 
      onClick={() => navigate('/user/signup')} 
      className="btn-signup" 
      type="button"
    >
      Sign Up for Free
    </button>

    <div className="px-4 mb-6 sm:px-8 md:px-16 lg:px-32">
          <SearchBar/>
        </div>


          <div className="skill-tags" aria-label="Focus areas">
            <div className="skill-tag"><span className="skill-icon"></span> AI</div>
            <div className="skill-tag"><span className="skill-icon"></span> Coding</div>
            <div className="skill-tag"><span className="skill-icon"></span> Interview Prep</div>
            <div className="skill-tag"><span className="skill-icon"></span> New Age Skills</div>
          </div>

          <div className="avatar-line" aria-label="Learners">
            <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e518d664-7f16-4b0a-8d2f-1294947eba21.png" alt="Learner 1" />
            <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9e41deec-cf5b-4a9a-aeef-8d4483fd779b.png" alt="Learner 2" />
            <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7a0fea01-5e46-4f66-b2e6-02e3ec3aa5b9.png" alt="Learner 3" />
            <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bb794525-918d-4f06-a7ab-9132ab93093c.png" alt="Learner 4" />
            <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a9cd1bed-c479-4bb6-af39-4b5f23650530.png" alt="Learner 5" />
            <div className="avatar-count">1 Million+ <span className='avatar-label'>Monthly Active Learners</span></div>
            {/* <div className="avatar-label">Monthly Active Learners</div> */}
          </div>
        </section>

        <section className="right-panel" aria-label="Student featured image with info boxes">
          <div className="background-grid" aria-hidden="true"></div>
          <div className="background-green-shape" aria-hidden="true"></div>
          <img
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/76874a8e-3f7f-4034-84f4-53896a36c8f2.png"
            alt="Smiling young woman student"
            className="student-photo"
            loading="lazy"
            draggable="false"
          />

          <aside className="info-box info-top-left" aria-label="Student placement info">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cb9453a9-ee26-400e-ae1a-8d44b7031060.png"
              alt="Mayur Jain"
              className="avatar-small"
              loading="lazy"
            />
            <div className="text-block">
              <p className="title">Got Placed</p>
              <p className="subtitle">Sourabh Raj <br /><small>Microsoft</small></p>
            </div>
            <div className="badge-lpa">20 LPA</div>
          </aside>

          <aside className="info-box info-bottom-right" aria-label="Learner Reviews rating">
            <div className="rating-score" aria-label="Rating 4.5 stars out of 5">
              4.5 <span className="material-icons" aria-hidden="true">star</span>
            </div>
            <div>
              <div className="rating-label">Learner Reviews</div>
              <div className="rating-bars" aria-hidden="true">
                <div className="rating-bar-row"><span>5</span><div className="rating-bar star-5"></div></div>
                <div className="rating-bar-row"><span>4</span><div className="rating-bar star-4"></div></div>
                <div className="rating-bar-row"><span>3</span><div className="rating-bar star-3"></div></div>
                <div className="rating-bar-row"><span>2</span><div className="rating-bar star-2"></div></div>
                <div className="rating-bar-row"><span>1</span><div className="rating-bar star-1"></div></div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Hero;

 










// import React, { useEffect } from 'react';
// import './Hero.css';

// function Hero() {
//   useEffect(() => {
//     const fontLink = document.createElement('link');
//     fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
//     fontLink.rel = "stylesheet";
//     document.head.appendChild(fontLink);

//     const iconLink = document.createElement('link');
//     iconLink.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
//     iconLink.rel = "stylesheet";
//     document.head.appendChild(iconLink);
//   }, []);
//   return (
//     <div className='bg-white'>
      
//   <main>
//     <section className="left-panel" aria-label="Promotional information">
//       <h1>
//         <span className="highlight">PrepInsta</span>, Engineering Simplified!!!
//       </h1>
//       <button className="btn-signup" type="button">Sign Up for Free</button>

//       <div className="skill-tags" aria-label="Focus areas">
//         <div className="skill-tag"><span className="skill-icon"></span> Aptitude</div>
//         <div className="skill-tag"><span className="skill-icon"></span> Coding</div>
//         <div className="skill-tag"><span className="skill-icon"></span> Interview Prep</div>
//         <div className="skill-tag"><span className="skill-icon"></span> New Age Skills</div>
//       </div>

//       <div className="avatar-line" aria-label="Learners">
//         <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e518d664-7f16-4b0a-8d2f-1294947eba21.png" alt="Avatar of active learner 1" />
//         <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9e41deec-cf5b-4a9a-aeef-8d4483fd779b.png" alt="Avatar of active learner 2" />
//         <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7a0fea01-5e46-4f66-b2e6-02e3ec3aa5b9.png" alt="Avatar of active learner 3" />
//         <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bb794525-918d-4f06-a7ab-9132ab93093c.png" alt="Avatar of active learner 4" />
//         <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a9cd1bed-c479-4bb6-af39-4b5f23650530.png" alt="Avatar of active learner 5" />
//         <div className="avatar-count">10 Million+</div>
//         <div className="avatar-label">Monthly Active Learners</div>
//       </div>
//     </section>

//     <section className="right-panel" aria-label="Student featured image with info boxes">
//       <div className="background-grid" aria-hidden="true"></div>
//       <div className="background-green-shape" aria-hidden="true"></div>
//       <img
//         src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/76874a8e-3f7f-4034-84f4-53896a36c8f2.png"
//         alt="Smiling young woman student with glasses holding books"
//         className="student-photo"
//         loading="lazy"
//         draggable="false"
//       />

//       <aside className="info-box info-top-left" aria-label="Student placement info">
//         <img
//           src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cb9453a9-ee26-400e-ae1a-8d44b7031060.png"
//           alt="Avatar of Mayur Jain"
//           className="avatar-small"
//           aria-hidden="false"
//           loading="lazy"
//         />
//         <div classNameName="text-block">
//           <p className="title">Got Placed</p>
//           <p className="subtitle">Mayur Jain <br /><small>Cognizant</small></p>
//         </div>
//         <div className="badge-lpa">10 LPA</div>
//       </aside>

//       <aside className="info-box info-bottom-right" aria-label="Google Reviews rating">
//         <div className="rating-score" aria-label="Rating 4.5 stars out of 5">
//           4.5 <span className="material-icons" aria-hidden="true">star</span>
//         </div>
//         <div>
//           <div className="rating-label">Google Reviews</div>
//           <div className="rating-bars" aria-hidden="true">
//             <div className="rating-bar-row"><span>5</span><div className="rating-bar star-5"></div></div>
//             <div className="rating-bar-row"><span>4</span><div className="rating-bar star-4"></div></div>
//             <div className="rating-bar-row"><span>3</span><div className="rating-bar star-3"></div></div>
//             <div className="rating-bar-row"><span>2</span><div className="rating-bar star-2"></div></div>
//             <div className="rating-bar-row"><span>1</span><div className="rating-bar star-1"></div></div>
//           </div>
//         </div>
//       </aside>
//     </section>
//   </main> 
//     </div>
//   )
// }

// export default Hero

 