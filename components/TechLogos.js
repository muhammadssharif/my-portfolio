import React from 'react';
import Image from 'next/image'; // Import the next/image component
import styles from '../styles/TechLogos.module.css';

export default function TechLogos() {
  // List of logos with corresponding class names
  const logos = [
    { name: 'clogo', alt: 'Logo 1' },
    { name: 'jslogo', alt: 'Logo 2' },
    { name: 'pylogo', alt: 'Logo 3' },
    { name: 'reactjslogo', alt: 'Logo 4' },
    { name: 'nextjslogo', alt: 'Logo 5' },
    { name: 'nodejslogo', alt: 'Logo 6' },
    { name: 'expressjslogo', alt: 'Logo 7' },
    { name: 'pslogo', alt: 'Logo 8' },
    { name: 'mongodblogo', alt: 'Logo 9' },
    { name: 'firebaselogo', alt: 'Logo 10' },
    { name: 'jiralogo', alt: 'Logo 11' },
    // Add more logos as needed
  ];

  return (
    <>
      {logos.map((logo, index) => (
        <Image
          key={index}
          className={styles[logo.name]} // Use the logo name as the class name
          src={`/images/logos/${logo.name}.png`} // Generate the image URL dynamically
          alt={logo.alt}
          width={150} // Set the width of the image as needed
          height={150} // Set the height of the image as needed
        />
      ))}
    </>
  );
}
