import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { FaRegAddressCard } from "react-icons/fa";
import TabOne from '../../components/tabsContainer/TabOne';
import TabThree from '../../components/tabsContainer/TabThree';
import TabFour from '../../components/tabsContainer/TabFour';
import TabTwo from '../../components/tabsContainer/TabTwo';

const HumanResourceEmployee = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };
    return (
        <div className='p-3 bg-white mt-2 rounded-lg shadow-lg'>
            <h3 className='flex items-center text-[18px] font-semibold gap-2'><FaRegAddressCard />Employee Profile</h3>
            <div className="p-2">
                <Box sx={{ width: '100%', mt: 2 }}>
                    <Box sx={{ paddingBottom:'10px' }}>
                        <Tabs value={tabIndex}
                            sx={{
                                backgroundColor:'#F5F8FE',
                                minHeight: '32px',
                                borderRadius:'15px'
                            }}
                            onChange={handleChange} TabIndicatorProps={{ style: { display: 'none' } }}>
                            <Tab label="Basic Details" sx={{
                                mr: 2,
                                px: 2,
                                py: 0.5,
                                minHeight: '32px',
                                color: '#808080',
                                fontWeight: 'bold',
                                backgroundColor: '#E0E7FA',
                                fontSize: '11px',
                                borderRadius: '20px',
                                '&.Mui-selected': {
                                    color: '#fff',
                                    backgroundColor: '#0A92D6'
                                },
                            }} />
                            <Tab label="Bank & Address Details" sx={{
                                mr: 2,
                                minHeight: '32px',
                                color: '#808080',
                                fontWeight: 'bold',
                                backgroundColor: '#E0E7FA',
                                fontSize: '11px',
                                borderRadius: '20px',
                                '&.Mui-selected': {
                                    color: '#fff',
                                    backgroundColor: '#0A92D6'
                                },
                            }} />
                            <Tab label="Previous Experience" sx={{
                                mr: 2,
                                px: 2,
                                py: 0.5,
                                minHeight: '32px',
                                color: '#808080',
                                fontWeight: 'bold',
                                backgroundColor: '#E0E7FA',
                                fontSize: '11px',
                                borderRadius: '20px',
                                '&.Mui-selected': {
                                    color: '#fff',
                                    backgroundColor: '#0A92D6'
                                },
                            }} />
                            <Tab label="Education Details" sx={{
                                mr: 2,
                                px: 2,
                                py: 0.5,
                                minHeight: '32px',
                                color: '#808080',
                                fontWeight: 'bold',
                                backgroundColor: '#E0E7FA',
                                fontSize: '11px',
                                borderRadius: '20px',
                                '&.Mui-selected': {
                                    color: '#fff',
                                    backgroundColor: '#0A92D6'
                                },
                            }} />
                        </Tabs>
                    </Box>
                    <Box>
                        {tabIndex === 0 && <TabOne />}
                        {tabIndex === 1 && <TabTwo />}
                        {tabIndex === 2 && <TabThree />}
                        {tabIndex === 3 && <TabFour />}
                    </Box>
                </Box>
            </div>
        </div>
    )
}

export default HumanResourceEmployee