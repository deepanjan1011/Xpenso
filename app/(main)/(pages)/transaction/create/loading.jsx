import React from 'react'
import { BarLoader } from "react-spinners";

const Loading = () => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <BarLoader width={"100%"} color="#10b981" />
        </div>
    )
}

export default Loading
