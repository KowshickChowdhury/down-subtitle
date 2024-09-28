import React, {useState} from 'react'

const Contact = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropDown = () => {
        setIsOpen(!isOpen);
    }
    
  return (
    <div className='max-w-7xl mx-auto dark:text-white'>
      <div className='border dark:border-slate-600 dark:bg-[#161616] bg-white p-4 rounded my-4'>
        <div>
            <h2 className='font-bold text-xl my-2'>If you report an error, please specify additional data:</h2>
            <p>- Address of the page (URL) from where you try to download the subtitles.</p>
            <p>- Links or messages displayed by our website.</p>
        </div>
        <div className='flex justify-between border-b py-4'>
            <div className='font-semibold grid items-center'>489 Comments</div>
            <div>
                <button
                    id="dropdownDefaultButton"
                    onClick={handleDropDown}
                    className="dark:text-white focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                >
                    Login
                    <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                    </svg>
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div
                    id="dropdown"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-28 dark:bg-gray-700 absolute"
                    >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Google
                        </a>
                        </li>
                        <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Facebook
                        </a>
                        </li>
                        <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Twitter
                        </a>
                        </li>
                    </ul>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Contact