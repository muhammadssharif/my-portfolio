import React from 'react'
import MainNav from './MainNav'
import EmailForm from './EmailForm'
import Footer from './Footer'
import styles from '@/styles/Contact.module.css'


export default function Contact() {
    return (
        <>
            <MainNav />
            <h1 className={styles.hOne}>Contact Me</h1>
            <EmailForm />
            <Footer />
        </>
    )
}
