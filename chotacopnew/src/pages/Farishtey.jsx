// import React, { useState } from 'react';
// import Header from '../components/Header';

// const languageVideos = {
//   Kannada: '/assets/Farishtey - First Responder - Kannada.mov',
//   Hindi: '/assets/Farishtey - First Responder - Hindi.mov',
//   Tamil: '/assets/Farishtey - First Responder - Tamil.mov',
// };

// const FarishteyPage = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState('Hindi');

//   const handleLanguageChange = (e) => {
//     setSelectedLanguage(e.target.value);
//   };

//   return (
//     <div className="bg-[#fdf5eb] min-h-screen">
//       {/* Header/Navbar */}
//       <Header />

//       {/* Main Section */}
//       <div className="relative flex justify-center items-center p-10 font-sans mt-[-570px]">
//         {/* Logo and Button Container */}
//         <div className="absolute left-10 top-1/2 transform -translate-y-1/2 ml-[70px] mt-[-80px] flex flex-col items-start space-y-4">
//           {/* Logo */}
//           <img
//             src="/assets/Yi-Farishtey.png"
//             alt="Farishtey Logo"
//             className="w-[350px]"
//           />
//           {/* PPT Download Button */}
//           <a href="/assets/Yi Farishtey.pptx" download>
//             <button className="px-5 py-2 bg-blue-900 text-white rounded hover:bg-blue-700 transition duration-300 ml-[105px]">
//               Farishtey PPT
//             </button>
//           </a>
//         </div>

//         {/* Content Box */}
//         <div className="flex items-start gap-10 bg-[#fdf5eb] p-8 rounded-lg shadow-lg w-[670px] ml-[160px]">
//           <div className="flex-1">
//             {/* Language Selector */}
//             <div className="mb-5">
//               <label className="mr-3 font-bold">Select Language:</label>
//               <select
//                 value={selectedLanguage}
//                 onChange={handleLanguageChange}
//                 className="px-3 py-1 border border-gray-300 rounded"
//               >
//                 {Object.keys(languageVideos).map((lang) => (
//                   <option key={lang} value={lang}>{lang}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Video Player */}
//             <div className="mb-5">
//               <video
//                 width="100%"
//                 controls
//                 src={languageVideos[selectedLanguage]}
//                 className="rounded-lg shadow-md"
//               >
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarishteyPage;

import React, { useState } from 'react';
import Header from '../components/Header';

const languageVideos = {
  Kannada: '/assets/Farishtey - First Responder - Kannada.mov',
  Hindi: '/assets/Farishtey - First Responder - Hindi.mov',
  Tamil: '/assets/Farishtey - First Responder - Tamil.mov',
};

const FarishteyPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="bg-[#fdf5eb] min-h-screen">
      {/* Header/Navbar */}
      <Header />

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-10 py-10 font-sans gap-10 mt-[-550px]">
        {/* Logo + Button */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <img
            src="/assets/Yi-Farishtey.png"
            alt="Farishtey Logo"
            className="w-48 sm:w-64 md:w-72 lg:w-[350px]"
          />
          <a href="/assets/Yi Farishtey.pptx" download>
            <button className="px-5 py-2 bg-blue-900 text-white rounded hover:bg-blue-700 transition duration-300 ml-[98px]">
              Download PPT
            </button>
          </a>
        </div>

        {/* Video Section */}
        <div className="w-full max-w-2xl bg-[#fdf5eb] bg-opacity-80 p-6 sm:p-8 rounded-lg shadow-lg">
          {/* Language Selector */}
          <div className="mb-5">
            <label className="block sm:inline-block font-bold mb-2 sm:mb-0 sm:mr-3">
              Select Language:
            </label>
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="px-3 py-2 border border-gray-300 rounded w-full sm:w-auto"
            >
              {Object.keys(languageVideos).map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Video Player */}
          <div className="mb-5">
            <video
              controls
              src={languageVideos[selectedLanguage]}
              className="w-full rounded-lg shadow-md"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarishteyPage;
