import React from 'react';
import styles from '../styles/AboutMe.module.css';

function AboutMe() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Me</h1>
      <div className={styles.content}>
        <p>
          I am a highly skilled and motivated Full Stack Developer with a strong background in web development and a passion for creating innovative solutions. I have a proven track record of successfully designing and developing responsive websites for small businesses, enhancing user experiences, and streamlining business processes.
        </p>
        <p>
          My expertise lies in front-end and back-end development, utilizing technologies such as JavaScript, React.js, and Firebase to create visually appealing and user-friendly interfaces. I excel in managing projects from concept to deployment, ensuring optimal performance and security through manual testing and debugging.
        </p>
        <p>
          With a diverse skill set that includes programming languages, cloud services, web development frameworks, and project management tools, I am well-equipped to drive results in any software development role.
        </p>
      </div>
    </div>
  );
}

export default AboutMe;
