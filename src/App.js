import './App.css';
import HRCard from './HRCard';
import React, { useState, useEffect } from 'react';
import bgImage from './bgg.jpg';

function App() {
  const [appliedList, setAppliedList] = useState([false, false, false]);
  const [showFinale, setShowFinale] = useState(false);

  // const messages = [
  //   "Welcome Candidate",
  //   "Hey Mahammad! Super opportunity!",
  //   "Internship, Just need basic HTML, CSS!"
  // ];
  const hrData = [
    { name: "HR Aleksandra", message: "We just need someone who can open VS Code." },
    { name: "HR Ola", message: "Can you add margin with CSS? You’re in!" },
    { name: "HR Anna", message: "Just basic HTML is fine, like... do you know what a div is?" }
  ];

  useEffect(() => {
    if (appliedList.every((status) => status)) {
      const timeout = setTimeout(() => {
        setShowFinale(true);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [appliedList]);

  const handleApply = (index) => {
    const updated = [...appliedList];
    updated[index] = true;
    setAppliedList(updated);
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex gap-6 flex-wrap justify-center">
        {!showFinale && hrData.map((hr, i) => (
          <HRCard
            key={i}
            name = {hr.name}
            initialMessage={hr.message}
            onApply={() => handleApply(i)}
          />
        ))}
        {showFinale && (
          <div
            className="absolute inset-0 bg-cover bg-center animate-zoom"
            style={{
              backgroundImage: `url(${bgImage})`,
              zIndex: 50
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default App;
