


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/student/SearchBar';
import SkeletonHero from '../../pages/SkeletonLoadingUi/SkeletonHero'

function Hero() {
  const navigate = useNavigate();
  const words = [
    'Real-time learning',
    'Simplicity',
    'Beginner-Friendly',
    'Live Classes',
    'End-to-End Understanding'
  ];
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  const totalImages = 7;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleImageLoad = () => {
    setLoadedImages((prev) => {
      const next = prev + 1;
      if (next >= totalImages) setLoading(false);
      return next;
    });
  };

  const currentWord = words[index];
  let textSizeClass = 'text-[clamp(1.25rem,4vw,3rem)]';
  if (currentWord.length > 25) {
    textSizeClass = 'text-[clamp(1rem,2.5vw,1.8rem)]';
  } else if (currentWord.length > 18) {
    textSizeClass = 'text-[clamp(1.1rem,3vw,2.2rem)]';
  }

  if (loading) {
    return (
      <div>
        <SkeletonHero />
      </div>
    );
  }

  return (
    <div className="bg-white w-full min-h-screen flex items-center justify-center font-['Inter']">
      <main className="w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-2 px-4 md:px-12 lg:px-24 py-12 items-center gap-10">
        {/* LEFT PANEL */}
        <section className="flex flex-col justify-center gap-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900">
            <span className="text-[#29c35f]">Empower</span> your future with the !!
          </h1>
          <div className="flex flex-col items-center lg:items-start gap-6">
            <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700">courses Built for</span>
            <div className="overflow-x-auto no-scrollbar">
              <span className={`inline-block px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-6 lg:py-5 border border-[#15d693] rounded-[16px] text-[#10b27c] font-mono whitespace-nowrap transition-all duration-500 ease-in-out ${textSizeClass}`}>
                {currentWord}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/user/signup')}
            className="bg-[#23c16e] hover:bg-[#1db358] text-white text-lg font-bold px-6 py-3 rounded-full shadow transition w-full mx-auto lg:mx-0"
          >
            Sign Up for Free
          </button>

          <div className="w-full">
            <SearchBar />
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-[#23c16e] text-sm">
            {['AI', 'Coding', 'Interview Prep', 'New Age Skills'].map((tag, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className="h-4 w-4 border-2 border-[#23c16e] rounded-sm"></span>
                {tag}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/${[
                  'e518d664-7f16-4b0a-8d2f-1294947eba21',
                  '9e41deec-cf5b-4a9a-aeef-8d4483fd779b',
                  '7a0fea01-5e46-4f66-b2e6-02e3ec3aa5b9',
                  'bb794525-918d-4f06-a7ab-9132ab93093c',
                  'a9cd1bed-c479-4bb6-af39-4b5f23650530'
                ][i - 1]}.png`}
                alt={`Learner ${i}`}
                className="w-9 h-9 rounded-full border-2 border-white shadow"
                onLoad={handleImageLoad}
              />
            ))}
            <div className="font-bold text-sm">
              1 Million+ <span className="text-gray-500 text-xs">Monthly Active Learners</span>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="relative flex justify-center items-center">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            {/* Glow blur layer */}
            <div className="absolute inset-0 bg-gradient-radial from-[#d3f1e2] via-transparent to-transparent blur-2xl opacity-30 z-0"></div>

            {/* Animated grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,_#bce6d3_1px,_transparent_1px),linear-gradient(to_bottom,_#bce6d3_1px,_transparent_1px)] bg-[length:36px_36px] opacity-40 animate-[moveGrid_10s_linear_infinite] z-10"></div>
          </div>



          <div className="relative w-[300px] sm:w-[340px] md:w-[360px] lg:w-[400px] h-[420px] sm:h-[440px] md:h-[460px] rounded-3xl bg-gradient-to-br from-[#23c16e] to-[#1eb85c] shadow-2xl flex justify-center items-center z-10">
            <div className="absolute -top-9 -left-9 w-18 h-18 bg-white rounded-3xl"></div>
            <div className="absolute -bottom-9 -right-9 w-18 h-18 bg-white rounded-3xl"></div>
          </div>
          <img
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/76874a8e-3f7f-4034-84f4-53896a36c8f2.png"
            alt="Student"
            className="absolute w-[240px] sm:w-[260px] md:w-[280px] lg:w-[330px] h-[390px] object-cover rounded-[20px] shadow-xl z-20"
            draggable="false"
            loading="lazy"
            onLoad={handleImageLoad}
          />

          {/* Top left info */}
          <aside className="absolute top-4 left-4 bg-white rounded-xl shadow-md p-3 text-sm flex items-center gap-3 z-30 min-w-[200px] sm:min-w-[230px]">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cb9453a9-ee26-400e-ae1a-8d44b7031060.png"
              alt="Mayur Jain"
              className="w-9 h-9 rounded-full object-cover shadow"
              loading="lazy"
              onLoad={handleImageLoad}
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 m-0">Success Story</p>
              <p className="text-gray-500 text-xs">Sourabh Raj<br /><small>Microsoft</small></p>
            </div>
            <div className="bg-[#063a1e] text-[#76c893] rounded-full px-3 py-1 text-xs font-bold">20 LPA</div>
          </aside>

          {/* Bottom right info */}
          <aside className="absolute bottom-4 right-4 bg-white rounded-xl shadow-md p-3 text-sm flex items-center justify-between gap-3 z-30 min-w-[200px] sm:min-w-[230px]">
            <div className="text-[#23c16e] font-bold text-xl flex items-center gap-1">
              4.5 <span className="material-icons text-[#23c16e] text-xl">star</span>
            </div>
            <div>
              <div className="text-xs text-gray-500">Learner Reviews</div>
              <div className="flex flex-col gap-[3px] mt-1">
                {[5, 4, 3, 2, 1].map((star, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="text-xs text-gray-400 w-4 text-center">{star}</span>
                    <div className={`h-[6px] rounded-full bg-[#23c16e] ${star === 5 ? 'w-[90%]' :
                      star === 4 ? 'w-[70%]' :
                        star === 3 ? 'w-[45%]' :
                          star === 2 ? 'w-[30%]' : 'w-[10%]'
                      }`}></div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Hero;
