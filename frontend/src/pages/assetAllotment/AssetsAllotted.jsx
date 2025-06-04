import React from 'react'

const AssetsAllotted = () => {
    return (
        <div className='p-2 bg-white mt-3 rounded-md border border-gray-300'>
            <div>
                <table className='min-w-full text-sm text-left border-collapse'>
                    <thead className="text-gray-600 uppercase text-xs border">
                        <tr>
                            <th className="px-4 py-2">Sl no.</th>
                            <th className="px-4 py-2">Asset Type</th>
                            <th className="px-4 py-2">Asset Branch</th>
                            <th className="px-4 py-2">Asset Model</th>
                            <th className="px-4 py-2">Asset Serial No.</th>
                            <th className="px-4 py-2">Allotted By</th>
                            <th className="px-4 py-2">Allotted On</th>
                            <th className="px-4 py-2">Current Status</th>
                            <th className="px-4 py-2">Surrendered To</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default AssetsAllotted