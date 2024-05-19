import React from 'react'

function page() {
  return ( 
    <div className='ExpenseCard mt-6'>
      {[1,2,3,4,5,6,7].map((item , index)=>(
        <div className="  min-h-fit rounded-xl shadow-xl p-8  "> 
        <div className="border-b-2 border-dotted border-slate-300 pb-2">
            <div className="font-bold text-2xl">Expenses</div>
        </div>
        <div className="flex justify-between " key={index}>
        <b>Category</b>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minima numquam itaque, blanditiis eum harum. Molestias quaerat, magni pariatur nesciunt eveniet cupiditate officiis, quos iste ab veniam culpa earum et.</span>
    </div>
    </div>
      ))}
    </div>
  )
}

export default page