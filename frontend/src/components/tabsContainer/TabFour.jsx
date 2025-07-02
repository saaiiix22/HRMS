import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineAddCircle } from 'react-icons/md';
import { updatedEducation } from '../../api/ApiCall';
import { toast } from 'react-toastify';

const TabFour = () => {
  const empEducationSelector = useSelector(state => state.userDetails.userDetails);
  // console.log(empEducationSelector?.user);


  const [educationRows, setEducationRows] = useState([
    {
      standardName: '',
      institutionName: '',
      boardName: '',
      stream: '',
      passingYear: '',
      totalMark: '',
      certificateFile: '',
    },
  ]);

  useEffect(() => {
  if (empEducationSelector?.empEducation?.length > 0) {
    setEducationRows(empEducationSelector.empEducation);
  } else if (empEducationSelector?.user) {
    setEducationRows([
      {
        standardName: '',
        institutionName: '',
        boardName: '',
        stream: '',
        passingYear: '',
        totalMark: '',
        certificateFile: '',
        userId: empEducationSelector.user.employeeId,
        loginId: empEducationSelector.user.employeeCode,
      },
    ]);
  }
}, [empEducationSelector]);


  const handleAddRow = () => {
    setEducationRows([
      ...educationRows,
      {
        standardName: '',
        institutionName: '',
        boardName: '',
        stream: '',
        passingYear: '',
        totalMark: '',
        certificateFile: '',
        userId:empEducationSelector?.user?.employeeId,
        loginId:empEducationSelector?.user?.employeeCode
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updated = [...educationRows];
    // console.log(updated.splice(index, 1));  
    updated.splice(index, 1);
    setEducationRows(updated);
  };

  const handleInp = (e, index) => {
    const { name, value, files, type } = e.target;
    const updatedRows = [...educationRows];
    updatedRows[index][name] = type === 'file' ? files[0] : value;
    setEducationRows(updatedRows);
  };

  // console.log(educationRows);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(educationRows);
    
    try {
      const res = await updatedEducation(educationRows)
      console.log(res); 
      toast.success('Updated Successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="col-span-12 flex items-center gap-3 my-4">
        <h3 className="font-semibold text-blue-600 text-lg">Educational Details</h3>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <table className="table-fixed w-full border border-slate-300">
          <thead className="bg-slate-100">
            <tr>
              {[
                'Standard',
                'Institution Name',
                'Board Name',
                'Stream',
                'Passing Year',
                'Total Marks/CGPA Obtained',
                'Upload/View Certificate',
                '',
              ].map((header, i) => (
                <td
                  key={i}
                  className="w-[150px] text-sm text-center font-semibold px-4 py-1 border-r"
                >
                  {header === '' ? (
                    <button type="button" onClick={handleAddRow}>
                      <MdOutlineAddCircle className="inline text-green-600 text-xl" />
                    </button>
                  ) : (
                    header
                  )}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {educationRows.map((row, index) => (
              <tr
                key={index}
                className="border-b-2 border-solid border-slate-100"
              >
                <td className="border-r">
                  <input
                    type="text"
                    name="standardName"
                    value={row.standardName}
                    onChange={(e) => handleInp(e, index)}
                    className="border border-slate-300 rounded px-2 py-1 w-full text-sm"
                  />
                </td>
                <td className="border-r">
                  <input
                    type="text"
                    name="institutionName"
                    value={row.institutionName}
                    onChange={(e) => handleInp(e, index)}
                    className="border border-slate-300 rounded px-2 py-1 w-full text-sm"
                  />
                </td>
                <td className="border-r">
                  <input
                    type="text"
                    name="boardName"
                    value={row.boardName}
                    onChange={(e) => handleInp(e, index)}
                    className="border border-slate-300 rounded px-2 py-1 w-full text-sm"
                  />
                </td>
                <td className="border-r">
                  <input
                    type="text"
                    name="stream"
                    value={row.stream}
                    onChange={(e) => handleInp(e, index)}
                    className="border border-slate-300 rounded px-2 py-1 w-full text-sm"
                  />
                </td>
                <td className="border-r">
                  <input
                    type="number"
                    name="passingYear"
                    value={row.passingYear}
                    onChange={(e) => handleInp(e, index)}
                    className="border border-slate-300 rounded px-2 py-1 w-full text-sm"
                  />
                </td>
                <td className="border-r">
                  <input
                    type="number"
                    name="totalMark"
                    value={row.totalMark}
                    onChange={(e) => handleInp(e, index)}
                    className="border border-slate-300 rounded px-2 py-1 w-full text-sm"
                  />
                </td>
                <td className="border-r">
                  <input
                    type="file"
                    name="certificateFile"
                    onChange={(e) => handleInp(e, index)}
                    className="border border-slate-300 rounded px-2 py-1 w-full text-[12px]"
                  />
                </td>
                <td className="border-r text-center">
                  {educationRows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(index)}
                      className="text-red-500 text-sm"
                    >
                      ❌
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-5 bg-[#f3f6ff] mt-5 flex justify-center">
          <button className="px-4 py-1 rounded-sm text-white font-semibold text-sm bg-[#0A92D6]" type='submit'>
            {educationRows.length > 1 ? 'Update' : 'Save'}
          </button>
        </div>
      </form>


    </div>
  );
};

export default TabFour;
