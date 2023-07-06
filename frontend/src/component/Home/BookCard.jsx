import React from 'react'
import { Link } from 'react-router-dom'
const BookCard = ({book}) => {
  return (
    <Link className='bookCard' to={book._id}>
        {/* component */}
<div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
  <img className="h-48 w-full object-cover object-center" src={book.photos[0].url} alt="BookImage" />
  <div className="p-4">
    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{book.name}</h2>
    <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{book.description}</p>
    <div className="flex items-center mt-[15px]">
      <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">{book.price}</p>
      {/* <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p> */}
      <p className="ml-auto text-base font-medium text-green-500">{book.category}</p>
    </div>
  </div>
</div>
    </Link>
  )
}

export default BookCard