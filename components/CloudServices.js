// components/CloudServices.js

import React, { useState } from 'react';
import styles from '../styles/CloudServices.module.css';
import Image from 'next/image';

function CloudServices() {
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
            ? 'url(/images/skillsbgs/sbg6.jpg)'
            : 'url(/images/skillsbgs/sbg6.jpg)',
        }}
      >
        <span className={styles.pLangText}>Cloud Services</span>
      </div>
      {isOpen && (
        <div className={styles.languageContainer}>
          {/* Firebase */}
          <div className={styles.language}>
            <Image
              src={`/images/logos/firebaselogo.png`}
              width={150}
              height={150}
              alt="Firebase Logo"
            />
            <div className={styles.languageContent}>
              <h2 className={styles.languageTitle}>Firebase</h2>
              <div className={styles.languageInfo}>
                <p>
                  Firebase is a comprehensive app development platform that includes a real-time database, authentication, cloud functions, and more. It is a popular choice for building web and mobile applications quickly and efficiently. <br />Firebase&apos;s Firestore is a cloud-based NoSQL database I have become proficient in and with.
                </p>
              </div>
            </div>
          </div>

          {/* Learning AWS */}
          <div className={styles.language}>
            <Image
              src={`/images/logos/awslogo.png`}
              width={150}
              height={150}
              alt="AWS Logo"
            />
            <div className={styles.languageContent}>
              <h2 className={styles.languageTitle}>Learning AWS</h2>
              <div className={styles.languageInfo}>
                <p>
                  Amazon Web Services (AWS) is a secure cloud services platform that offers computing power, database storage, content delivery, and various other functionalities to help businesses scale and grow. It provides a wide range of cloud computing services to meet the needs of organizations of all sizes.
                </p>
              </div>
            </div>
          </div>

          {/* Add more cloud services as needed */}
        </div>
      )}
    </div>
  );
}

export default CloudServices;
