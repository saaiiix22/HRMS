import React from 'react';
import { Formik, FieldArray } from 'formik';
import { MdAddCircle } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const TabThree = () => {
  const workExpFields = [
    { name: 'orgName', label: 'Organisation Name', type: 'text' },
    { name: 'workLoc', label: 'Work Location', type: 'text' },
    { name: 'position', label: 'Position Held', type: 'text' },
    { name: 'fromDate', label: 'From Date', type: 'date' },
    { name: 'tillDate', label: 'Till Date', type: 'date' },
    { name: 'expLetter', label: 'Experience Letter', type: 'file' },
    { name: 'relievingLetter', label: 'Relieving Letter', type: 'file' }
  ];

  const initialValues = {
    workExperiences: [
      {
        orgName: '',
        workLoc: '',
        position: '',
        fromDate: '',
        tillDate: '',
        expLetter: null,
        relievingLetter: null
      }
    ]
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <FieldArray name="workExperiences">
            {({ push, remove }) => (
              <div className="overflow-x-auto mt-3">
                <table className="min-w-full border border-slate-300 text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      {workExpFields.map((field) => (
                        <th key={field.name} className="p-2 font-semibold text-left">
                          {field.label}
                        </th>
                      ))}
                      <th className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            push({
                              orgName: '',
                              workLoc: '',
                              position: '',
                              fromDate: '',
                              tillDate: '',
                              expLetter: null,
                              relievingLetter: null
                            })
                          }
                          className="text-green-600 text-xl"
                        >
                          <MdAddCircle />
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {formik.values.workExperiences.map((_, index) => (
                      <tr key={index} className="border-t border-slate-200">
                        {workExpFields.map((field) => {
                          const fieldName = `workExperiences[${index}].${field.name}`;
                          return (
                            <td key={field.name} className="p-2 border-r border-slate-200">
                              {field.type === 'file' ? (
                                <input
                                  type="file"
                                  name={fieldName}
                                  onChange={(e) =>
                                    formik.setFieldValue(
                                      fieldName,
                                      e.currentTarget.files[0]
                                    )
                                  }
                                  className="w-full text-sm"
                                />
                              ) : field.type == 'date' ? (
                                <DatePicker
                                  id={fieldName}
                                  selected={formik.values[fieldName] ? new Date(formik.values[fieldName]) : null}
                                  onChange={(date) => setFieldValue(fieldName, date)}
                                  dateFormat="dd/MM/yyyy"
                                  className="border-2 border-solid border-slate-100 rounded px-3 py-[4px] "
                                  placeholderText="dd/mm/yy"
                                />
                              )
                                : (
                                  <input
                                    type={field.type}
                                    name={fieldName}
                                    value={formik.values.workExperiences[index][field.name]}
                                    onChange={formik.handleChange}
                                    className="border border-slate-300 rounded px-2 py-1 w-full text-sm"
                                  />
                                )}
                            </td>
                          );
                        })}
                        <td className="p-2 text-center">
                          {index !== 0 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
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
              </div>
            )}
          </FieldArray>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md text-sm"
            >
              SAVE EXPERIENCE
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default TabThree;
