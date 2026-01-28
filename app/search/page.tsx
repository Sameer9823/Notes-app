'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react'

function Search() {
    const searchParams = useSearchParams();
    
  return (
    <div className="p-4">
        <h1>Search: {searchParams.get('q')} : {searchParams.get('category')}</h1>
        <p>{searchParams.get('q')}</p>
        <p>{searchParams.get('category')}</p>

    </div>
  )
}

export default Search