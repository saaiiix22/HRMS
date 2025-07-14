import React, { useEffect } from 'react'
import profileImg from '../../assets/profile.png'
import profileBg from '../../assets/profileBg.png'
import { MdEdit } from "react-icons/md";
import { PiTreeViewLight } from "react-icons/pi";
import { CiMobile1 } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa";
import { FaFingerprint } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineBloodtype } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import getData from '../../actions/getUserDetailsaction';
import { useNavigate } from 'react-router-dom';

const IntroCard = () => {
    const selectUser = useSelector((state) => state.userDetails.userDetails);
    // console.log(selectUser);
    
    const user = selectUser?.user ?? {};
    const userDept = selectUser?.empDesignation?.deptMstObj ?? {};
    // const userDept = selectUser?
    const { employeeName, employeeCode,panNo,officeEmail, mobileNo, aadharNo, bloodGroupId } = user;
    const {departmentName} = userDept
    // console.log(departmentName);
    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getData());
    }, []);
    return (
        <div>
            <div className='p-9 bg-[#0B97D9] flex justify-around items-center relative rounded-t-md gap-3' style={{ backgroundImage: `url(${profileBg})` }}>
                <img src={profileImg} alt="" width={'120'} className='bg-slate-100 rounded-full' />
                <h2 className='text-[25px] text-white font-semibold'>{employeeName}
                    <span className='block text-[12px]'>{employeeCode}</span>
                </h2>
                <button className='absolute top-2 right-6 px-4 py-1 bg-yellow-500 text-[14px] rounded-md flex items-center gap-1' onClick={()=>{navigate('/employeedetails')}}><MdEdit /> Edit</button>
            </div>
            <div className="p-4 bg-white shadow-md rounded-b-md">
                <table >
                    <tbody>
                        <tr>

                            <th className='tableItemsHead'><PiTreeViewLight /> Department</th>
                            <td className='w-7'>:</td>
                            <td className='text-[14px]'>{departmentName}</td>

                        </tr>
                        <tr>
                            <th className='tableItemsHead'><CiMobile1 />Mobile No.</th>
                            <td className='w-7'>:</td>
                            <td className='text-[14px]'>+91 - {mobileNo}</td>
                        </tr>
                        <tr>
                            <th className='tableItemsHead'><MdOutlineEmail />Email ID</th>
                            <td className='w-7'>:</td>
                            <td className='text-[14px]'>{officeEmail}</td>
                        </tr>
                        <tr>
                            <th className='tableItemsHead'><FaRegCalendar />DOB</th>
                            <td className='w-7'>:</td>
                            <td className='text-[14px]'>01-08-1995</td>
                        </tr>
                        <tr>
                            <th className='tableItemsHead'><FaFingerprint />Aadhar No.</th>
                            <td className='w-7'>:</td>
                            <td className='text-[14px]'>{aadharNo}</td>
                        </tr>
                        <tr>
                            <th className='tableItemsHead'><FaRegAddressCard />PAN No.</th>
                            <td className='w-7'>:</td>
                            <td className='text-[14px]'>{panNo}</td>
                        </tr>
                        <tr>
                            <th className='tableItemsHead'><MdOutlineBloodtype />Blood Group</th>
                            <td className='w-7'>:</td>
                            <td className='text-[14px]'>{bloodGroupId}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    )
}

export default IntroCard