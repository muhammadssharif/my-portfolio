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
                                Firebase is a comprehensive app development platform that includes a real-time database, authentication, cloud functions, and more. It is a popular choice for building web and mobile applications quickly and efficiently. <br />Firebase's Firestore is a cloud based nosql database I have become proficient in and with.
                            </p>
                        </div>
                    </div>
                    <div className={styles.language}>
                        <Image
                            src={`/images/logos/awslogo.png`}
                            width={150}
                            height={150}
                            alt="AWS Logo"
                        />
                        <div className={styles.languageInfo}>
                            <h2>Learning AWS</h2>
                            <p>
                                Amazon Web Services (AWS) is a secure cloud services platform that offers computing power, database storage, content delivery, and various other functionalities to help businesses scale and grow. It provides a wide range of cloud computing services to meet the needs of organizations of all sizes.
                            </p>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default CloudServices;
