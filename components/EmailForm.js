import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '@/styles/EmailForm.module.css'

const EmailForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();
      setStatus(data.message);
      if (response.ok) {
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch (error) {
      setStatus('Failed to send email. Please try again later.');
    }
  };

  return (
    <div className={styles.formWrapper}>
      <br />
      <h2 className={styles.contactHeading}>Send Me An Email !</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <br />
          <input type="text" value={name} className={styles.inputField} onChange={(e) => setName(e.target.value)} placeholder='Please Put In Your First and Last Name' required />
        </label>
        <br />
        <label>
          Email:
          <br />
          <input type="email" value={email} className={styles.inputField} onChange={(e) => setEmail(e.target.value)} placeholder='Please Put In Your Contact Email' required />
        </label>
        <br />
        <label>
          Subject:
          <br />
          <input type="text" value={subject} className={styles.inputField} onChange={(e) => setSubject(e.target.value)} placeholder='Please Put In The Subject Of Your Request' required />
        </label>
        <br />
        <label>
          Message:
          <br />
          <textarea value={message} className={styles.textareaField} onChange={(e) => setMessage(e.target.value)} placeholder='Please Put In Your Message' required />
        </label>
        <br />
        <br />
        <Button className={styles.submitButton} variant="outline-light" size='lg' type="submit">Send Message</Button>
      </form>
      <br />
      {status && <p><br />{status}</p>}
      <br />
      <h2 className={styles.contactFooting}>or <u>Call 647-548-5349</u></h2>
      <br />
      <br />
    </div>
  );
};

export default EmailForm;
