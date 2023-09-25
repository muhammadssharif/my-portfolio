// components/Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // 
import Link from 'next/link';
import styles from '../styles/MainNav.module.css'; // Import the custom CSS module

function MainNav() {
  return (
    <Navbar className={styles.navbar}>
      <Navbar.Brand href="#home" className={styles['navbar-brand']}>
        My Portfolio
      </Navbar.Brand>
      <Link className={styles.bigLink} href="https://github.com/moeSeneca" target="_blank" rel="noopener noreferrer"><FaGithub className={styles.githubIcon} /></Link>&nbsp;&nbsp;
      <Link className={styles.bigLink} href="https://www.linkedin.com/in/muhammad-sharif-bb6774286/" target="_blank" rel="noopener noreferrer"><FaLinkedin className={styles.icon} /></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
        <Nav className={`ml-auto ${styles['navbar-nav']}`}>
          <Nav.Link href="/" className={styles['nav-link']}>
            Intro
          </Nav.Link>
          <Nav.Link href="/resume/skills" className={styles['nav-link']}>
            Skills
          </Nav.Link>
          <Nav.Link href="#other" className={styles['nav-link']}>
            Other
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNav;
