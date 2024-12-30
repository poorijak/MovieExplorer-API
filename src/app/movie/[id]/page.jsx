import React from 'react'

export default async function page({ params }) {
const { id } = await params


  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}
