


// import React, { useState } from 'react'
// import { assets } from '../../assets/assets'
// import { useNavigate } from 'react-router-dom'

// const SearchBar = ({ data }) => {
//   const navigate = useNavigate()
//   const [input, setInput] = useState(data ? data : '')

//   const onSearchHandler = (e) => {
//     e.preventDefault()
//     navigate('/course-list/' + input)
//   }

//   return (
//     <>
//       <style>
//         {`
//           .search-input::placeholder {
//             color: #22c55e; /* Tailwind green-500 */
//             opacity: 1;
//           }
//         `}
//       </style>

//       <form
//         onSubmit={onSearchHandler}
//         className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-green-400 rounded"
//       >
//         <img
//           className="md:w-auto w-10 px-3"
//           src={assets.search_icon_green}
//           alt="search_icon"
//         />
//         <input
//           onChange={(e) => setInput(e.target.value)}
//           value={input}
//           type="text"
//           className="search-input w-full h-full outline-none text-gray-700 text-[16px]"
//           placeholder="Search for courses"
//         />
//         <button
//           type="submit"
//           className="bg-green-500 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1"
//         >
//           Search
//         </button>
//       </form>
//     </>
//   )
// }

// export default SearchBar



import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ data }) => {
  const navigate = useNavigate()
  const [input, setInput] = useState(data ? data : '')

  const onSearchHandler = (e) => {
    e.preventDefault()
    navigate('/course-list/' + input)
  }

  return (
    <>
      <style>
        {`
          .search-input::placeholder {
            color: #22c55e; /* Tailwind green-500 */
            opacity: 1;
          }
        `}
      </style>

      <form
        onSubmit={onSearchHandler}
        className="w-full max-w-xl flex items-center bg-white border border-green-400 rounded h-12 md:h-14 px-2"
      >
        <img
          className="w-6 md:w-8 px-2"
          src={assets.search_icon_green}
          alt="search_icon"
        />
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="search-input w-full h-full outline-none text-gray-700 text-sm md:text-base px-2"
          placeholder="Search for courses"
        />
        <button
          type="submit"
          className="bg-green-500 text-white text-sm md:text-base rounded md:px-6 px-4 md:py-2 py-1 mx-1"
        >
          Search
        </button>
      </form>
    </>
  )
}

export default SearchBar
