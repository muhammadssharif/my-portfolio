import React, { useState } from 'react';
import styles from '../styles/Databases.module.css';
import Image from 'next/image';

function Databases() {
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
            ? 'url(/images/skillsbgs/sbg1.jpg)'
            : 'url(/images/skillsbgs/sbg1.jpg)',
        }}
      >
        <span className={styles.pLangText}>Databases</span>
      </div>
      {isOpen && (
        <div className={styles.languageContainer}>
          <div className={styles.language}>
            <Image
              src={`/images/logos/mongodblogo.png`}
              width={150}
              height={150}
              alt="MongoDB Logo"
            />
            <div className={styles.languageInfo}>
              <h2>MongoDB</h2>
              <p>
                MongoDB is a NoSQL database that provides flexibility and scalability for storing and managing data. It is widely used for applications that require handling large volumes of data with complex structures.
              </p>
            </div>
          </div>
          <div className={styles.language}>
            <Image
              src={`/images/logos/firebaselogo.png`}
              width={150}
              height={150}
              alt="Firebase Logo"
            />
            <div className={styles.languageInfo}>
              <h2>Firebase</h2>
              <p>
                Firebase is a comprehensive app development platform that includes a real-time database, authentication, cloud functions, and more. It is a popular choice for building web and mobile applications quickly and efficiently.
              </p>
            </div>
          </div>
          <div className={styles.language}>
            <Image
              src={`/images/logos/sqllogo.png`}
              width={150}
              height={150}
              alt="SQL Logo"
            />
            <div className={styles.languageInfo}>
              <h2>SQL</h2>
              <p>
                SQL (Structured Query Language) is a standard language for managing and manipulating relational databases. It is essential for tasks like querying, updating, and managing data in traditional relational database systems.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Databases;
