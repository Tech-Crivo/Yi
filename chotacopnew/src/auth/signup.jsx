// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [chapter, setChapter] = useState("");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [step, setStep] = useState("email");
//   const [generatedOtp, setGeneratedOtp] = useState("");
//   const inputsRef = useRef([]);
//   const navigate = useNavigate(); // ✅ Initialize useNavigate

//   const handleOtpChange = (e, index) => {
//     const { value } = e.target;
//     if (!/^[0-9]?$/.test(value)) return;

//     const updatedOtp = [...otp];
//     updatedOtp[index] = value;
//     setOtp(updatedOtp);

//     if (value && index < 5) {
//       inputsRef.current[index + 1]?.focus();
//     }
//   };

//   const generateRandomOtp = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   const sendOtp = async (e) => {
//     e.preventDefault();
//     if (!name || !email || !phone || !chapter) {
//       return alert("Please fill in all fields before sending OTP.");
//     }
//     if (!/^[0-9]{10}$/.test(phone)) {
//       return alert("Enter a valid 10-digit phone number.");
//     }

//     try {
//       const checkRes = await axios.post(
//         "http://148.135.137.228:5000/check-email",
//         { email },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (checkRes.data.exists) {
//         return alert("Email is already registered.");
//       }

//       const otpToSend = generateRandomOtp();
//       setGeneratedOtp(otpToSend);
//       console.log("Generated OTP (for dev):", otpToSend); // Debug only

//       const otpRes = await axios.post(
//         "http://148.135.137.228:5000/send-otp",
//         { email, otp: otpToSend },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       console.log("Backend send-otp response:", otpRes.data); // Debug

//       setStep("otp");
//       alert("OTP sent to your email.");
//     } catch (err) {
//       console.error("Error sending OTP:", err);
//       alert("Failed to send OTP: " + (err.response?.data?.detail || err.message));
//     }
//   };

//   const verifyOtp = async (e) => {
//     e.preventDefault();
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length !== 6) return alert("Enter the complete 6-digit OTP");

//     if (enteredOtp !== generatedOtp) {
//       alert("Invalid OTP. Please try again.");
//       setOtp(["", "", "", "", "", ""]);
//       inputsRef.current[0]?.focus();
//       return;
//     }

//     try {
//       await axios.post(
//         "http://148.135.137.228:5000/signup",
//         { name, phone, email, chapter },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       alert("Signup successful!");

//       // Reset form
//       setName("");
//       setPhone("");
//       setChapter("");
//       setEmail("");
//       setOtp(["", "", "", "", "", ""]);
//       setStep("email");
//       setGeneratedOtp("");

//       // ✅ Redirect to Signin page
//       navigate("/signin");
//     } catch (err) {
//       console.error("Signup error:", err);
//       alert("Signup failed: " + (err.response?.data?.detail || err.message));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#fdf5eb] flex items-center justify-center px-4">
//       <form
//         onSubmit={step === "email" ? sendOtp : verifyOtp}
//         className="bg-[#fdf5eb] shadow-xl p-8 rounded-xl w-full max-w-md space-y-6"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

//         {step === "email" && (
//           <>
//             <div>
//               <label className="block text-gray-700 mb-1">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-1">Phone Number</label>
//               <input
//                 type="text"
//                 placeholder="10-digit number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 maxLength={10}
//                 required
//                 className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-1">Chapter Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your chapter"
//                 value={chapter}
//                 onChange={(e) => setChapter(e.target.value)}
//                 required
//                 className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//               />
//             </div>
//           </>
//         )}

//         <div>
//           <label className="block text-gray-700 mb-1">Email Address</label>
//           <input
//             type="email"
//             placeholder="example@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//           />
//         </div>

//         {step === "otp" && (
//           <div>
//             <label className="block text-gray-700 mb-2">Enter 6-Digit OTP</label>
//             <div className="flex justify-between space-x-2">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleOtpChange(e, index)}
//                   ref={(el) => (inputsRef.current[index] = el)}
//                   className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-black"
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
//         >
//           {step === "email" ? "Send OTP" : "Verify OTP & Signup"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;




import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [chapter, setChapter] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState("email");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const generateRandomOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!email || !chapter) {
      return alert("Please fill in all fields before sending OTP.");
    }

    try {
      const checkRes = await axios.post(
        "http://148.135.137.228:5000/check-email",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (checkRes.data.exists) {
        return alert("Email is already registered.");
      }

      const otpToSend = generateRandomOtp();
      setGeneratedOtp(otpToSend);
      console.log("Generated OTP (for dev):", otpToSend);

      const otpRes = await axios.post(
        "http://148.135.137.228:5000/send-otp",
        { email, otp: otpToSend },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Backend send-otp response:", otpRes.data);

      setStep("otp");
      alert("OTP sent to your email.");
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert("Failed to send OTP: " + (err.response?.data?.detail || err.message));
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) return alert("Enter the complete 6-digit OTP");

    if (enteredOtp !== generatedOtp) {
      alert("Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
      return;
    }

    try {
      await axios.post(
        "http://148.135.137.228:5000/signup",
        {
          email,
          chapter,
          status: false
        },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Signup successful!");

      // Reset form
      setChapter("");
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setStep("email");
      setGeneratedOtp("");

      navigate("/signin");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf5eb] flex items-center justify-center px-4">
      <form
        onSubmit={step === "email" ? sendOtp : verifyOtp}
        className="bg-[#fdf5eb] shadow-xl p-8 rounded-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

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

        {step === "email" && (
          <div>
            <label className="block text-gray-700 mb-1">Chapter Name</label>
            <input
              type="text"
              placeholder="Enter your chapter"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        )}

        {step === "otp" && (
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
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          {step === "email" ? "Send OTP" : "Verify OTP & Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
