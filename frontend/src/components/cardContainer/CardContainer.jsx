import React from 'react'

const CardContainer = () => {

    return (
        <div className='grid grid-cols-12 gap-2 mt-2'>
            <div className="col-span-3  bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
                <div className="flex justify-around items-center px-4 py-6">
                    <div className="text-center">
                        <h3  className="text-3xl font-semibold text-gray-700 ">27 <span className='block text-xs text-gray-500 mt-1'>Workdays</span></h3>
                    </div>
                    <div className="h-12 w-px bg-gray-300"></div>
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-red-500">5</div>
                        <div className="text-xs text-gray-500 mt-1">Late Login</div>
                    </div>
                </div>
                <div className="bg-blue-500 text-white text-[12px] text-center p-2 font-medium">
                    Current Month Working day Vs Late Login
                </div>
            </div>

            <div className="col-span-3  bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
                <div className="flex justify-around items-center px-4 py-6">
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-gray-700">1</div>
                        <div className="text-xs text-gray-500 mt-1">Applied</div>
                    </div>
                    <div className="h-12 w-px bg-gray-300"></div>
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-red-500">5</div>
                        <div className="text-xs text-gray-500 mt-1">Taken</div>
                    </div>
                </div>
                <div className="bg-blue-500 text-white text-[12px] text-center p-2 font-medium">
                    Current Month Leave Applied Vs Leave Taken
                </div>
            </div>

            <div className="col-span-3  bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
                <div className="flex justify-around items-center px-4 py-6">
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-gray-700">27</div>
                        <div className="text-xs text-gray-500 mt-1">Workdays</div>
                    </div>
                    <div className="h-12 w-px bg-gray-300"></div>
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-red-500">5</div>
                        <div className="text-xs text-gray-500 mt-1">Late Login</div>
                    </div>
                </div>
                <div className="bg-blue-500 text-white text-[12px] text-center p-2 font-medium">
                    Upcoming Public Holidays
                </div>
            </div>
            <div className="col-span-3  bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
                <div className="flex justify-around items-center px-4 py-6">
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-gray-700">7</div>
                        <div className="text-xs text-gray-500 mt-1">PL</div>
                    </div>
                    <div className="h-12 w-px bg-gray-300"></div>
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-red-500">12</div>
                        <div className="text-xs text-gray-500 mt-1">CL</div>
                    </div>
                </div>
                <div className="bg-blue-500 text-white text-[12px] text-center p-2 font-medium">
                    Total Leave Balance
                </div>
            </div>
        </div>
    )
}

export default CardContainer