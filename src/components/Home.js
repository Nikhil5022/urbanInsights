import React, { useState, useEffect } from 'react';
import aeroplane from '../assets/aeroplane.mp4';

export default function Home() {
    const [text, setText] = useState('');
    const phrases = [
        'Urban Insights provides a seamless experience to look into popular places and find out the best path to visit them.',
        ' We also provide Hotel and Restaurant booking services with our partners.'
        // Add more phrases as needed
    ];
    const typingDelay = 50;
    const pauseDelay = 2000; // Pause between phrases

    useEffect(() => {
        let currentIndex = 0;
        let currentText = '';
        let isTyping = true;

        const type = () => {
            const currentPhrase = phrases[currentIndex];

            if (isTyping) {
                currentText = currentPhrase.substring(0, currentText.length + 1);
                setText(currentText);

                if (currentText === currentPhrase) {
                    isTyping = false;
                    setTimeout(type, pauseDelay);
                } else {
                    setTimeout(type, typingDelay);
                }
            } else {
                currentText = currentPhrase.substring(0, currentText.length - 1);
                setText(currentText);

                if (currentText === '') {
                    isTyping = true;
                    currentIndex = (currentIndex + 1) % phrases.length;
                    setTimeout(type, typingDelay);
                } else {
                    setTimeout(type, typingDelay);
                }
            }
        };

        type();
    }, []);

    return (
        <div className='relative h-screen'>
            <video autoPlay muted loop className='absolute inset-0 object-cover w-full h-full z-0'>
                <source src={aeroplane} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div className='relative z-10 flex flex-col justify-center items-center h-full text-white text-center text-2xl font-thin uppercase'>
                {text}
            </div>
        </div>
    );
}
