import React, { useState } from 'react';
import aashditLogo from '../../assets/logo.png';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaPowerOff } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutFunction } from '../../api/ApiCall';
import { useSelector } from 'react-redux';
import { RxDashboard } from "react-icons/rx";


const Sidebar = () => {
    const selectUser = useSelector((state) => state.userDetails.userDetails);
    const menuRolesList = selectUser?.menuRoles || [];
    const navigate = useNavigate();
    // const logout = () => {
    //     logoutFunction();
    //     localStorage.clear();
    //     sessionStorage.clear();
    //     navigate('/login', { replace: true });
    // };

    const logout = async () => {
        try {
            await logoutFunction();
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            localStorage.clear();
            sessionStorage.clear();
            navigate('/login', { replace: true });
        }
    };

    const menuMap = {};
    menuRolesList.forEach(item => {
        const parentId = item.menu.parentMenuId;
        if (!menuMap[parentId]) {
            menuMap[parentId] = [];
        }
        menuMap[parentId].push(item);
    });

    const RenderMenuItems = ({ parentId }) => {
        const items = menuMap[parentId] || [];
        const [expandedChild, setExpandedChild] = useState(null);

        return items.map(item => {
            const hasChildren = menuMap[item.menu.menuId]?.length > 0;

            if (hasChildren) {
                return (
                    <Accordion
                        key={item.menu.menuId}
                        expanded={parentId !== null ? expandedChild === item.menu.menuId : undefined}
                        onChange={parentId !== null
                            ? (isExpanded) => setExpandedChild(isExpanded ? item.menu.menuId : null)
                            : undefined}
                        sx={{
                            border: "none",
                            boxShadow: 'none',
                            "&::before": { display: "none" }
                        }}
                        className='text-[12px]'
                        disableGutters
                        square
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel-${item.menu.menuId}-content`}
                            id={`panel-${item.menu.menuId}-header`}
                            className='text-[12px]'
                        >
                            <span className='mt-1 me-2 text-[18px]'>{item.iconShape}</span>
                            <Typography component="span" sx={{ fontSize: '15px', marginTop: '2px' }} className='flex text-[12px]'>
                                <i className={`${item.menu.menuIcon} text-[14px] me-2 p-2 bg-[#e4eaff] border-2 border-solid border-[#b6c3f1] text-slate-600 max-w-7 min-w-7 flex justify-center items-center  max-h-7 min-h-7 rounded-full`} style={{display:item.menu.menuIcon?'flex':'none'}}></i><p>{item.menu.menuDescriptionEng}</p>
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <div className="flex flex-col ps-6 gap-2">
                                <RenderMenuItems parentId={item.menu.menuId} />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                );
            }

            return (
                <NavLink
                    to={item.menu.menuURI.toLowerCase().replace(/[^a-z0-9]/g, "")} 
                    key={item.menu.menuId}
                    className="block text-sm text-[#0B97D9] text-[15px] ps-6 py-1"
                >
                    {item.menu.menuDescriptionEng}
                </NavLink>
            );
        });
    };

    return (
        <aside className='md:w-1/6 py-5 h-full bg-white fixed'>
            <div className='p-10'>
                <img src={aashditLogo} alt="Logo" className='m-auto' width={'85%'} onClick={()=>navigate('/')} />
            </div>

            <div className='mt-3 h-[86%] bg-white flex flex-col justify-between'>
                <div>
                    <div className='py-2'>
                       <NavLink to='/'><h2 className='ms-6 text-[16px] flex items-center gap-2 '><span className='p-2 bg-[#e4eaff] text-black border-2 border-solid border-slate-300  max-w-7 min-w-7 flex justify-center items-center  max-h-7 min-h-7 rounded-full'><RxDashboard /></span> Dashboard</h2></NavLink>
                    </div>
                    <RenderMenuItems parentId={null} />
                </div>

                <div className='mb-5'>
                    <button
                        onClick={logout}
                        className='text-red-500 border-2 border-solid border-red-500 m-auto rounded-md w-2/3 flex items-center justify-center gap-3 p-2 text-[17px] font-semibold'
                    >
                        <FaPowerOff /> Logout 
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

