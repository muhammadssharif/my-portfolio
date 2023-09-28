// components/Footer.js
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <div className={styles['footer-contact']}>
          Contact Me: 647-548-4349, msheheryarsharif@outlook.com
        </div>
        <div className={styles['footer-links']}>
          <Link href="https://github.com/muhammadssharif" target="_blank" rel="noopener noreferrer">
            <FaGithub className={styles.githubIcon} />
          </Link>
          <Link href="https://www.linkedin.com/in/muhammad-sharif-bb6774286/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className={styles.icon} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
