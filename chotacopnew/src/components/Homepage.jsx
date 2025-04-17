// import React from "react";
// import Header from "./Header";
// import { Link } from 'react-router-dom';

// function Homepage() {
//   return (
//     <div className="min-h-screen bg-[#fdf5eb] p-6">

//       <Header/>

//       {/* Bottom Card Icons */}
//       <div className="mt-[-450px]"> 
//         <div className="flex flex-wrap justify-center gap-10 ">
//             <Link to="/signup">
//             <img
//             src="/assets/Yi-ChotaCop.png"
//             alt="Chota Cop"
//             className="h-44 transition-transform hover:scale-105"
//             />
//             </Link>
//             <Link to="">
//             <div>
//               <h1>QUIZ</h1>
//             </div>
            
//             {/* <img
//             src="/assets/Yi-Quiz.png"
//             alt="Quiz"
//             className="h-44 transition-transform hover:scale-105"
//             /> */}
//             </Link>
//             <Link to="/farishtey">
//             <img
//             src="/assets/Yi-Farishtey.png"
//             alt="Farishtey"
//             className="h-44 transition-transform hover:scale-105"
//             />
//             </Link>
//             <a href="/assets/Colouring-Book-Chota-Cop.pdf" download>
//             <div>
//               <h1>Colouring Book</h1>
//             </div>
                
//                 {/* <img
//                     src="/assets/Yi-Colouring Zone.png"
//                     alt="Colouring Zone"
//                     className="h-44 transition-transform hover:scale-105 cursor-pointer"
//                 /> */}
//             </a>
//         </div>
//       </div>
//     </div>
    
//   );
// }

// export default Homepage;


// import React from "react";
// import Header from "./Header";
// import { Link } from "react-router-dom";

// function Homepage() {
//   return (
//     <div className="min-h-screen bg-[#fdf5eb] p-6 relative">

//       {/* Top Right Sign In / Sign Up */}
//       <div className="absolute top-6 right-6 flex gap-4">
//         <Link
//           to="/signin"
//           className="text-black font-semibold hover:underline"
//         >
//           Sign In
//         </Link>
//         <Link
//           to="/signup"
//           className="text-black font-semibold hover:underline"
//         >
//           Sign Up
//         </Link>
//       </div>

//       <Header />

//       {/* Bottom Card Icons */}
//       <div className="mt-[-450px]">
//         <div className="flex flex-wrap justify-center gap-10">
//           <Link to="/signup">
//             <img
//               src="/assets/Yi-ChotaCop.png"
//               alt="Chota Cop"
//               className="h-44 transition-transform hover:scale-105"
//             />
//           </Link>

//           <Link to="">
//             <div>
//             </div>
//             <img
//               src="/assets/Yi-Quiz.png"
//               alt="Quiz"
//               className="h-44 transition-transform hover:scale-105"
//             />
//           </Link>

//           <Link to="/farishtey">
//             <img
//               src="/assets/Yi-Farishtey.png"
//               alt="Farishtey"
//               className="h-44 transition-transform hover:scale-105"
//             />
//           </Link>

//           <a href="/assets/Colouring-Book-Chota-Cop.pdf" download>
//             <div>
//             </div>
//             <img
//               src="/assets/Yi-Colouring Zone.png"
//               alt="Colouring Zone"
//               className="h-44 transition-transform hover:scale-105 cursor-pointer"
//             />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Homepage;


// import React from "react";
// import Header from "./Header";
// import { Link } from "react-router-dom";

// function Homepage() {
//   return (
//     <div className="min-h-screen bg-[#fdf5eb] p-6 relative">
//       {/* Top Right Sign In / Sign Up */}
//       <div className="absolute top-6 right-6 flex gap-4">
//         <Link to="/signin" className="text-black font-semibold hover:underline">
//           Sign In
//         </Link>
//         <Link to="/signup" className="text-black font-semibold hover:underline">
//           Sign Up
//         </Link>
//       </div>

//       <Header />

//       {/* Bottom Card Icons */}
//       <div className="mt-[-450px]">
//         <div className="flex flex-wrap justify-center gap-10">
          
//           {/* Chota Cop */}
//           <Link to="/signup">
//             <img
//               src="/assets/Yi-ChotaCop.png"
//               alt="Chota Cop"
//               className="h-44 transition-transform hover:scale-105"
//             />
//           </Link>

//           {/* Quiz */}
//           <Link to="">
//             <img
//               src="/assets/quiz_sample1.png"
//               alt="Quiz"
//               className="h-44 transition-transform hover:scale-105"
//             />
//           </Link>

//           {/* Farishtey */}
//           <Link to="/farishtey">
//             <img
//               src="/assets/Yi-Farishtey.png"
//               alt="Farishtey"
//               className="h-44 transition-transform hover:scale-105"
//             />
//           </Link>

//           {/* Colouring Book */}
//           <Link to="/colouring_book">
//             <img
//               src="/assets/colouring_sample1.png"
//               alt="Colouring Zone"
//               className="h-44 transition-transform hover:scale-105 cursor-pointer"
//             />
//           </Link>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Homepage;


import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  const handleProtectedClick = (route) => {
    if (isLoggedIn) {
      navigate(route);
    } else {
      alert("Not signed in. Please sign in to access.");
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf5eb] p-6 relative">
      {/* Top Right Sign In / Sign Up OR Logout */}
      <div className="absolute top-6 right-6 flex gap-4">
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/signin")}
              className="text-black font-semibold hover:underline"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-black font-semibold hover:underline"
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-black font-semibold hover:underline"
          >
            Logout
          </button>
        )}
      </div>

      <Header />

      {/* Bottom Card Icons */}
      <div className="mt-[-450px]">
        <div className="flex flex-wrap justify-center gap-10">

          {/* Chota Cop */}
          <button onClick={() => handleProtectedClick("/chotacop")}>
            <img
              src="/assets/Yi-ChotaCop.png"
              alt="Chota Cop"
              className="h-44 transition-transform hover:scale-105"
            />
          </button>

          {/* Quiz */}
          <button onClick={() => handleProtectedClick("/quiz")}>
            <img
              src="/assets/quiz_sample1.png"
              alt="Quiz"
              className="h-44 transition-transform hover:scale-105"
            />
          </button>

          {/* Farishtey */}
          <button onClick={() => handleProtectedClick("/farishtey")}>
            <img
              src="/assets/Yi-Farishtey.png"
              alt="Farishtey"
              className="h-44 transition-transform hover:scale-105"
            />
          </button>

          {/* Colouring Book */}
          <button onClick={() => handleProtectedClick("/colouring_book")}>
            <img
              src="/assets/colouring_sample1.png"
              alt="Colouring Zone"
              className="h-44 transition-transform hover:scale-105 cursor-pointer"
            />
          </button>

        </div>
      </div>
    </div>
  );
}

export default Homepage;
