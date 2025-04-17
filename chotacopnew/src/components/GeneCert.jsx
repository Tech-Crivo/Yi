// import React, { useState } from "react";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import * as XLSX from "xlsx";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";

// const GenerateCertificate = () => {
//   const [excelFile, setExcelFile] = useState(null);
//   const [students, setStudents] = useState([]);

//   const handleExcelChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.name.endsWith(".xlsx")) {
//       const reader = new FileReader();
//       reader.onload = (evt) => {
//         const data = new Uint8Array(evt.target.result);
//         const workbook = XLSX.read(data, { type: "array" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(sheet);
//         setStudents(jsonData);
//       };
//       reader.readAsArrayBuffer(file);
//       setExcelFile(file);
//     } else {
//       alert("Please upload a valid Excel (.xlsx) file.");
//     }
//   };

//   const generateCertificates = async () => {
//     const zip = new JSZip();

//     for (let i = 0; i < students.length; i++) {
//       const { Name, School, Class } = students[i];

//       const tempDiv = document.createElement("div");
//       tempDiv.className =
//         "relative w-[1123px] h-[794px] bg-white shadow-lg border rounded-lg overflow-hidden";
//       tempDiv.innerHTML = `
//         <img src="/assets/Chota Cop Certificate.png" 
//              alt="Certificate" 
//              class="w-full h-full object-cover"/>
        
//         <div class="absolute top-[388px] left-[345px] text-xl font-bold text-black">${Name}</div>
//         <div class="absolute top-[458px] left-[340px] text-xs font-bold text-black">${School}</div>
//         <div class="absolute top-[448px] left-[750px] text-xl font-bold text-black">${Class}</div>
//       `;

//       document.body.appendChild(tempDiv);

//       const canvas = await html2canvas(tempDiv, { scale: 3 });
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("landscape", "mm", "a4");
//       const imgWidth = 297;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//       const pdfBlob = pdf.output("blob");

//       zip.file(`Certificate_${Name}.pdf`, pdfBlob);

//       document.body.removeChild(tempDiv);
//     }

//     // Generate zip and download
//     zip.generateAsync({ type: "blob" }).then((content) => {
//       saveAs(content, "Certificates.zip");
//       alert("🎉 All certificates generated and zipped successfully!");
//     });
//   };

//   return (
//     <div className="bg-[#fdf5eb] p-8 rounded-xl shadow-lg w-full max-w-xl mx-auto space-y-6 mt-[-400px]">
//       <div className="text-xl font-semibold text-gray-800 mb-2">
//         Generate Certificates
//       </div>

//       <input
//         type="file"
//         accept=".xlsx"
//         onChange={handleExcelChange}
//         className="block w-full text-sm text-gray-600
//           file:mr-4 file:py-2 file:px-4
//           file:rounded-full file:border-0
//           file:text-sm file:font-semibold
//           file:bg-purple-500 file:text-white
//           hover:file:bg-purple-600"
//       />

//       {students.length > 0 && (
//         <div className="text-green-700 text-sm">
//           ✅ {students.length} student{students.length > 1 ? "s" : ""} loaded from Excel.
//         </div>
//       )}

//       <div className="flex justify-end">
//         <button
//           onClick={generateCertificates}
//           disabled={!excelFile || students.length === 0}
//           className={`px-4 py-2 rounded-full font-semibold text-white transition-all ${
//             excelFile && students.length > 0
//               ? "bg-indigo-500 hover:bg-indigo-600"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           Generate Certificates
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GenerateCertificate;



import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const REQUIRED_FIELDS = ["Name", "School", "Class"];

const GenerateCertificate = ({ setStudentsCount, expectedPages }) => {
  const [excelFile, setExcelFile] = useState(null);
  const [students, setStudents] = useState([]);

  const handleExcelChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".xlsx")) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        if (jsonData.length === 0) {
          alert("The Excel sheet is empty.");
          return;
        }

        const firstRow = jsonData[0];
        const isValidFormat = REQUIRED_FIELDS.every((field) =>
          Object.keys(firstRow).includes(field)
        );

        if (!isValidFormat) {
          alert("❌ Excel sheet format is incorrect. Required columns: Name, School, Class.");
          setStudents([]);
          setExcelFile(null);
          setStudentsCount(0);
          return;
        }

        setStudents(jsonData);
        setStudentsCount(jsonData.length);
        setExcelFile(file);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a valid Excel (.xlsx) file.");
    }
  };

  const generateCertificates = async () => {
    if (students.length !== expectedPages) {
      alert(`❌ Page count (${expectedPages}) and student count (${students.length}) do not match.`);
      return;
    }

    const zip = new JSZip();

    for (let i = 0; i < students.length; i++) {
      const { Name, School, Class } = students[i];

      const tempDiv = document.createElement("div");
      tempDiv.className =
        "relative w-[1123px] h-[794px] bg-white shadow-lg border rounded-lg overflow-hidden";
      tempDiv.innerHTML = `
        <img src="/assets/Chota Cop Certificate.png" 
             alt="Certificate" 
             class="w-full h-full object-cover"/>
        <div class="absolute top-[388px] left-[345px] text-xl font-bold text-black">${Name}</div>
        <div class="absolute top-[458px] left-[340px] text-xs font-bold text-black">${School}</div>
        <div class="absolute top-[448px] left-[750px] text-xl font-bold text-black">${Class}</div>
      `;

      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, { scale: 3 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      const pdfBlob = pdf.output("blob");

      zip.file(`Certificate_${Name}.pdf`, pdfBlob);
      document.body.removeChild(tempDiv);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "Certificates.zip");
      alert("🎉 All certificates generated and downloaded as ZIP!");
    });
  };

  return (
    <div className="bg-[#fdf5eb] p-10 rounded-2xl shadow-xl w-[420px] max-w-5xl h-[320px] mx-auto space-y-6 mt-[-496px] ml-[100px]  mt-[-200px]">
      <div className="text-xl font-semibold text-gray-800 mb-2">Generate Certificates</div>

      <input
        type="file"
        accept=".xlsx"
        onChange={handleExcelChange}
        className="block w-full text-sm text-gray-600
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-purple-500 file:text-white
          hover:file:bg-purple-600"
      />

      {students.length > 0 && (
        <div className="text-green-700 text-sm">
          ✅ {students.length} student{students.length > 1 ? "s" : ""} loaded from Excel.
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={generateCertificates}
          disabled={!excelFile || students.length === 0}
          className={`px-4 py-2 rounded-full font-semibold text-white transition-all w-full ${
            excelFile && students.length > 0
              ? "bg-indigo-500 hover:bg-indigo-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Generate Certificates
        </button>
      </div>
    </div>
  );
};

export default GenerateCertificate;




// import React, { useState } from "react";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import * as XLSX from "xlsx";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";

// const REQUIRED_FIELDS = ["Name", "School", "Class"];

// const GenerateCertificate = ({ setStudentsCount, expectedPages }) => {
//   const [excelFile, setExcelFile] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [email, setEmail] = useState("");
//   const [zipBlob, setZipBlob] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleExcelChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.name.endsWith(".xlsx")) {
//       const reader = new FileReader();
//       reader.onload = (evt) => {
//         const data = new Uint8Array(evt.target.result);
//         const workbook = XLSX.read(data, { type: "array" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(sheet);

//         if (jsonData.length === 0) {
//           alert("The Excel sheet is empty.");
//           return;
//         }

//         const firstRow = jsonData[0];
//         const isValidFormat = REQUIRED_FIELDS.every((field) =>
//           Object.keys(firstRow).includes(field)
//         );

//         if (!isValidFormat) {
//           alert("❌ Excel sheet format is incorrect. Required columns: Name, School, Class.");
//           setStudents([]);
//           setExcelFile(null);
//           setStudentsCount(0);
//           return;
//         }

//         setStudents(jsonData);
//         setStudentsCount(jsonData.length);
//         setExcelFile(file);
//         setZipBlob(null); // Reset ZIP on new file upload
//       };
//       reader.readAsArrayBuffer(file);
//     } else {
//       alert("Please upload a valid Excel (.xlsx) file.");
//     }
//   };

//   const generateCertificates = async () => {
//     if (students.length !== expectedPages) {
//       alert(`❌ Page count (${expectedPages}) and student count (${students.length}) do not match.`);
//       return;
//     }

//     setIsGenerating(true);
//     const zip = new JSZip();

//     for (let i = 0; i < students.length; i++) {
//       const { Name, School, Class } = students[i];

//       const tempDiv = document.createElement("div");
//       tempDiv.className =
//         "relative w-[1123px] h-[794px] bg-white shadow-lg border rounded-lg overflow-hidden";
//       tempDiv.innerHTML = `
//         <img src="/assets/Chota Cop Certificate.png" 
//              alt="Certificate" 
//              class="w-full h-full object-cover"/>
//         <div class="absolute top-[388px] left-[345px] text-xl font-bold text-black">${Name}</div>
//         <div class="absolute top-[458px] left-[340px] text-xs font-bold text-black">${School}</div>
//         <div class="absolute top-[448px] left-[750px] text-xl font-bold text-black">${Class}</div>
//       `;

//       document.body.appendChild(tempDiv);

//       const canvas = await html2canvas(tempDiv, { scale: 3 });
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("landscape", "mm", "a4");
//       const imgWidth = 297;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//       const pdfBlob = pdf.output("blob");

//       zip.file(`Certificate_${Name}.pdf`, pdfBlob);
//       document.body.removeChild(tempDiv);
//     }

//     zip.generateAsync({ type: "blob" }).then((content) => {
//       setZipBlob(content);
//       alert("🎉 Certificates generated successfully!");
//       setIsGenerating(false);
//     });
//   };

//   const downloadCertificates = () => {
//     if (zipBlob) {
//       saveAs(zipBlob, "Certificates.zip");
//     }
//   };

//   const emailCertificates = async () => {
//     if (!email) {
//       alert("Please enter a valid email address.");
//       return;
//     }

//     if (!zipBlob) {
//       alert("Please generate certificates first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", zipBlob, "Certificates.zip");
//     formData.append("email", email);

//     try {
//       const response = await fetch("http://148.135.137.228:5000/send-pdf", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Email sending failed.");
//       }

//       alert("📧 Certificates sent successfully to the email!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error sending certificates via email.");
//     }
//   };

//   return (
//     <div className="bg-[#fdf5eb] p-10 rounded-2xl shadow-xl w-[420px] max-w-5xl h-auto mx-auto space-y-6 mt-[-200px] ml-[100px]">
//       <div className="text-xl font-semibold text-gray-800 mb-2">Generate Certificates</div>

//       <input
//         type="file"
//         accept=".xlsx"
//         onChange={handleExcelChange}
//         className="block w-full text-sm text-gray-600
//           file:mr-4 file:py-2 file:px-4
//           file:rounded-full file:border-0
//           file:text-sm file:font-semibold
//           file:bg-purple-500 file:text-white
//           hover:file:bg-purple-600"
//       />

//       {students.length > 0 && (
//         <div className="text-green-700 text-sm">
//           ✅ {students.length} student{students.length > 1 ? "s" : ""} loaded from Excel.
//         </div>
//       )}

//       <button
//         onClick={generateCertificates}
//         disabled={!excelFile || students.length === 0 || isGenerating}
//         className={`px-4 py-2 rounded-full font-semibold text-white transition-all w-full ${
//           excelFile && students.length > 0 && !isGenerating
//             ? "bg-indigo-500 hover:bg-indigo-600"
//             : "bg-gray-400 cursor-not-allowed"
//         }`}
//       >
//         {isGenerating ? "Generating..." : "Generate Certificates"}
//       </button>

//       {zipBlob && (
//         <>
//           <button
//             onClick={downloadCertificates}
//             className="px-4 py-2 rounded-full font-semibold text-white transition-all w-full bg-blue-600 hover:bg-blue-700"
//           >
//             📥 Download All Certificates (ZIP)
//           </button>

//           <input
//             type="email"
//             placeholder="Enter recipient email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded-full text-sm text-gray-700"
//           />

//           <button
//             onClick={emailCertificates}
//             disabled={!email}
//             className={`px-4 py-2 rounded-full font-semibold text-white transition-all w-full ${
//               email ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
//             }`}
//           >
//             📧 Email All Certificates
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default GenerateCertificate;
