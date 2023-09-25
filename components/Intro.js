// components/Intro.js
import React from 'react';
import styles from '../styles/Intro.module.css';
import { Button } from 'react-bootstrap'; // Import the Card component
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // 
import MainNav from './MainNav';
import TechLogos from './TechLogos';
import Link from 'next/link';
import Footer from './Footer';


export default function Intro() {
    return (
        <>
            <MainNav />
            <div className={styles.introContainer}>
                <TechLogos />
                <div className={styles.titlesContainer}>
                    <h1 className={styles.titleSD}>Software Developer</h1>
                </div>
                <div className={styles.backgroundImage}>
                    <img
                        src='/images/bg7.png'
                        alt='Background'
                        className={styles.backgroundImg}
                    />
                </div>
                <img
                    src='/images/me2.png'
                    alt='Me'
                    className={styles.overlayImg}
                />
                <div className={styles.nameContainer}>
                    <h1 className={styles.name}>Muhammad</h1>
                    <h1 className={styles.name}>Sheheryar Sharif</h1>
                </div>
                <Link className={styles.githubLink} href="https://github.com/moeSeneca" target="_blank" rel="noopener noreferrer"><FaGithub className={styles.githubIcon} /></Link>
                <Link className={styles.linkedinLink} href="https://www.linkedin.com/in/muhammad-sharif-bb6774286/" target="_blank" rel="noopener noreferrer"><FaLinkedin className={styles.icon} /></Link>
                <Link className={styles.skillsLink} href="/resume/skills" rel="noopener noreferrer"><Button variant="outline-primary" style={{ fontSize: '50px', padding: '16px 32px' }}>Resumé</Button></Link>
            </div>
            <Footer />
        </>
    );
}