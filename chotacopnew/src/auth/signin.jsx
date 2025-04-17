// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";

// const Signin = () => {
//   const [email, setEmail] = useState("");
//   const [step, setStep] = useState("email");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [generatedOtp, setGeneratedOtp] = useState("");
//   const [userData, setUserData] = useState(null);
//   const [timer, setTimer] = useState(0);
//   const inputsRef = useRef([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let interval;
//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [timer]);

//   const generateRandomOtp = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   const handleOtpChange = (e, index) => {
//     const { value } = e.target;
//     if (!/^[0-9]?$/.test(value)) return;

//     const updatedOtp = [...otp];
//     updatedOtp[index] = value;
//     setOtp(updatedOtp);

//     if (value && index < 5) {
//       inputsRef.current[index + 1].focus();
//     } else if (!value && index > 0) {
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   const sendOtp = async () => {
//     const newOtp = generateRandomOtp();
//     setGeneratedOtp(newOtp);

//     try {
//       const response = await axios.post("http://148.135.137.228:5000/send-otp", {
//         email,
//         otp: newOtp,
//       });

//       if (response.data?.message === "OTP sent successfully") {
//         setTimer(30);
//         alert("OTP sent to your email.");
//       } else {
//         alert("Failed to send OTP.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       alert("Failed to send OTP.");
//     }
//   };

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     if (!email) return alert("Please enter your email.");

//     try {
//       const checkRes = await axios.post("http://148.135.137.228:5000/signin", {
//         email,
//       });

//       if (checkRes.data?.email) {
//         await sendOtp();
//         setStep("otp");
//       } else {
//         alert("Email not found. Redirecting to signup...");
//         navigate("/signup");
//       }
//     } catch (error) {
//       console.error("Signin error:", error);
//       alert("Signin failed.");
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     const enteredOtp = otp.join("");

//     if (enteredOtp.length !== 6) return alert("Enter 6-digit OTP.");

//     if (enteredOtp !== generatedOtp) {
//       return alert("Invalid OTP.");
//     }

//     try {
//       const finalRes = await axios.post("http://148.135.137.228:5000/signin", {
//         email,
//       });

//       if (finalRes.data?.email) {
//         setUserData(finalRes.data);
//         localStorage.setItem("user", JSON.stringify(finalRes.data));
//         alert("Sign-in successful!");
//         navigate("/");
//       } else {
//         alert("User data not found.");
//       }
//     } catch (error) {
//       console.error("Final fetch error:", error);
//       alert("Error loading user data.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#fdf5eb] flex items-center justify-center px-4">
   
//       <form
//         onSubmit={step === "email" ? handleSendOtp : handleVerifyOtp}
//         className="bg-[#fdf5eb] shadow-xl p-8 rounded-xl w-full max-w-md space-y-6"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>

//         {step === "email" && (
//           <div>
//             <label className="block text-gray-700 mb-1">Email Address</label>
//             <input
//               type="email"
//               placeholder="example@email.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>
//         )}

//         {step === "otp" && (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-gray-700 mb-2">Enter 6-Digit OTP</label>
//               <div className="flex justify-between space-x-2">
//                 {otp.map((digit, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     maxLength="1"
//                     value={digit}
//                     onChange={(e) => handleOtpChange(e, index)}
//                     ref={(el) => (inputsRef.current[index] = el)}
//                     className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="text-center">
//               <button
//                 type="button"
//                 onClick={sendOtp}
//                 disabled={timer > 0}
//                 className={`text-sm font-semibold ${
//                   timer > 0
//                     ? "text-gray-400 cursor-not-allowed"
//                     : "text-purple-600 hover:underline"
//                 }`}
//               >
//                 {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
//               </button>
//             </div>
//           </div>
//         )}

//         {step !== "success" && (
//           <button
//             type="submit"
//             className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
//           >
//             {step === "email" ? "Send OTP" : "Verify OTP"}
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Signin;




// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";

// const Signin = () => {
//   const [email, setEmail] = useState("");
//   const [step, setStep] = useState("email");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [generatedOtp, setGeneratedOtp] = useState("");
//   const [userData, setUserData] = useState(null);
//   const [timer, setTimer] = useState(0);
//   const inputsRef = useRef([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let interval;
//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [timer]);

//   const generateRandomOtp = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   const handleOtpChange = (e, index) => {
//     const { value } = e.target;
//     if (!/^[0-9]?$/.test(value)) return;

//     const updatedOtp = [...otp];
//     updatedOtp[index] = value;
//     setOtp(updatedOtp);

//     if (value && index < 5) {
//       inputsRef.current[index + 1].focus();
//     } else if (!value && index > 0) {
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   const sendOtp = async () => {
//     const newOtp = generateRandomOtp();
//     setGeneratedOtp(newOtp);

//     try {
//       const response = await axios.post("http://148.135.137.228:5000/send-otp", {
//         email,
//         otp: newOtp,
//       });

//       if (response.data?.message === "OTP sent successfully") {
//         setTimer(30);
//         alert("OTP sent to your email.");
//       } else {
//         alert("Failed to send OTP.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       alert("Failed to send OTP.");
//     }
//   };

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     if (!email) return alert("Please enter your email.");

//     try {
//       const checkRes = await axios.post("http://148.135.137.228:5000/signin", {
//         email,
//       });

//       if (checkRes.data?.email) {
//         await sendOtp();
//         setStep("otp");
//       } else {
//         alert("Email not found. Redirecting to signup...");
//         navigate("/signup");
//       }
//     } catch (error) {
//       console.error("Signin error:", error);
//       alert("Signin failed.");
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     const enteredOtp = otp.join("");

//     if (enteredOtp.length !== 6) return alert("Enter 6-digit OTP.");
//     if (enteredOtp !== generatedOtp) return alert("Invalid OTP.");

//     try {
//       const finalRes = await axios.post("http://148.135.137.228:5000/signin", {
//         email,
//       });

//       if (finalRes.data?.email) {
//         setUserData(finalRes.data);
//         localStorage.setItem("user", JSON.stringify(finalRes.data));
//         alert("Sign-in successful!");
//         navigate("/");
//       } else {
//         alert("User data not found.");
//       }
//     } catch (error) {
//       console.error("Final fetch error:", error);
//       alert("Error loading user data.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#fdf5eb] flex flex-col items-center">
//       {/* Header */}
//       <div className="w-full">
//         <Header />
//       </div>

//       {/* Form Container */}
//       <div className="flex-grow flex items-center justify-center w-full px-4 mt-[-500px]">
//         <form
//           onSubmit={step === "email" ? handleSendOtp : handleVerifyOtp}
//           className="bg-[#fdf5eb] shadow-xl p-8 rounded-xl w-full max-w-md space-y-6 mt-[-100px]"
//         >
//           <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>

//           {step === "email" && (
//             <div>
//               <label className="block text-gray-700 mb-1">Email Address</label>
//               <input
//                 type="email"
//                 placeholder="example@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//               />
//             </div>
//           )}

//           {step === "otp" && (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 mb-2">Enter 6-Digit OTP</label>
//                 <div className="flex justify-between space-x-2">
//                   {otp.map((digit, index) => (
//                     <input
//                       key={index}
//                       type="text"
//                       maxLength="1"
//                       value={digit}
//                       onChange={(e) => handleOtpChange(e, index)}
//                       ref={(el) => (inputsRef.current[index] = el)}
//                       className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="text-center">
//                 <button
//                   type="button"
//                   onClick={sendOtp}
//                   disabled={timer > 0}
//                   className={`text-sm font-semibold ${
//                     timer > 0
//                       ? "text-gray-400 cursor-not-allowed"
//                       : "text-purple-600 hover:underline"
//                   }`}
//                 >
//                   {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
//                 </button>
//               </div>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
//           >
//             {step === "email" ? "Send OTP" : "Verify OTP"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signin;



import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const CHAPTER_NAME = "Chapter 1"; // You can make this dynamic if needed

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const generateRandomOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const sendOtp = async () => {
    const newOtp = generateRandomOtp();
    setGeneratedOtp(newOtp);

    try {
      const response = await axios.post("http://148.135.137.228:5000/send-otp", {
        email,
        otp: newOtp,
      });

      if (response.data?.message === "OTP sent successfully") {
        setTimer(30);
        alert("OTP sent to your email.");
      } else {
        alert("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP.");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email.");

    try {
      const checkRes = await axios.post("http://148.135.137.228:5000/signin", {
        email,
        chapter: CHAPTER_NAME,
        status: false,
      });

      if (checkRes.data?.status === true) {
        await sendOtp();
        setStep("otp");
      } else {
        alert("Email not found or status false. Redirecting to signup...");
        navigate("/signup");
      }
    } catch (error) {
      console.error("Signin error:", error);
      alert("Signin failed.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) return alert("Enter 6-digit OTP.");
    if (enteredOtp !== generatedOtp) return alert("Invalid OTP.");

    try {
      const finalRes = await axios.post("http://148.135.137.228:5000/signin", {
        email,
        chapter: CHAPTER_NAME,
        status: false,
      });

      if (finalRes.data?.status === true) {
        localStorage.setItem("user", JSON.stringify(finalRes.data));
        alert("Sign-in successful!");
        navigate("/");
      } else {
        alert("User not authorized or status false.");
      }
    } catch (error) {
      console.error("Final fetch error:", error);
      alert("Error loading user data.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf5eb] flex flex-col items-center">
      {/* Header */}
      <div className="w-full">
        <Header />
      </div>

      {/* Form Container */}
      <div className="flex-grow flex items-center justify-center w-full px-4 mt-[-500px]">
        <form
          onSubmit={step === "email" ? handleSendOtp : handleVerifyOtp}
          className="bg-[#fdf5eb] shadow-xl p-8 rounded-xl w-full max-w-md space-y-6 mt-[-100px]"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>

          {step === "email" && (
            <div>
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Enter 6-Digit OTP</label>
                <div className="flex justify-between space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      ref={(el) => (inputsRef.current[index] = el)}
                      className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={timer > 0}
                  className={`text-sm font-semibold ${
                    timer > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-purple-600 hover:underline"
                  }`}
                >
                  {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            {step === "email" ? "Send OTP" : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
