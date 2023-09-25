import React, { useState } from 'react';
import styles from '../styles/PrgLanguages.module.css';
import MainNav from './MainNav';

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
        <div>
          {/* Content you want to display when the component is open */}
          <p>This is the content that opens up on click.</p>
        </div>
      )}
    </div>
    </>
  );
}

export default PrgLanguages;
