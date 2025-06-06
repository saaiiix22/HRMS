import React from 'react'

const AssetsAllotted = () => {
    return (
        <div className='p-2 bg-white mt-3 rounded-md border border-gray-300'>
            <div>
                <table className='min-w-full text-sm text-left border-collapse'>
                    <thead className="text-gray-600 uppercase text-xs border">
                        <tr>
                            <th className="px-4 py-2 border border-solid">Sl no.</th>
                            <th className="px-4 py-2 border border-solid">Asset Type</th>
                            <th className="px-4 py-2 border border-solid">Asset Branch</th>
                            <th className="px-4 py-2 border border-solid">Asset Model</th>
                            <th className="px-4 py-2 border border-solid">Asset Serial No.</th>
                            <th className="px-4 py-2 border border-solid">Allotted By</th>
                            <th className="px-4 py-2 border border-solid">Allotted On</th>
                            <th className="px-4 py-2 border border-solid">Current Status</th>
                            <th className="px-4 py-2 border border-solid">Surrendered To</th>
                            <th className="px-4 py-2 border border-solid">Action</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default AssetsAllotted