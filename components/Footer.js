// components/Footer.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // 
import Link from 'next/link';
import styles from '../styles/Footer.module.css'; // Import the custom CSS module

function Footer() {
  return (
    <Navbar className={styles.navbar}>
        <Navbar.Brand className={styles['navbar-brand']}>
          Contact Me: 647-548-5349 - msheheryarsharif@outlook.com
        </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
        <Nav className={`ml-auto ${styles['navbar-nav']}`}>
          <Link className={styles.bigLink} href="https://github.com/moeSeneca" target="_blank" rel="noopener noreferrer"><FaGithub className={styles.githubIcon} /></Link>&nbsp;&nbsp;
          <Link className={styles.bigLink} href="https://www.linkedin.com/in/muhammad-sharif-bb6774286/" target="_blank" rel="noopener noreferrer"><FaLinkedin className={styles.icon} /></Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Nav>
        
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Footer;
