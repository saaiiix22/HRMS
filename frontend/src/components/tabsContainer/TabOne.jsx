import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { RxDragHandleDots2 } from "react-icons/rx";
import 'react-datepicker/dist/react-datepicker.css';
import profile from '../../assets/profile.png';
import { useDispatch, useSelector } from 'react-redux';
import { updateBasicDetailsAPI } from '../../api/ApiCall';
import getData from '../../actions/getUserDetailsaction';

const TabOne = () => {
    const userSelection = useSelector((state) => state.userDetails.userDetails);
    const user = userSelection?.user ?? {};

    const fieldConfigs = [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employeeCode', label: 'Employee Code', type: 'text', required: true },
        { name: 'fatherName', label: 'Father / Husband Name', type: 'text', required: true },
        { name: 'gender', label: 'Gender', type: 'text', required: true },
        { name: 'birthDate', label: 'Date of Birth', type: 'date', required: true },
        { name: 'joiningDate', label: 'Date of Joining', type: 'date', required: true },
        { name: 'mobileNo', label: 'Mobile No.', type: 'text', required: true },
        { name: 'alternateMobileNo', label: 'Alternate Mobile No.', type: 'text', required: false },
        { name: 'employeeContactNo', label: 'Employee Contact No.', type: 'text', required: true },
        { name: 'officeEmail', label: 'Office Email', type: 'email', required: true },
        { name: 'alternateEmail', label: 'Alternate Email', type: 'email', required: false },
        { name: 'aadharNo', label: 'Aadhar No.', type: 'text', required: true },
        { name: 'panNo', label: 'PAN No.', type: 'text', required: true },
        { name: 'pfAccountNo', label: 'PF Account No.', type: 'text', required: false },
        { name: 'uanNo', label: 'UAN No.', type: 'text', required: false },
        { name: 'nationalityId', label: 'Nationality', type: 'text', required: false },
        { name: 'religionId', label: 'Religion', type: 'text', required: false },
        { name: 'categoryId', label: 'Category', type: 'text', required: false },
        { name: 'bloodGroupId', label: 'Blood Group', type: 'text', required: true },
        { name: 'maritalStatus', label: 'Marital Status', type: 'text', required: false },
        { name: 'dateOfMarriage', label: 'Date of Marriage', type: 'date', required: false },
        { name: 'languageKnown', label: 'Languages Known', type: 'text', required: false },
        { name: 'passportNo', label: 'Passport No.', type: 'text', required: false },
        { name: 'passportExpiry', label: 'Passport Expiry Date', type: 'date', required: false },
        { name: 'employeeType', label: 'Employee Type', type: 'text', required: false },
        { name: 'status', label: 'Service Status', type: 'text', required: false, readonly: true },
        { name: 'serviceEndDate', label: 'Service End Date', type: 'date', required: false },
        { name: 'aadharCardCopy', label: 'Aadhaar Card Copy', type: 'file', required: true },
        { name: 'panCardCopy', label: 'PAN Card Copy', type: 'file', required: true }
    ];

    
    const dispatch = useDispatch();
    const handleSubmitInp = async (e) => {
        const res = await updateBasicDetailsAPI(values); 
        if (res.success) {
            await dispatch(getData());
            console.log("Data saved successfully");
        } else {
            console.log("Error saving data", res.error);
        }
    };

       

    const initialValues = Object.fromEntries(
        fieldConfigs.map(field => {
            let value = user?.[field.name] || '';
            if (field.type === 'date' && value) {
                const dateOnly = new Date(value);
                dateOnly.setMinutes(dateOnly.getMinutes() + dateOnly.getTimezoneOffset());
                value = dateOnly;
            }
            return [field.name, value];
        })
    );
    const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: handleSubmitInp
    });
    

    return (
        <>
            <div className="p-5 bg-[#F3F6FF] my-5 flex justify-center items-center">
                <div className='rounded-full w-[150px] h-[150px] overflow-hidden'>
                    <img src='https://img.freepik.com/free-photo/portrait-smiling-charming-young-man-grey-t-shirt-standing-against-plain-background_23-2148213406.jpg?t=st=1746532830~exp=1746536430~hmac=9e10d4518586fb3ceb1e85d1ffa795790d2928f87ed6ff6d24e1e15d3b38835d&w=740' alt="" className='bg-[#dae0ec] object-cover w-full' />
                </div>
            </div>

            <div className="p-3">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-12 gap-4">
                        {fieldConfigs.map((field) => (
                            <div key={field.name} className="col-span-4 flex items-center gap-4">
                                <label htmlFor={field.name} className="flex items-center justify-between gap-2 w-[150px] text-[14px] font-semibold">
                                    {field.label}
                                    <span className="text-red-500"> *</span>
                                    <RxDragHandleDots2 className="text-[#ccc] text-[20px]" />
                                </label>
                                {
                                    field.type === 'date' ? (
                                        <DatePicker
                                            id={field.name}
                                            selected={values[field.name] ? new Date(values[field.name]) : null}
                                            onChange={(date) => setFieldValue(field.name, date)}
                                            dateFormat="dd/MM/yyyy"
                                            className="border-[1px] border-solid border-slate-300 rounded px-3 py-[4px] "
                                            placeholderText="dd/mm/yy"
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            id={field.name}
                                            name={field.name}
                                            value={values[field.name]}
                                            onChange={handleChange}
                                            className="border-[1px] border-solid border-slate-300 rounded px-3 py-[4px] "
                                            readOnly={field.readonly} style={{ backgroundColor: field.readonly ? '#ccc' : '#fff' }}
                                        />
                                    )
                                }
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button className='px-5 text-sm py-2 rounded-md font-semibold bg-[#0A92D6] text-white mt-5' type='submit'>SAVE</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default TabOne;
