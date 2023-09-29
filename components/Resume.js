import React from 'react';
import styles from '../styles/Resume.module.css'
import Link from 'next/link';
import MainNav from './MainNav';
import Footer from './Footer';
import PrgLanguages from './PrgLanguages';
import WebDev from './WebDev';
import CloudServices from './CloudServices';
import Databases from './Databases';
import Tools from './Tools';
import AboutMe from './AboutMe';
function Resume() {

  const handleScrollToPrgLanguages = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
    });
};

  return (
    <>
      <MainNav />
      <div className={styles.resumeContainer}>
        <div className={styles.resumeFormal}>
          <div className={styles.headerDiv}>
            <header>
              <h1>Muhammad Sheheryar Sharif</h1>
              <p>msheheryarsharif@outlook.com</p>
              <p>
                <Link className={styles.githubLink} href="https://github.com/muhammadssharif" target="_blank" rel="noopener noreferrer">https://github.com/muhammadssharif</Link>
                <br />
                <Link className={styles.linkedinLink} href="https://www.linkedin.com/in/muhammad-sharif-bb6774286/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/muhammad-sharif-bb6774286/</Link>
              </p>
            </header>
          </div>
          <section className={styles.skills}>
            <h2 onClick={handleScrollToPrgLanguages}>SKILLS</h2>
            <ul>
              <li><b>Programming Languages:</b> JavaScript, Python, C++, TypeScript, C</li>
              <li><b>Cloud Services:</b> Google Firebase</li>
              <li><b>Web Development:</b> Next.js, React.js, Node.js, Express, Bootstrap, HTML, CSS</li>
              <li><b>Database:</b> Firestore, MongoDB, MySQL </li>
              <li><b>Project Management:</b> Jira</li>
              <li><b>Version Control:</b> Git</li>
              <li><b>Operating Systems:</b> Unix, Windows</li>
              <li><b>Design Tools:</b> Figma, Adobe Photoshop</li>
            </ul>
          </section>
          <section className={styles.experience}>
            <h2>EXPERIENCE</h2>
            <div className={styles.experienceEntry}>
              <h3>Full Stack Developer | Zam Zam Bags and Boutique | February 2023 - May 2023</h3>
              <p>
                • Designed and developed a responsive website using JavaScript, React.js, and Firebase for a local small business.
                <br />
                • Implemented advanced front-end and back-end functionality to enhance user experience and optimize business processes.
                <br />
                • Created a visually appealing and user-friendly interface by using HTML, CSS, Bootstrap, and React.js.
              </p>
            </div>
          </section>
          <section className={styles.projects}>
            <h2>PROJECTS</h2>
            <div className={styles.project}>
              <h3>Full Stack Developer | Zam Zam Bags and Boutique</h3>
              <p>
                <Link href="https://www.zamzambandb.com/" target="_blank" rel="noopener noreferrer">
                  https://www.zamzambandb.com/
                </Link>
              </p>
              <p>February 2023 - May 2023</p>
              <ul>
                <li>Designed and developed a responsive website using JavaScript, React.js, and Firebase for a local small business.</li>
                <li>Implemented advanced front-end and back-end functionality to enhance user experience and optimize business processes.</li>
                <li>Created a visually appealing and user-friendly interface by using HTML, CSS, Bootstrap, and React.js.</li>
                <li>Created an application that manages real-time data and user authentication using Firebase.</li>
                <li>Conducted manual testing and debugging to ensure the website's performance and security.</li>
                <li>Managed the entire project, from initial concept to deployment, and worked with a team.</li>
              </ul>
            </div>
          </section>
          <section className={styles.certifications}>
            <h2>CERTIFICATIONS</h2>
            <div className={styles.certificationEntry}>
              <h3>Responsive Web Development | freeCodeCamp | 2023</h3>
            </div>
          </section>
          <section className={styles.education}>
            <h2>EDUCATION</h2>
            <div className={styles.educationEntry}>
              <h3>Honours Bachelor of Technology – Software Development (BSD) | Seneca Polytechnic, Toronto, ON | 2025</h3>
            </div>
          </section>
        </div>
        <div className={styles.resumeSpecial}>
          <PrgLanguages />
          <WebDev />
          <Databases />
          <CloudServices />
          <Tools />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Resume;
