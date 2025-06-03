import React from 'react';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

const RegularizationRequest = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const selectUser = useSelector(state => state.userDetails.userDetails)
    console.log(selectUser?.user);


    const fieldConfigs = [
        { name: 'year', label: 'For Year', type: 'year' },
        { name: 'month', label: 'For Month', type: 'month' },
        { name: 'fromDate', label: 'From Date', type: 'date' },
        { name: 'toDate', label: 'To Date', type: 'date', maxDate: today },
        { name: 'employee', label: 'Employee', type: 'select' }
    ];

    const initialValues = {
        year: today,
        month: today,
        fromDate: startOfMonth,
        toDate: today,
        employee: selectUser?.user?.employeeName || ''
    };

    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            console.log('Submitted values:', values);
        }
    });

    const renderField = (field) => {
        if (field.type === 'year') {
            return (
                <DatePicker
                    selected={formik.values[field.name]}
                    onChange={(date) => formik.setFieldValue(field.name, date)}
                    showYearPicker
                    dateFormat="yyyy"
                    className="w-full border border-slate-300 rounded px-3 py-[4px] bg-slate-100 text-sm"
                    placeholderText="Year"
                    readOnly
                />
            );
        }

        if (field.type === 'month') {
            return (
                <DatePicker
                    selected={formik.values[field.name]}
                    onChange={(date) => formik.setFieldValue(field.name, date)}
                    showMonthYearPicker
                    dateFormat="MM/yyyy"
                    className="w-full border border-slate-300 rounded px-3 py-[4px] bg-slate-100 text-sm"
                    placeholderText="mm/yyyy"
                    readOnly
                />
            );
        }

        if (field.type === 'date') {
            return (
                <DatePicker
                    selected={formik.values[field.name]}
                    onChange={(date) => formik.setFieldValue(field.name, date)}
                    dateFormat="dd/MM/yyyy"
                    className="w-full border border-slate-300 rounded px-3 py-[4px] bg-slate-100 text-sm"
                    placeholderText="dd/mm/yyyy"
                    maxDate={field.maxDate}
                    readOnly
                />
            );
        }

        if (field.type === 'select') {
            const employeeName = selectUser?.user?.employeeName || '';

            return (
                <select
                    name={field.name}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    className="w-full border border-slate-300 rounded px-3 py-[4px] ms-3 bg-slate-100"
                    disabled
                >
                    <option value={employeeName}>{employeeName}</option>
                </select>
            );
        }

        return null;
    };

    return (
        <div className='p-4 bg-white mt-3 rounded-md border border-[#ccc]'>
            <form onSubmit={formik.handleSubmit}>
                <div className="">
                    <h3 className="text-black text-[15px] font-semibold">
                        Request for <span className="text-slate-500">Attendance Regularization</span>
                    </h3>

                    <div className="mt-4">
                        <span className="text-[13px] text-slate-500 font-semibold">Attendance Parameters</span>

                        <div className="mt-3 grid md:grid-cols-5 gap-4">
                            {fieldConfigs.map(i => (
                                <div key={i.name} className="flex items-center">
                                    <label className="w-20 text-sm">{i.label}:</label>
                                    {renderField(i)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
            <div className='mt-8'>
                <h3 className='text-sm text-center font-semibold text-slate-500'>
                    Irregular Attendance Details of
                    <span className='text-black'> {selectUser?.user?.employeeName}</span>
                    <span className='text-[#0b97d9]'> ({selectUser?.user?.employeeCode}) </span> for {today.toLocaleString('default', { month: 'long' })} {today.getFullYear()}</h3>
            </div>
        </div>
    );
};

export default RegularizationRequest;
