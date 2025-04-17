// import React, { useEffect, useState } from "react";
// import "../pdf-worker";
// import Header from "../components/Header";
// import GeneCert from "../components/GeneCert";

// function ChotaCop() {
//   const [schools, setSchools] = useState([]);
//   const [selectedSchool, setSelectedSchool] = useState("");
//   const [customSchool, setCustomSchool] = useState("");
//   const [chapter, setChapter] = useState("");
//   const [pdfCount, setPdfCount] = useState(0);
//   const [totalPages, setTotalPages] = useState("");
//   const [studentsCount, setStudentsCount] = useState(0);

//   // Fetch schools based on chapter
//   useEffect(() => {
//     if (chapter.trim() === "") {
//       setSchools([]);
//       return;
//     }

//     fetch("http://148.135.137.228:5000/school", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ chapter }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         const loadedSchools = data.schools || [];
//         setSchools([...loadedSchools, "Add School"]);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch schools:", err);
//         setSchools(["Add School"]);
//       });
//   }, [chapter]);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const pdfFiles = files.filter((file) => file.type === "application/pdf");
//     setPdfCount(pdfFiles.length);
//   };

//   const handleAnalyzeClick = () => {
//     alert(`Analyzing ${pdfCount} PDF file(s) with ${totalPages} page(s)...`);
//   };

//   const handleSchoolChange = (e) => {
//     const value = e.target.value;
//     setSelectedSchool(value);
//     if (value !== "Add School") setCustomSchool("");
//   };

//   const handleCustomSchoolSubmit = () => {
//     const trimmedSchool = customSchool.trim();
//     if (
//       trimmedSchool !== "" &&
//       !schools.includes(trimmedSchool) &&
//       chapter.trim() !== ""
//     ) {
//       const updatedSchools = [
//         ...schools.slice(0, -1),
//         trimmedSchool,
//         "Add School",
//       ];
//       setSchools(updatedSchools);
//       setSelectedSchool(trimmedSchool);
//       setCustomSchool("");

//       fetch("http://148.135.137.228:5000/add-school", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: trimmedSchool, chapter }),
//       })
//         .then((res) => res.json())
//         .then((data) => console.log("✅", data.message))
//         .catch((err) => console.error("❌ Error adding school:", err));
//     }
//   };

//   const handleTotalPagesChange = (e) => {
//     const value = e.target.value;
//     if (!isNaN(value) || value === "") {
//       setTotalPages(value);
//     }
//   };

//   const showCertificateBox =
//     pdfCount > 0 &&
//     totalPages.trim() !== "" &&
//     parseInt(totalPages) === studentsCount;

//   return (
//     <div className="min-h-screen bg-[#fdf5eb] relative">
//       <Header />
//       <div className="flex justify-center items-start gap-8 px-6 py-12">
//         <div
//           className={`bg-[#fdf5eb] p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 transition-all duration-500 mt-[-500px] ${
//             showCertificateBox ? "translate-x-[-50px]" : ""
//           }`}
//         >
//           {/* Chapter Field */}
//           <div>
//             <label className="block text-lg font-semibold mb-2">
//               Chapter:
//             </label>
//             <input
//               type="text"
//               value={chapter}
//               onChange={(e) => setChapter(e.target.value)}
//               placeholder="Enter chapter name"
//               className="w-full border border-gray-300 p-3 rounded-lg"
//             />
//           </div>

//           {/* School Selection */}
//           {chapter.trim() !== "" && (
//             <div>
//               <label className="block text-lg font-semibold mb-2">
//                 School Name:
//               </label>
//               <select
//                 value={selectedSchool}
//                 onChange={handleSchoolChange}
//                 className="w-full border border-gray-300 p-3 rounded-lg"
//               >
//                 <option value="">-- Select a school --</option>
//                 {schools.map((school, idx) => (
//                   <option key={idx} value={school}>
//                     {school}
//                   </option>
//                 ))}
//               </select>

//               {selectedSchool === "Add School" && (
//                 <div className="mt-4">
//                   <input
//                     type="text"
//                     value={customSchool}
//                     onChange={(e) => setCustomSchool(e.target.value)}
//                     placeholder="Enter school name"
//                     className="w-full border border-gray-300 p-3 rounded-lg mb-2"
//                   />
//                   <button
//                     onClick={handleCustomSchoolSubmit}
//                     className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
//                   >
//                     Add School
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* PDF Upload */}
//           <div>
//             <input
//               type="number"
//               min="1"
//               value={totalPages}
//               onChange={handleTotalPagesChange}
//               placeholder="Enter total pages"
//               className="w-full mt-2 border border-gray-300 p-3 rounded-lg"
//             />
//             <label className="block text-lg font-semibold mb-2 mt-[10px]">
//               Upload Report Cards (PDF Only):
//             </label>
//             <div className="flex gap-4 items-center flex-wrap">
//               <input
//                 type="file"
//                 multiple
//                 accept="application/pdf"
//                 onChange={handleFileChange}
//                 className="block text-sm text-gray-600
//                   file:mr-4 file:py-2 file:px-4
//                   file:rounded-full file:border-0
//                   file:text-sm file:font-semibold
//                   file:bg-blue-500 file:text-white
//                   hover:file:bg-blue-600"
//               />

//               <button
//                 onClick={handleAnalyzeClick}
//                 className={`mt-2 px-4 py-2 rounded-full font-semibold text-white transition-all ${
//                   pdfCount > 0 && totalPages.trim() !== ""
//                     ? "bg-green-500 hover:bg-green-600"
//                     : "bg-gray-400 cursor-not-allowed"
//                 }`}
//                 disabled={pdfCount === 0 || totalPages.trim() === ""}
//               >
//                 Analyze
//               </button>
//             </div>
//           </div>

//           {pdfCount > 0 && (
//             <div className="text-green-700 font-medium space-y-1">
//               <div>
//                 ✅ {pdfCount} PDF file{pdfCount > 1 ? "s" : ""} uploaded.
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Certificate Generator */}
//         {pdfCount > 0 && (
//           <GeneCert
//             setStudentsCount={setStudentsCount}
//             expectedPages={parseInt(totalPages)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChotaCop;


import React, { useEffect, useState } from "react";
import "../pdf-worker";
import Header from "../components/Header";
import GeneCert from "../components/GeneCert";

function ChotaCop() {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [customSchool, setCustomSchool] = useState("");
  const [chapter, setChapter] = useState("");
  const [pdfFiles, setPdfFiles] = useState([]);
  const [pdfCount, setPdfCount] = useState(0);
  const [totalPages, setTotalPages] = useState("");
  const [studentsCount, setStudentsCount] = useState(0);

  // Fetch schools based on chapter
  useEffect(() => {
    if (chapter.trim() === "") {
      setSchools([]);
      return;
    }

    fetch("http://148.135.137.228:5000/school", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapter }),
    })
      .then((res) => res.json())
      .then((data) => {
        const loadedSchools = data.schools || [];
        setSchools([...loadedSchools, "Add School"]);
      })
      .catch((err) => {
        console.error("Failed to fetch schools:", err);
        setSchools(["Add School"]);
      });
  }, [chapter]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validPDFs = files.filter((file) => file.type === "application/pdf");
    setPdfFiles(validPDFs);
    setPdfCount(validPDFs.length);
  };

  const handleUploadPDFs = async () => {
    if (pdfFiles.length === 0 || totalPages.trim() === "") return;

    const formData = new FormData();
    pdfFiles.forEach((file, index) => {
      formData.append("pdfs", file); // key name is "pdfs"
    });

    try {
      const res = await fetch("http://148.135.137.228:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Upload response:", data);
      alert("PDFs uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload PDFs.");
    }
  };

  const handleAnalyzeClick = () => {
    handleUploadPDFs();
    alert(`Analyzing ${pdfCount} PDF file(s) with ${totalPages} page(s)...`);
  };

  const handleSchoolChange = (e) => {
    const value = e.target.value;
    setSelectedSchool(value);
    if (value !== "Add School") setCustomSchool("");
  };

  const handleCustomSchoolSubmit = () => {
    const trimmedSchool = customSchool.trim();
    if (
      trimmedSchool !== "" &&
      !schools.includes(trimmedSchool) &&
      chapter.trim() !== ""
    ) {
      const updatedSchools = [
        ...schools.slice(0, -1),
        trimmedSchool,
        "Add School",
      ];
      setSchools(updatedSchools);
      setSelectedSchool(trimmedSchool);
      setCustomSchool("");

      fetch("http://148.135.137.228:5000/add-school", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school: trimmedSchool, chapter }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅", data.message))
        .catch((err) => console.error("❌ Error adding school:", err));
    }
  };

  const handleTotalPagesChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === "") {
      setTotalPages(value);
    }
  };

  const showCertificateBox =
    pdfCount > 0 &&
    totalPages.trim() !== "" &&
    parseInt(totalPages) === studentsCount;

  return (
    <div className="min-h-screen bg-[#fdf5eb] relative">
      <Header />
      <div className="flex justify-center items-start gap-8 px-6 py-12">
        <div
          className={`bg-[#fdf5eb] p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 transition-all duration-500 mt-[-500px] ml-[250px] ${
            showCertificateBox ? "translate-x-[-50px]" : ""
          }`}
        >
          {/* Chapter Field */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Chapter:
            </label>
            <input
              type="text"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="Enter chapter name"
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
          </div>

          {/* School Selection */}
          {chapter.trim() !== "" && (
            <div>
              <label className="block text-lg font-semibold mb-2">
                School Name:
              </label>
              <select
                value={selectedSchool}
                onChange={handleSchoolChange}
                className="w-full border border-gray-300 p-3 rounded-lg"
              >
                <option value="">-- Select a school --</option>
                {schools.map((school, idx) => (
                  <option key={idx} value={school}>
                    {school}
                  </option>
                ))}
              </select>

              {selectedSchool === "Add School" && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={customSchool}
                    onChange={(e) => setCustomSchool(e.target.value)}
                    placeholder="Enter school name"
                    className="w-full border border-gray-300 p-3 rounded-lg mb-2"
                  />
                  <button
                    onClick={handleCustomSchoolSubmit}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    Add School
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PDF Upload */}
          <div>
            <input
              type="number"
              min="1"
              value={totalPages}
              onChange={handleTotalPagesChange}
              placeholder="Enter total pages"
              className="w-full mt-2 border border-gray-300 p-3 rounded-lg"
            />
            <label className="block text-lg font-semibold mb-2 mt-[10px]">
              Upload Report Cards (PDF Only):
            </label>
            <div className="flex gap-4 items-center flex-wrap">
              <input
                type="file"
                multiple
                accept="application/pdf"
                onChange={handleFileChange}
                className="block text-sm text-gray-600
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-500 file:text-white
                  hover:file:bg-blue-600"
              />

              <button
                onClick={handleAnalyzeClick}
                className={`mt-2 px-4 py-2 rounded-full font-semibold text-white transition-all ${
                  pdfCount > 0 && totalPages.trim() !== ""
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={pdfCount === 0 || totalPages.trim() === ""}
              >
                Analyze
              </button>
            </div>
          </div>

          {pdfCount > 0 && (
            <div className="text-green-700 font-medium space-y-1">
              <div>
                ✅ {pdfCount} PDF file{pdfCount > 1 ? "s" : ""} uploaded.
              </div>
            </div>
          )}
        </div>

        {/* Certificate Generator */}
        {pdfCount > 0 && (
          <GeneCert
            setStudentsCount={setStudentsCount}
            expectedPages={parseInt(totalPages)}
          />
        )}
      </div>
    </div>
  );
}

export default ChotaCop;


// import React, { useEffect, useState } from "react";
// import "../pdf-worker";
// import Header from "../components/Header";
// import GeneCert from "../components/GeneCert";

// function ChotaCop() {
//   const [schools, setSchools] = useState([]);
//   const [selectedSchool, setSelectedSchool] = useState("");
//   const [customSchool, setCustomSchool] = useState("");
//   const [chapter, setChapter] = useState("");
//   const [pdfFiles, setPdfFiles] = useState([]);
//   const [pdfCount, setPdfCount] = useState(0);
//   const [totalPages, setTotalPages] = useState("");
//   const [studentsCount, setStudentsCount] = useState(0);
//   const [analyzeClicked, setAnalyzeClicked] = useState(false);

//   useEffect(() => {
//     if (chapter.trim() === "") {
//       setSchools([]);
//       return;
//     }

//     fetch("http://148.135.137.228:5000/school", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ chapter }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         const loadedSchools = data.schools || [];
//         setSchools([...loadedSchools, "Add School"]);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch schools:", err);
//         setSchools(["Add School"]);
//       });
//   }, [chapter]);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const validPDFs = files.filter((file) => file.type === "application/pdf");
//     setPdfFiles(validPDFs);
//     setPdfCount(validPDFs.length);
//   };

//   const handleUploadPDFs = async () => {
//     if (pdfFiles.length === 0 || totalPages.trim() === "") return;

//     const formData = new FormData();
//     pdfFiles.forEach((file) => {
//       formData.append("pdfs", file);
//     });

//     try {
//       const res = await fetch("http://148.135.137.228:5000/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       console.log("Upload response:", data);
//       alert("PDFs uploaded successfully!");
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Failed to upload PDFs.");
//     }
//   };

//   const handleAnalyzeClick = async () => {
//     if (pdfCount === 0 || totalPages.trim() === "") return;

//     await handleUploadPDFs();
//     setAnalyzeClicked(true);
//     alert(`Analyzing ${pdfCount} PDF file(s) with ${totalPages} page(s)...`);
//   };

//   const handleSchoolChange = (e) => {
//     const value = e.target.value;
//     setSelectedSchool(value);
//     if (value !== "Add School") setCustomSchool("");
//   };

//   const handleCustomSchoolSubmit = () => {
//     const trimmedSchool = customSchool.trim();
//     if (
//       trimmedSchool !== "" &&
//       !schools.includes(trimmedSchool) &&
//       chapter.trim() !== ""
//     ) {
//       const updatedSchools = [
//         ...schools.slice(0, -1),
//         trimmedSchool,
//         "Add School",
//       ];
//       setSchools(updatedSchools);
//       setSelectedSchool(trimmedSchool);
//       setCustomSchool("");

//       fetch("http://148.135.137.228:5000/add-school", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ school: trimmedSchool, chapter }),
//       })
//         .then((res) => res.json())
//         .then((data) => console.log("✅", data.message))
//         .catch((err) => console.error("❌ Error adding school:", err));
//     }
//   };

//   const handleTotalPagesChange = (e) => {
//     const value = e.target.value;
//     if (!isNaN(value) || value === "") {
//       setTotalPages(value);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#fdf5eb] relative">
//       <Header />
//       <div className="flex justify-center items-start gap-8 px-6 py-12 mt-[-560px] ml-[250px]">
//         <div
//           className={`bg-[#fdf5eb] p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 transition-all duration-500 ${
//             analyzeClicked ? "mt-0" : "mt-[-500px]"
//           }`}
//         >
//           {/* Chapter Field */}
//           <div>
//             <label className="block text-lg font-semibold mb-2">
//               Chapter:
//             </label>
//             <input
//               type="text"
//               value={chapter}
//               onChange={(e) => setChapter(e.target.value)}
//               placeholder="Enter chapter name"
//               className="w-full border border-gray-300 p-3 rounded-lg"
//             />
//           </div>

//           {/* School Selection */}
//           {chapter.trim() !== "" && (
//             <div>
//               <label className="block text-lg font-semibold mb-2">
//                 School Name:
//               </label>
//               <select
//                 value={selectedSchool}
//                 onChange={handleSchoolChange}
//                 className="w-full border border-gray-300 p-3 rounded-lg"
//               >
//                 <option value="">-- Select a school --</option>
//                 {schools.map((school, idx) => (
//                   <option key={idx} value={school}>
//                     {school}
//                   </option>
//                 ))}
//               </select>

//               {selectedSchool === "Add School" && (
//                 <div className="mt-4">
//                   <input
//                     type="text"
//                     value={customSchool}
//                     onChange={(e) => setCustomSchool(e.target.value)}
//                     placeholder="Enter school name"
//                     className="w-full border border-gray-300 p-3 rounded-lg mb-2"
//                   />
//                   <button
//                     onClick={handleCustomSchoolSubmit}
//                     className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
//                   >
//                     Add School
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* PDF Upload */}
//           <div>
//             <input
//               type="number"
//               min="1"
//               value={totalPages}
//               onChange={handleTotalPagesChange}
//               placeholder="Enter total pages"
//               className="w-full mt-2 border border-gray-300 p-3 rounded-lg"
//             />
//             <label className="block text-lg font-semibold mb-2 mt-[10px]">
//               Upload Report Cards (PDF Only):
//             </label>
//             <div className="flex gap-4 items-center flex-wrap">
//               <input
//                 type="file"
//                 multiple
//                 accept="application/pdf"
//                 onChange={handleFileChange}
//                 className="block text-sm text-gray-600
//                   file:mr-4 file:py-2 file:px-4
//                   file:rounded-full file:border-0
//                   file:text-sm file:font-semibold
//                   file:bg-blue-500 file:text-white
//                   hover:file:bg-blue-600"
//               />

//               <button
//                 onClick={handleAnalyzeClick}
//                 className={`mt-2 px-4 py-2 rounded-full font-semibold text-white transition-all ${
//                   pdfCount > 0 && totalPages.trim() !== ""
//                     ? "bg-green-500 hover:bg-green-600"
//                     : "bg-gray-400 cursor-not-allowed"
//                 }`}
//                 disabled={pdfCount === 0 || totalPages.trim() === ""}
//               >
//                 Analyze
//               </button>
//             </div>
//           </div>

//           {pdfCount > 0 && (
//             <div className="text-green-700 font-medium space-y-1">
//               <div>
//                 ✅ {pdfCount} PDF file{pdfCount > 1 ? "s" : ""} uploaded.
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Certificate Generator */}
//         {analyzeClicked && pdfCount > 0 && totalPages.trim() !== "" && (
//           <GeneCert
//             setStudentsCount={setStudentsCount}
//             expectedPages={parseInt(totalPages)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChotaCop;
