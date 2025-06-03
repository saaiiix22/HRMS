import React, { useState } from 'react';
import aashditLogo from '../../assets/logo.png';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaPowerOff } from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { logoutFunction } from '../../api/ApiCall';
import { useSelector } from 'react-redux';
import { RxDashboard } from "react-icons/rx";

const Sidebar = () => {
    const selectUser = useSelector((state) => state.userDetails.userDetails);
    const menuRolesList = selectUser?.menuRoles || [];

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        logoutFunction();
        localStorage.clear();
        sessionStorage.clear();
        navigate('/login', { replace: true });
    };

    // Create a map of parentId => child items
    const menuMap = {};
    menuRolesList.forEach(item => {
        const parentId = item.menu?.parentMenuId ?? null;
        if (!menuMap[parentId]) {
            menuMap[parentId] = [];
        }
        menuMap[parentId].push(item);
    });

    // Recursive function to check if current route is under a menu item
    const isMenuActive = (menuId) => {
        const checkChildren = (id) => {
            const children = menuMap[id] || [];
            for (const item of children) {
                const uri = item.menu?.menuURI || "";
                const route = uri.toLowerCase().replace(/[^a-z0-9]/g, "");
                if (location.pathname.includes(route)) return true;
                if (checkChildren(item.menu?.menuId)) return true;
            }
            return false;
        };
        return checkChildren(menuId);
    };

    const RenderMenuItems = ({ parentId }) => {
        const items = menuMap[parentId] || [];
        const [expandedChild, setExpandedChild] = useState(null);

        return items.map(item => {
            if (!item.menu) return null;

            const hasChildren = menuMap[item.menu.menuId]?.length > 0;
            const isActive = isMenuActive(item.menu.menuId);

            if (hasChildren) {
                return (
                    <Accordion
                        key={item.menu.menuId}
                        expanded={parentId !== null ? expandedChild === item.menu.menuId || isActive : undefined}
                        onChange={parentId !== null
                            ? (_, isExpanded) => setExpandedChild(isExpanded ? item.menu.menuId : null)
                            : undefined}
                        sx={{
                            border: "none",
                            boxShadow: 'none',
                            "&::before": { display: "none" },
                            backgroundColor: isActive ? "#f0f4ff" : "transparent"
                        }}
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
                            <Typography component="span" sx={{ fontSize: '15px', marginTop: '2px' }} className='flex'>
                                <i className={`${item.menu.menuIcon} text-[14px] me-2 p-2 bg-[#e4eaff] text-black max-w-7 min-w-7 flex justify-center items-center max-h-7 min-h-7 rounded-full`} style={{ display: item.menu.menuIcon ? 'flex' : 'none' }}></i>
                                <p>{item.menu.menuDescriptionEng || "Unnamed Menu"}</p>
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

            const uri = item.menu.menuURI || "";
            const route = uri.toLowerCase().replace(/[^a-z0-9]/g, "");
            const isCurrent = location.pathname.includes(route);

            return (
                <NavLink
                    to={route}
                    key={item.menu.menuId}
                    className={`block text-sm text-[15px] ps-6 py-1 ${isCurrent ? 'text-blue-600 font-semibold' : 'text-[#0B97D9]'}`}
                >
                    {item.menu.menuDescriptionEng || "Unnamed Menu"}
                </NavLink>
            );
        });
    };

    return (
        <aside className='md:w-1/6 py-5 h-full bg-white fixed'>
            <div className='p-10'>
                <img src={aashditLogo} alt="Logo" className='m-auto' width={'85%'} />
            </div>

            <div className='mt-3 h-[86%] bg-white flex flex-col justify-between'>
                <div>
                    <div className='py-2'>
                        <NavLink to='/'>
                            <h2 className='ms-6 text-[16px] flex items-center gap-2'>
                                <span className='p-2 bg-[#e4eaff] text-black max-w-7 min-w-7 flex justify-center items-center max-h-7 min-h-7 rounded-full'>
                                    <RxDashboard />
                                </span> Dashboard
                            </h2>
                        </NavLink>
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
