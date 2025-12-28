const DashboardLayout = ({ children }) => {
    return (
        <div className='px-5'>
            <h1 className='text-6xl font-bold gradient-title mb-5'>Dashboard</h1>
            {children}
        </div >
    )
}

export default DashboardLayout
