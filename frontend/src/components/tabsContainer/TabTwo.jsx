import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { useQuery } from '@tanstack/react-query';
import { getAddress, updateAddress } from '../../api/ApiCall';
import { toast } from 'react-toastify';

const TabTwo = () => {
  const tabTwoFieldConfigs = [
    { name: 'accountNumber', label: 'Account Number', type: 'number' },
    { name: 'bankName', label: 'Bank Name', type: 'text' },
    { name: 'branchName', label: 'Branch Name', type: 'text' },
    { name: 'ifscCode', label: 'IFSC Code', type: 'text' }
  ];

  const addressFields = [
    { name: 'address', label: 'Address', type: 'textarea' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'pincode', label: 'Pincode', type: 'number' },
    { name: 'district', label: 'District', type: 'text' },
    { name: 'state', label: 'State', type: 'text' }
  ];

  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['data'],
    queryFn: getAddress,
    staleTime: 10000,
  });


  const initialValues = useMemo(() => {
    const emp = data?.empAddress || {};
    return {
      accountNumber: '',
      bankName: '',
      branchName: '',
      ifscCode: '',

      presentAddress: emp.presAddressLine || '',
      presentCity: emp.presCityName || '',
      presentPincode: emp.presPincode || '',
      presentDistrict: emp.presDistMstObj?.districtName || '',
      presentState: emp.presStateMstObj?.stateName || '',

      permanentAddress: emp.permAddressLine || '',
      permanentCity: emp.permCityName || '',
      permanentPincode: emp.permPincode || '',
      permanentDistrict: emp.permDistMstObj?.districtName || '',
      permanentState: emp.permStateMstObj?.stateName || '',
    };
  }, [data]);

  const bankForm = useFormik({
    initialValues,
    enableReinitialize: true,
    // onSubmit: values => console.log(values),
    onSubmit: async (values) => {
      const payload = {
        presentAddress: values.presentAddress,
        presentCity: values.presentCity,
        presentPincode: values.presentPincode,
        presentDistrict: values.presentDistrict,
        presentState: values.presentState,
        permanentAddress: values.permanentAddress,
        permanentCity: values.permanentCity,
        permanentPincode: values.permanentPincode,
        permanentDistrict: values.permanentDistrict,
        permanentState: values.permanentState
      };

      try {
        const response = await updateAddress(payload);
        console.log('Address updated:', response);
        toast.success(response.message)
      } catch (err) {
        console.log('Address update failed:', err);
        toast.success(response.message)
      }
    }

  });

  const renderFields = (fields, prefix = '') =>
    fields.map(field => {
      const fieldName = `${prefix}${capitalize(field.name)}`;
      return (
        <div
          key={fieldName}
          className={`${field.type === 'textarea'
            ? 'col-span-12 md:col-span-8'
            : 'col-span-12 md:col-span-4'
            } flex flex-col md:flex-row gap-2 md:gap-4`}
        >
          <label
            htmlFor={fieldName}
            className="flex items-center gap-2 w-full md:w-[150px] text-sm font-medium"
          >
            {field.label}
            <span className="text-red-500">*</span>
            <RxDragHandleDots2 className="text-gray-300 text-lg" />
          </label>
          {field.type === 'textarea' ? (
            <textarea
              id={fieldName}
              name={fieldName}
              value={bankForm.values[fieldName]}
              onChange={bankForm.handleChange}
              className="border border-slate-300 rounded px-3 py-1 w-full focus:outline-blue-400"
            />
          ) : (
            <input
              type={field.type || 'text'}
              id={fieldName}
              name={fieldName}
              value={bankForm.values[fieldName]}
              onChange={bankForm.handleChange}
              className="border border-slate-300 rounded px-3 py-1 w-full focus:outline-blue-400"
            />
          )}
        </div>
      );
    });



  return (
    <div className="bg-white p-2">
      <form autoComplete="off" onSubmit={bankForm.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="col-span-12 flex items-center gap-3 my-4">
            <h3 className="font-semibold text-blue-600 text-lg">Bank Details</h3>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {renderFields(tabTwoFieldConfigs)}

          <div className="col-span-12 flex items-center gap-3 mt-8 mb-4">
            <h3 className="font-semibold text-blue-600 text-lg">Address Details</h3>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <div className="col-span-12">
            <h4 className="text-green-600 font-medium mb-3">Present Address</h4>
          </div>

          {renderFields(addressFields, 'present')}

          <div className="col-span-12 mt-6">
            <h4 className="text-green-600 font-medium mb-3">Permanent Address</h4>
          </div>

          {renderFields(addressFields, 'permanent')}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md text-sm"
          >
            SAVE DETAILS
          </button>
        </div>
      </form>
    </div>
  );
};

export default TabTwo;
