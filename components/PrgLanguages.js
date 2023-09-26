import React, { useState } from 'react';
import styles from '../styles/PrgLanguages.module.css';
import MainNav from './MainNav';
import TechLogos from './TechLogos';
import Image from 'next/image';

function PrgLanguages() {
  const [isOpen, setIsOpen] = useState(false); // Start with isOpen set to false

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div style={{ paddingTop: '70px' }}>
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
                src={`/images/logos/pylogo.png`} // Generate the image URL dynamically
                width={150} // Set the width of the image as needed
                height={150} // Set the height of the image as needed
                alt="Python Logo"
              />
              <h2>Python</h2>
            </div>
            <div className={styles.language}>
              <Image
                src={`/images/logos/clogo.png`} // Generate the image URL dynamically
                width={150} // Set the width of the image as needed
                height={150} // Set the height of the image as needed
                alt="C++ Logo"
              />
              <h2>C++</h2>
            </div>
            <div className={styles.language}>
              <Image
                src={`/images/logos/jslogo.png`} // Generate the image URL dynamically
                width={150} // Set the width of the image as needed
                height={150} // Set the height of the image as needed
                alt="JavaScript Logo"
              />
              <h2>JavaScript - </h2>
              <p> &nbsp; heyyo</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PrgLanguages;
