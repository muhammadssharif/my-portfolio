// components/Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import styles from '../styles/MainNav.module.css';

function MainNav() {
  return (
    <Navbar className={styles.navbar} expand="lg">
      <Navbar.Brand href="/" className={styles['navbar-brand']}>
        My Portfolio
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles['navbar-toggler-icon']} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={`ml-auto ${styles['navbar-nav']}`}>
          <Nav.Link href="/" className={styles['nav-link']}>
            Intro
          </Nav.Link>
          <Nav.Link href="/resume/skills" className={styles['nav-link']}>
            Resumé
          </Nav.Link>
          <Nav.Link href="/contact/email" className={styles['nav-link']}>
            Contact
          </Nav.Link>
          <Nav.Link href="https://github.com/muhammadssharif" target="_blank" rel="noopener noreferrer" className={styles['bigLink']}>
            <FaGithub className={styles.githubIcon} />
          </Nav.Link>
          <Nav.Link href="https://www.linkedin.com/in/muhammad-sharif-bb6774286/" target="_blank" rel="noopener noreferrer" className={styles['bigLink']}>
            <FaLinkedin className={styles.icon} />
          </Nav.Link>
          <Nav.Link href="/contact/email" rel="noopener noreferrer" className={styles['bigLink']}>
            <FaEnvelope className={styles.icon} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNav;
