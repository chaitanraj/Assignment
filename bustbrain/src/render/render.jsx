import React from 'react'
import RenderQ1 from '../renderQ1/renderQ1'
import RenderQ2 from '../renderQ2/renderQ2'
import RenderQ3 from '../renderQ3/renderQ3'

const render = () => {
  return (
    <div className='bg-gradient-to-br from-amber-100 to-orange-100'>
      <h1 className="text-4xl underline font-bold text-center">Rendered Form</h1>
      <RenderQ1/>
      <RenderQ2/>
      <RenderQ3/>
      </div>
  )
}

export default render
