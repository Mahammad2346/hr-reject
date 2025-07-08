import React, { useEffect, useState } from 'react';
import './index.css';
import hrPhoto from './images/hr-1.jpg';
import { motion, positionalKeys } from 'framer-motion';

function HRCard({ initialMessage, onApply, name }) {
    const [hovering, setHovering] = useState(false);
    const [hoverMessageIndex, setHoverMessageIndex] = useState(0);

    const rejectMessages = [
        "Unfortunately, you were not selected.",
        "Your profile wasn't a match.",
        "Bóbr language skills were necessary for this position. Regrettably, you don't meet this requirement.",
        "We're moving forward with other candidates."

    ]


    const [isApplied, setIsApplied] = useState(false);
    const [message, setMessage] = useState(initialMessage);
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [speed, setSpeed] = useState(1.8);


    const handleMouseEnter = () => {

        const randomIndex = Math.floor(Math.random() * rejectMessages.length);
        const newMsg = rejectMessages[randomIndex];
        if (newMsg !== message) {
            setMessage(newMsg);
        }
        setSpeed(0.1);
        setPosition(getRandomPosition());
        setTimeout(() => {
            setSpeed(1.8);
        }, 300);
    }
    const handleMouseLeave = () => {
        setHovering(false);
    }
    const getRandomPosition = () => {
        const CARD_WIDTH = 360;
        const CARD_HEIGHT = 160;
        const MARGIN = 10;

        const maxX = window.innerWidth - CARD_WIDTH - MARGIN;
        const maxY = window.innerHeight - CARD_HEIGHT - MARGIN;

        const x = Math.floor(Math.random() * maxX);
        const y = Math.floor(Math.random() * maxY);

        return { x, y };
    }
    const handleApply = () => {

        setIsApplied(true);
        onApply();
        setTimeout(() => {
            setMessage("We'll get back to you!");
        }, 500);
    };

    useEffect(() => {
        if (!isApplied) return;

        const interval = setInterval(() => {
            const newPos = getRandomPosition();
            setPosition(newPos);
        }, 1800);

        return () => clearInterval(interval);
    }, [isApplied]);

    const CardContent = (
        <>
            <div className='w-1/3 bg-gray-100 flex items-center justify-center'>
                <img className='object-cover w-16 h-16 rounded-full' src={hrPhoto} alt="HR" />
            </div>
            <div className='w-2/3 flex flex-col justify-between p-3'>
                <div className='text-lg font-bold text-gray-800'>{name}</div>
                <motion.div
                    key={message}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}

                    className={`text-sm italic transition-all duration-300 
                        ${isApplied ? "flex-grow flex items-center justify-center" : ""}
                        ${rejectMessages.includes(message) ? "text-red-600 text-xl font-bold text-center" : "text-gray-500"}`}
                >
                    {hovering ? rejectMessages[hoverMessageIndex] : message}
                </motion.div>
                {!isApplied && (

                    <button
                        onClick={handleApply}
                        className='mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded'
                    >
                        Apply
                    </button>
                )}
            </div>
        </>
    );

    return (
        isApplied ? (
            <motion.div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className='absolute flex bg-white rounded-xl shadow-lg w-[360px] h-[160px] overflow-hidden'
                style={
                    {
                        position: "absolute"
                    }
                }
                animate={{
                    left: position.x,
                    top: position.y
                }}
                transition={{
                    duration: 1.8,
                    ease: "linear"
                }}
            >
                {CardContent}
            </motion.div>
        ) : (
            <div className='flex bg-white rounded-xl shadow-lg w-[360px] h-[160px] overflow-hidden'>
                {CardContent}
            </div>
        )
    );
}

export default HRCard;
