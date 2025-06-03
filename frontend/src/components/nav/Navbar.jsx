import React, { useEffect, useState } from 'react'
import bulbIcon from '../../assets/bulbIcon.png'
import { PiDotsSixVerticalBold } from "react-icons/pi";
import idCard from '../../assets/idCard.png'
import { useDispatch, useSelector } from 'react-redux';
import getData from '../../actions/getUserDetailsaction';

const Navbar = () => {
    const selectUser = useSelector((state) => state.userDetails.userDetails);
    // console.log(selectUser);
    const {displayName} = selectUser?.empDesignation?.roleMstObj ??{}
    // console.log(displayName);
    
    
    const user = selectUser?.user ?? {};
    const { employeeName} = user;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getData());
    }, []);
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };

        updateTime(); 
        const interval = setInterval(updateTime, 60000); 
        return () => clearInterval(interval);
    }, []);

    const today = new Date()
    

    return (
        <div className='p-2 border-[1px] border-solid border-[#ccc] rounded-lg bg-white'>
            <div className="grid md:grid-cols-12">
                <div className="col-span-9">
                    <h3 className="font-semibold">
                        <span className="text-slate-500"> {today.getHours()>12?'Good Morning,':'Good Afternoon,'}</span> {employeeName}!
                    </h3>

                    <div className="flex items-center flex-wrap">
                        <div className="mt-4 grid grid-cols-12 border-[1px] border-solid border-[#ccc] rounded-lg items-center gap-4 w-5/6">
                            <div className="col-span-3 flex items-center justify-center gap-2 p-2">
                                <img src={bulbIcon} alt="Reminder" className="w-6 h-6" />
                                <h3 className="font-semibold text-sm">REMINDER</h3>
                            </div>

                            <div className="col-span-6 flex items-center border-r-[1px] border-[#ccc] p-2">
                                <PiDotsSixVerticalBold className="text-slate-400 text-[24px] mr-2" />
                                <h3 className="font-semibold text-[#0b97d9] text-sm">
                                    Integration of Fund Management Project
                                </h3>
                            </div>

                            <div className="col-span-3 h-full rounded-md p-2 flex gap-5">
                                {/* You can add content here if needed */}
                                <button className='text-[#0DB74B] text-[13px]'>Mark as Complete</button>
                                <button className='text-red-600 text-[13px]'>Dismiss</button>
                            </div>

                        </div>


                    </div>
                </div>

                <div className="col-span-3 flex items-center gap-3">
                    <div >
                        <img src={idCard} alt="" />
                    </div>
                    <div className='flex items-center gap-1 border-r-2 border-solid border-[#ccc]' >
                        <h2 className='text-[12px]'>Current Role
                            <span className='block text-[16px] font-semibold text-[#0B97D9]'>{displayName}</span>
                        </h2>
                        {/* <img src={calendar} alt="" className='h-9 w-9' /> */}
                    </div>
                    <div className='text-start w-[100px]'>
                        <h3 className='font-semibold text-[14px]'>
                            {today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()}
                        </h3>
                        <span className='bg-blue-500 text-white px-3 rounded-lg text-[11px] mt-2 py-1 '>{time}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar