import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import Img1 from '../assets/Team_Picture.png';
import Img2 from '../assets/Aura_Black4015.png';
import Img3 from '../assets/Match_2022.png';
import Img4 from '../assets/School_Robot.png';
import Img5 from '../assets/2022moving.png';
import Img6 from '../assets/backstage.png';
import Img7 from '../assets/drivecontrol.png';
import Img8 from '../assets/jasonpic.png';
import Img9 from '../assets/mantis.png';
import Img10 from '../assets/teampeople.png';
import Img12 from '../assets/teampit2.png';
import Img13 from '../assets/buildingrobot.png';

const images = [Img1, Img2, Img3, Img4];
const teamName = "4015 Jaguar Robotics";

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [slideIn, setSlideIn] = useState(false);

    useEffect(() => {
        setSlideIn(true);
        let currentChar = 0;
        const typingInterval = setInterval(() => {
            setDisplayedText(teamName.slice(0, currentChar + 1));
            currentChar++;
            if (currentChar === teamName.length) clearInterval(typingInterval);
        }, 150);
        return () => clearInterval(typingInterval);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    const goPrev = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

    useEffect(() => {
        const section = document.querySelector('.about-section');
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            }),
            { threshold: 0.3 }
        );
        if (section) observer.observe(section);
        return () => { if (section) observer.unobserve(section); };
    }, []);

    const [modalImage, setModalImage] = useState<string | null>(null);
    const galleryImages = [
        { id: 1, src: Img5, alt: "2022 Moving Robot" },
        { id: 2, src: Img6, alt: "Backstage Preparation" },
        { id: 3, src: Img7, alt: "Drive Control Station" },
        { id: 4, src: Img8, alt: "Team Member Jason" },
        { id: 5, src: Img9, alt: "Mantis Robot" },
        { id: 6, src: Img10, alt: "Team Working Together" },
        { id: 7, src: Img12, alt: "Pit Crew Working" },
        { id: 8, src: Img13, alt: "Building Robot" }
    ];

    const openModal = (imgSrc: string) => {
        setModalImage(imgSrc);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalImage(null);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && modalImage) closeModal();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalImage]);

    return (
        <div className="home-screen">
            {/* Hero Slideshow */}
            <div style={{ width: '100%', minHeight: '500px' }}>
                <div className={`gallery-container ${slideIn ? 'slide-in' : ''}`}>
                    <div className="team-name">{displayedText}</div>

                    <div className="button-group">
                        <Link to="/contact" className="btn-outline">Support Us</Link>
                        <Link to="/aboutus" className="btn-outline">About Us</Link>
                    </div>

                    <div className="image-wrapper">
                        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="gallery-image" />
                        <div className="overlay" />
                    </div>

                    <button className="nav-arrow left-arrow" onClick={goPrev} aria-label="Previous Image">&#10094;</button>
                    <button className="nav-arrow right-arrow" onClick={goNext} aria-label="Next Image">&#10095;</button>
                </div>
            </div>

            <div className="about-container">
                <Link to="/aboutus" className="floating-button about-button">
                    More About Us
                </Link>

                <div className="jags-pattern">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="jags-line">{"JAGS ".repeat(20)}</div>
                    ))}
                </div>

                <div className="about-section">
                    <h2>About Team 4015</h2>
                    <p>This is where you put text about your team.This is where you put text about your team.This is where you put text about your team.This is where you put text about your team.This is where you put text about your team.This is where you put text about your team.This is where you put text about your team.</p>
                </div>
            </div>

            <div className="gallery-section">
                <Link to="/gallery" className="floating-button gallery-button">
                    Gallery
                </Link>

                <div className="image-grid">
                    {galleryImages.map((image) => (
                        <div key={image.id} className="grid-item" onClick={() => openModal(image.src)}>
                            <img src={image.src} alt={image.alt} loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>

            {modalImage && (
                <div className="image-modal" onClick={closeModal}>
                    <img src={modalImage} alt="Expanded view" onClick={e => e.stopPropagation()} />
                </div>
            )}
        </div>
    );
}

export default Home;