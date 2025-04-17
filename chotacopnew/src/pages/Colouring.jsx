import React from "react";
import Header from "../components/Header";

function Colouring() {
  return (
    <div className="min-h-screen bg-[#fdf5eb] p-6 relative">
      <Header />

      {/* Colouring Book Links */}
      <div className="mt-[-450px]">
        <div className="flex flex-wrap justify-center gap-10">
          
          {/* Colouring Book 1 */}
          <div>
            <a href="/assets/Colouring-Book-Chota-Cop-1.pdf" download>
                <img
                src="/assets/colouring_sample1.png"
                alt="Colouring Book 1"
                className="h-44 transition-transform hover:scale-105 cursor-pointer"
                />
            </a>
            <p>Colouring-Book 1</p>

          </div>

          {/* Colouring Book 2 */}
          <div>
            <a href="/assets/Colouring-Book-Chota-Cop-2.pdf" download>
                <img
                src="/assets/colouring_sample1.png"
                alt="Colouring Book 2"
                className="h-44 transition-transform hover:scale-105 cursor-pointer"
                />
            </a>
            <p>Colouring-Book 2</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Colouring;
