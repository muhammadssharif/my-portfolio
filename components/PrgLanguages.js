import React, { useState } from 'react';
import styles from '../styles/PrgLanguages.module.css';
import Image from 'next/image';

function PrgLanguages() {
  const [isOpen, setIsOpen] = useState(false); // Start with isOpen set to false

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
            ? 'url(/images/skillsbgs/sbg1.jpg)'
            : 'url(/images/skillsbgs/sbg1.jpg)',
        }}
      >
        <span className={styles.pLangText}>Programming Languages</span>
      </div>
      {isOpen && (
        <div className={styles.languageContainer}>
          <div className={styles.language}>
            <Image
              src={`/images/logos/jslogo.png`} // Generate the image URL dynamically
              width={150} // Set the width of the image as needed
              height={150} // Set the height of the image as needed
              alt="JavaScript Logo"
            />
            <div className={styles.languageInfo}>
              <h2>JavaScript</h2>
              <p>
                JavaScript is a dynamic scripting language primarily used for web development. It allows developers to create interactive and responsive web applications.<br/> JavaScript is essential for client-side scripting and can be used with popular web frameworks like React.js and Angular to build modern web interfaces.
              </p>
            </div>
          </div>
          <div className={styles.language}>
            <Image
              src={`/images/logos/pylogo.png`} // Generate the image URL dynamically
              width={150} // Set the width of the image as needed
              height={150} // Set the height of the image as needed
              alt="Python Logo"
            />
            <div className={styles.languageInfo}>
              <h2>Python</h2>
              <p>
                Python is a versatile and high-level programming language known for its simplicity and readability. It excels in a wide range of applications, from web development to data analysis and artificial intelligence.<br/> Python's extensive library ecosystem and clean syntax make it a popular choice for developers.
              </p>
            </div>
          </div>
          <div className={styles.language}>
            <Image
              src={`/images/logos/clogo.png`} // Generate the image URL dynamically
              width={150} // Set the width of the image as needed
              height={150} // Set the height of the image as needed
              alt="C++ Logo"
            />
            <div className={styles.languageInfo}>
              <h2>C++</h2>
              <p>
                C++ is a powerful and widely-used programming language that combines both high-level and low-level features. It is commonly used for system-level programming, game development, and performance-critical applications.<br/> C++ offers strong support for object-oriented programming and is known for its speed and efficiency.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrgLanguages;
