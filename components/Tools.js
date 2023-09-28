// components/Tools.js

import React, { useState } from 'react';
import styles from '../styles/Tools.module.css';
import Image from 'next/image';

function Tools() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.pLangDiv} ${isOpen ? styles.pLangOpen : styles.pLangClosed}`}
        onClick={toggleContent}
        style={{
          backgroundImage: isOpen
            ? 'url(/images/skillsbgs/sbg7.jpg)'
            : 'url(/images/skillsbgs/sbg7.jpg)',
        }}
      >
        <span className={styles.pLangText}>Other Tools</span>
      </div>
      {isOpen && (
        <div className={styles.languageContainer}>
          <div className={styles.language}>
            <Image
              src={`/images/logos/jiralogo.png`}
              width={150}
              height={150}
              alt="Jira Logo"
            />
            <div className={styles.languageContent}>
              <h2 className={styles.languageTitle}>Jira</h2>
              <div className={styles.languageInfo}>
                <p>
                  Jira is a widely used issue and project tracking tool developed by Atlassian. It provides features for bug tracking, issue tracking, and project management. Jira is commonly used by software development and IT teams to streamline their workflow.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.language}>
            <Image
              src={`/images/logos/githublogo.png`}
              width={150}
              height={150}
              alt="GitHub Logo"
            />
            <div className={styles.languageContent}>
              <h2 className={styles.languageTitle}>GitHub</h2>
              <div className={styles.languageInfo}>
                <p>
                  GitHub is a web-based platform for version control and collaboration. It provides tools for code management, collaboration, and project management. GitHub is widely used by developers to host and share code repositories.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.language}>
            <Image
              src={`/images/logos/figmalogo.png`}
              width={150}
              height={150}
              alt="Figma Logo"
            />
            <div className={styles.languageContent}>
              <h2 className={styles.languageTitle}>Figma</h2>
              <div className={styles.languageInfo}>
                <p>
                  Figma is a cloud-based design and prototyping tool that allows designers to collaborate in real-time. It is known for its user-friendly interface and is commonly used for creating user interfaces, web designs, and interactive prototypes.
                </p>
              </div>
            </div>
          </div>
          {/* Linux */}
          <div className={styles.language}>
            <Image
              src={`/images/logos/linuxlogo.png`}
              width={150}
              height={150}
              alt="Linux Logo"
            />
            <div className={styles.languageContent}>
              <h2 className={styles.languageTitle}>Linux</h2>
              <div className={styles.languageInfo}>
                <p>
                  Linux is an open-source operating system kernel that serves as the foundation for various Linux distributions. It is known for its stability, security, and flexibility. Linux is widely used in servers, embedded systems, and desktop computers.
                </p>
              </div>
            </div>
          </div>
          {/* Windows */}
          <div className={styles.language}>
            <Image
              src={`/images/logos/windowslogo.png`}
              width={150}
              height={150}
              alt="Windows Logo"
            />
            <div className={styles.languageContent}>
              <h2 className={styles.languageTitle}>Windows</h2>
              <div className={styles.languageInfo}>
                <p>
                  Microsoft Windows is a popular operating system for personal computers. It is known for its graphical user interface and compatibility with a wide range of software applications. Windows is widely used in the desktop and laptop computer market.
                </p>
              </div>
            </div>
          </div>
          {/* Photoshop */}
          <div className={styles.language}>
            <Image
              src={`/images/logos/pslogo.png`}
              width={150}
              height={150}
              alt="Photoshop Logo"
            />
            <div className={styles.languageContent}>
              <h2 className={styles.languageTitle}>Photoshop</h2>
              <div className={styles.languageInfo}>
                <p>
                  Adobe Photoshop is a powerful graphics editing software used for image editing, photo retouching, and graphic design. It offers a wide range of tools and features for manipulating and enhancing digital images.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tools;
