const express = require('express')
const verifyToken = require('../middleware/jwt')
const empAddressModel = require('../model/empAddressModel')
const empModel = require('../model/empModel')

const empAddressRouter = express.Router()

empAddressRouter.get('/allAdd', async (req, res) => {

    try {
        const getEmpAddress = await empAddressModel.find({})
        if (getEmpAddress) {
            return res.status(200).json({ message: 'User Address fetched successfully', empAddress: getEmpAddress })
        }
    } catch (error) {
        console.error('Error in /seeaddress:', error);
        return res.status(500).json({ message: 'ERROR SERVER SIDE' })
    }
})

// ! SEE SPECIFIC ADDRESS
empAddressRouter.get('/seeaddress', verifyToken, async (req, res) => {
    const user = req.user
    try {
        // console.log(user.userMaster.loginId);

        const getEmpAddress = await empAddressModel.findOne({ employeeCode: user.userMaster.loginId })
        if (getEmpAddress) {
            return res.status(200).json({ message: 'User Address fetched successfully', empAddress: getEmpAddress })
        }
        else {
            // console.log(getEmpAddress);
            return res.status(404).json({ message: 'Sorry Couldnt Fetch', getEmpAddress })
        }
    } catch (error) {
        console.error('Error in /seeaddress:', error);
        return res.status(500).json({ message: 'ERROR SERVER SIDE' })
    }
})
// ! UPDATE ADDRESS
empAddressRouter.post('/updateAddress', verifyToken, async (req, res) => {
    const user = req.user;
    const {
        presentAddress,
        presentCity,
        presentPincode,
        presentDistrict,
        presentState,
        permanentAddress,
        permanentCity,
        permanentPincode,
        permanentDistrict,
        permanentState
    } = req.body;

    try {
        const getEmp = await empModel.findOne({ employeeCode: user.userMaster.loginId });

        if (getEmp) {
            const updateResult = await empAddressModel.updateOne(
                { employeeId: user.employeeId },
                {
                    $set: {
                        presAddressLine: presentAddress,
                        presCityName: presentCity,
                        presPincode: presentPincode,
                        'presDistMstObj.districtName': presentDistrict,
                        'presStateMstObj.stateName': presentState,
                        permAddressLine: permanentAddress,
                        permCityName: permanentCity,
                        permPincode: permanentPincode,
                        'permDistMstObj.districtName': permanentDistrict,
                        'permStateMstObj.stateName': permanentState
                    }
                }
            );

            res.status(200).json({ message: 'Address updated successfully', result: updateResult });
        } else {
            res.status(404).json({ message: 'Address updation failed' });
        }
    } catch (error) {
        console.error('Update address error:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = empAddressRouter