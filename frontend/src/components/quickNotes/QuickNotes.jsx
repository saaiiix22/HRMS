import React from 'react'

const QuickNotes = () => {
  return (
    <div className='p-3 bg-white shadow-lg rounded-lg'>
        <h3 className='text-[18px] font-[500]'>Quick Notes</h3>
        <form action="">
            <textarea name="" id="" placeholder='To make quick notes, type here...' className='w-full border-[1px] border-solid border-[#e7e4e4] p-2 mt-2 h-44 rounded-sm'></textarea>
        </form>
    </div>
  )
}

export default QuickNotes