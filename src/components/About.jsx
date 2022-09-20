import React from 'react'

const About = () => {
  return (
    <div class = 'flex flex-col items-center min-h-screen'>
        {/* <div class = 'text-4xl font-bold mt-5 md:mb-5 '> */}
        <h1 class="text-3xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight mt-5 animate-fade-in-down">
            Meet The Team
        </h1>
        <div class = 'flex flex-col text-2xl mt-5 md:flex-row md:space-x-6'>
            <div>
                Jeff
            </div>
            <div>
                Blah blah blah
            </div>
        </div>
        <div class = 'flex flex-col text-2xl mt-5 md:flex-row md:space-x-6'>
            <div>
                Seth
            </div>
            <div>
                Blah blah blah
            </div>
        </div>
    </div>
  )
}

export default About