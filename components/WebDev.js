import React, { useState } from 'react';
import styles from '../styles/WebDev.module.css';
import Image from 'next/image';

function WebDev() {
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
            ? 'url(/images/skillsbgs/sbg3.png)'
            : 'url(/images/skillsbgs/sbg3.png)',
        }}
      >
        <span className={styles.pLangText}>Web-Dev Frameworks & Libraries</span>
      </div>
      {isOpen && (
        <div className={styles.languageContainer}>
            <div className={styles.language}>
            <Image
              src={`/images/logos/nextjslogo.png`}
              width={150}
              height={150}
              alt="Next.js Logo"
            />
            <div className={styles.languageInfo}>
              <h2>Next.js</h2>
              <p>
                Next.js is a popular React framework for building server-rendered React applications. It provides a smooth development experience with features like server-side rendering, routing, and automatic code splitting.
              </p>
            </div>
          </div>
          <div className={styles.language}>
            <Image
              src={`/images/logos/reactjslogo.png`}
              width={150}
              height={150}
              alt="React.js Logo"
            />
            <div className={styles.languageInfo}>
              <h2>React.js</h2>
              <p>
                React.js is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of developers. React allows you to create reusable UI components and build dynamic web applications.
              </p>
            </div>
          </div>
          <div className={styles.language}>
            <Image
              src={`/images/logos/nodejslogo.png`}
              width={150}
              height={150}
              alt="Node.js Logo"
            />
            <div className={styles.languageInfo}>
              <h2>Node.js</h2>
              <p>
                Node.js is a JavaScript runtime that allows you to run JavaScript on the server. It is known for its non-blocking I/O and event-driven architecture, making it ideal for building scalable and real-time applications.
              </p>
            </div>
          </div>
          <div className={styles.language}>
            <Image
              src={`/images/logos/expressjslogo.png`}
              width={150}
              height={150}
              alt="Express.js Logo"
            />
            <div className={styles.languageInfo}>
              <h2>Express.js</h2>
              <p>
                Express.js is a minimal and flexible Node.js web application framework. It provides a robust set of features for building web and mobile applications, including routing, middleware support, and template engines.
              </p>
            </div>
          </div>
          <div className={styles.language}>
            <Image
              src={`/images/logos/bootstraplogo.png`}
              width={150}
              height={150}
              alt="Bootstrap Logo"
            />
            <div className={styles.languageInfo}>
              <h2>Bootstrap</h2>
              <p>
                Bootstrap is a popular front-end framework for building responsive and mobile-first websites. It includes pre-designed UI components and a grid system to streamline web development.
              </p>
            </div>
          </div>
          <div className={styles.language}>
            <Image
              src={`/images/logos/htmllogo.png`}
              width={150}
              height={150}
              alt="HTML Logo"
            />
            <div className={styles.languageInfo}>
              <h2>HTML</h2>
              <p>
                HTML (Hypertext Markup Language) is the standard markup language for creating web pages. It provides the structure and content of a web page and is essential for web development.
              </p>
            </div>
          </div>
          <div className={styles.language}>
            <Image
              src={`/images/logos/csslogo.png`}
              width={150}
              height={150}
              alt="CSS Logo"
            />
            <div className={styles.languageInfo}>
              <h2>CSS</h2>
              <p>
                CSS (Cascading Style Sheets) is used for styling web pages. It defines the layout, colors, and visual aspects of a web page, allowing you to create attractive and responsive designs.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WebDev;
