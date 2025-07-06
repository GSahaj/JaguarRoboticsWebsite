import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Import your images or use public folder paths
import Img1 from '../assets/Team_Picture.JPG';
import Img2 from '../assets/Aura_Black4015.png';
import Img3 from '../assets/Match_2022.png';
import Img4 from '../assets/School_Robot.png';

const images = [Img1, Img2, Img3, Img4];
const teamName = "4015 Jaguar Robotics";

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [slideIn, setSlideIn] = useState(false);

    // Slide in + typing effect on mount
    useEffect(() => {
        setSlideIn(true); // Trigger slide-down animation

        let currentChar = 0;
        const typingInterval = setInterval(() => {
            setDisplayedText(teamName.slice(0, currentChar + 1));
            currentChar++;
            if (currentChar === teamName.length) {
                clearInterval(typingInterval);
            }
        }, 150); // ms per letter

        return () => clearInterval(typingInterval);
    }, []);

    // Auto change every 10 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    const goPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    useEffect(() => {
        const section = document.querySelector('.about-section');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    return (
        <div className="home-screen">
            <div style={{ width: '100%', minHeight: '500px' }}>
                <div className={`gallery-container ${slideIn ? 'slide-in' : ''}`}>
                    <div className="team-name">{displayedText}</div>

                    {/* Buttons container */}
                    <div className="button-group">
                        <Link to="/contact" className="btn-outline">
                            Support Us
                        </Link>
                        <Link to="/aboutus" className="btn-outline">
                            About Us
                        </Link>
                    </div>

                    <div className="image-wrapper">
                        <img
                            src={images[currentIndex]}
                            alt={`Slide ${currentIndex}`}
                            className="gallery-image"
                        />
                        <div className="overlay" />
                    </div>

                    <button className="nav-arrow left-arrow" onClick={goPrev} aria-label="Previous Image">
                        &#10094;
                    </button>
                    <button className="nav-arrow right-arrow" onClick={goNext} aria-label="Next Image">
                        &#10095;
                    </button>
                </div>
            </div>
            <div className="about-container">
                {/* Background pattern with 3-4 rows */}
                <div className="jags-pattern">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="jags-line">
                            {"JAGS ".repeat(20)} {/* Generates 20 "JAGS" per row */}
                        </div>
                    ))}
                </div>

                {/* Your about-section */}
                <div className="about-section">
                    <h2>About Team 4015</h2>
                    <p>This is where you put text.This is where you put text.This is where you put text.This is where you put text.This is where you put text.This is where you put text.This is where you put text.This is where you put text.This is where you put text.This is where you put text.This is where you put text.This is where you put text. </p>
                </div>
            </div>

        </div>
    );
}

export default Home;