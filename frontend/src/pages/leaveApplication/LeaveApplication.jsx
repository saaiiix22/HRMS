import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RxDragHandleDots2 } from 'react-icons/rx';
import DatePicker from 'react-datepicker';

const LeaveApplication = () => {
  return (
    <div className='mt-3 rounded-md'>
      <div>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span" ><h5 class="font-[500]"><span class="text-slate-500">Leave</span> Application</h5></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <form action="">
                <div className='grid grid-cols-12'>

                  <div className='col-span-4 flex'>
                    <label htmlFor='' className="flex items-center justify-start gap-2 w-[100px] text-slate-500 font-semibold text-[14px]">
                      Filter By <RxDragHandleDots2 className="text-[#ccc] text-[20px]" />
                    </label>
                  </div>

                  <div className='col-span-4 flex'>
                    <label htmlFor='' className="flex items-center justify-start gap-2 w-[100px] text-[14px]">
                      Year
                      <span className="text-red-500"> *</span>
                      <RxDragHandleDots2 className="text-[#ccc] text-[20px]" />
                    </label>
                    <DatePicker
                      selected={''}
                      showYearPicker
                      className="border-[1px] border-solid border-slate-300 rounded px-3 py-[4px] "
                      placeholderText="YYYY"
                    />
                  </div>

                  <div className='col-span-4 flex'>
                    <label htmlFor='' className="flex items-center justify-start gap-2 w-[100px] text-[14px]">
                      Month
                      <span className="text-red-500"> *</span>
                      <RxDragHandleDots2 className="text-[#ccc] text-[20px]" />
                    </label>
                    <DatePicker
                      selected={''}
                      showMonthYearPicker
                      className="border-[1px] border-solid border-slate-300 rounded px-3 py-[4px] "
                      placeholderText="MMMM"
                    />
                  </div>
                </div>
              </form>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">
              <h5 class="font-[500]"><span class="text-slate-500">List of </span> Applied Leaves</h5>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default LeaveApplication