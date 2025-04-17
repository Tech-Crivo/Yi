// import React from "react";

// function Header() {
//   return (
// <div className="min-h-screen bg-[#fdf5eb] p-6">
//       {/* Top Logos */}
//       <div className="flex justify-between items-center px-6">
//         <img
//           src="/assets/Yi.png"
//           alt="Yi Logo"
//           className="h-28 object-contain"
//         />
//         <img
//           src="/assets/Yi-CII.png"
//           alt="CII Logo"
//           className="h-18 object-contain"
//         />
//       </div>

//       {/* Center Diamond Sign */}
//       <div className="flex justify-center mt-[-110px]">
//         <img
//           src="/assets/Yi-RoadSafety.png"
//           alt="Center Road Sign"
//           className="h-35 object-contain"
//         />
//       </div>

// <div/>


import React from "react";

function Header() {
  return (
    <div className="min-h-screen bg-[#fdf5eb] p-6">
  {/* Top Logos */}
      <div className="flex justify-between items-center px-6">
        {/* Yi Logo */}
        <a href="https://youngindians.net/" target="_blank" rel="noopener noreferrer">
          <img
            src="/assets/Yi.png"
            alt="Yi Logo"
            className="h-28 object-contain"
          />
        </a>

        {/* CII Logo */}
        <a href="https://www.cii.in/" target="_blank" rel="noopener noreferrer">
          <img
            src="/assets/Yi-CII.png"
            alt="CII Logo"
            className="h-18 object-contain"
          />
        </a>
      </div>

  {/* Center Road Safety Logo */}
      <div className="flex justify-center mt-[-110px]">
        <a href="https://youngindians.net/road-safety/" target="_blank" rel="noopener noreferrer">
          <img
            src="/assets/Yi-RoadSafety.png"
            alt="Center Road Sign"
            className="h-35 object-contain"
          />
        </a>
      </div>
    </div>

  );
}

export default Header;
