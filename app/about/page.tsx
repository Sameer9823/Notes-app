import React from 'react'
import Navigation from '../components/Navigation'

const AboutPage = () => {
  return (
    <>
    <div className="bg-gradient-to-r from-cyan-800 to-blue-900 min-h-screen text-white">
        <Navigation />
    <div className="container mx-auto p-4">

        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-2">Welcome to our Notes App! This application is designed to help you easily create, manage, and organize your notes.</p>
        <p className="mb-2">Our mission is to provide a simple and efficient platform for note-taking, ensuring that your important information is always at your fingertips.</p>
        <p className="mb-2">Whether you're jotting down ideas, making to-do lists, or keeping track of important tasks, our app is here to support your productivity.</p>
        <p className="mb-2">Thank you for choosing our Notes App. We hope it enhances your note-taking experience!</p>

    </div>
    </div>
    </>
  )
}

export default AboutPage