import { notFound } from 'next/navigation';
import React from 'react'

async function Reviews({params}: {params: {id: string}}) {
  const { id } = await params;

  if(!id){
    return <div>No ID provided</div>
  }
  
  if(parseInt(id) > 10){
    return notFound();
  }
  return (
    <div>Reviews {id}</div>
  )
}

export default Reviews