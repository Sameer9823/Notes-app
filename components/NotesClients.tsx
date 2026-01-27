'use client'
import React, { useState } from 'react'

function NotesClients() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!title.trim() || !content.trim()) {
            alert('Please fill in all fields')
            return
        }

        setLoading(true)
        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            })
            const data = await response.json()
            console.log(data)
            setLoading(false)
        } catch (error) {
            console.error('Error creating note:', error)
            setLoading(false)
        }
    }




  return (
    <div className='space-y-6'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold text-center'>Create Note</h2>
            <input type="text" placeholder='Title' className='border border-gray-300 rounded-md p-2' value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder='Content' className='border border-gray-300 rounded-md p-2' value={content} onChange={(e) => setContent(e.target.value)} />
            <button type='submit' className='bg-blue-500 text-white rounded-md p-2' disabled={loading}>
                {loading ? 'Saving...' : 'Save Note'}
            </button>
        </form>
    </div>
  )
}

export default NotesClients