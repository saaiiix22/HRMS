const express = require('express')
const empModel = require('../model/empModel')
const empRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/jwt')
const empEducationModel = require('../model/educationModel')
const empDesignationModel = require('../model/empDesignationModel')
const menuRolesModel = require('../model/menuRolesModel')
const { blacklistToken } = require('../middleware/blackListToken')

// ! login 
empRouter.post('/login', async (req, res) => {
    const { employeeCode, password } = req.body;

    try {
        const employeeCheck = await empModel.findOne({ employeeCode });
        if (!employeeCheck) {
            return res.status(401).json({ message: 'Wrong Credentials' });
        }
        else {
            const checkPass = await bcrypt.compare(password, employeeCheck.userMaster.password);
            if (!checkPass) {
                return res.status(401).json({ message: 'Wrong Credentials' });
            }
            else {
                const token = jwt.sign({ user: employeeCheck }, process.env.SECRET_KEY, { expiresIn: '1hr' })
                return res.status(200).json({ message: 'Login Successful', token });
            }
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ! LOGOUT
empRouter.post('/logout', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }
    blacklistToken(token);
    return res.status(200).json({ message: 'Logout successful' });
});



//  ! GET LOGGED IN PERSON DETAILS
empRouter.get('/user', verifyToken, async (req, res) => {
    const userLogin = req.user
    try {
        const recheck = await empModel.findOne({ _id: userLogin._id })
        const empEducation = await empEducationModel.find({ userId: userLogin.employeeId })
        const empDesignation = await empDesignationModel.findOne({ 'empMstObj.employeeCode': userLogin.employeeCode, status: "ACTIVE" }, { deptMstObj: 1, roleMstObj: 1 })
        
        const menuRoles = await menuRolesModel.find({$and:[
            {'role.roleId':empDesignation.roleMstObj.roleId},
            {'role.displayName':empDesignation.roleMstObj.displayName},
            {'department.departmentId':empDesignation.deptMstObj.departmentId}
        ]}).sort({ 'menu.appCode':1,'menu.displayOrder': 1 });
        if (recheck) {
            return res.status(200).json({
                message: 'Here are Specific USER Details',
                user: recheck,
                empEducation,
                empDesignation,
                menuRoles
            })
        } else {
            return res.status(403).json({ message: "Forbidden" })
        }
    } catch (error) {
        return res.status(500).json({ message: "ERROR" })
    }
})
// ! UPDATE BASIC DETAILS
empRouter.put('/updateDetails', verifyToken, async (req, res) => {
    const user = req.user;
    const { employeeName, employeeCode, fatherName, gender, birthDate, joiningDate, mobileNo, mobileNoAlternate, mobileNoEmergency, panNo, uanNo, pfAcNo, aadharNo, officeEmail, alternateEmail, bloodGroupId, marriageDate, languageKnown } = req.body;

    try {
        const updatedUser = await empModel.updateOne(
            { employeeId: user.employeeId },
            {
                $set: {
                    employeeName, employeeCode, fatherName, gender, birthDate, joiningDate, mobileNo, mobileNoAlternate, mobileNoEmergency, panNo, uanNo, pfAcNo, aadharNo, officeEmail, alternateEmail, bloodGroupId, marriageDate, languageKnown
                }
            }
        );
        if (updatedUser.modifiedCount === 0) {
            return res.status(404).json({ message: "No changes made or user not found" });
        }
        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


// ! GET ALL USER'S EVENT
empRouter.get('/officeEvent', async (req, res) => {
    try {
        const employees = await empModel.find(
            { status: 'ACTIVE' },
            { birthDate: 1, joiningDate: 1, employeeName: 1, _id: 0 }
        );

        const today = new Date();
        const todayMonth = today.getMonth();
        const todayDate = today.getDate();

        const filtered = employees
            .map(emp => {
                const birth = emp.birthDate ? new Date(emp.birthDate) : null;
                const join = emp.joiningDate ? new Date(emp.joiningDate) : null;

                const isBirthdayToday = birth && birth.getMonth() === todayMonth && birth.getDate() === todayDate;
                const isJoiningToday = join && join.getMonth() === todayMonth && join.getDate() === todayDate;

                let yearsOfService = null;
                if (isJoiningToday && join) {
                    yearsOfService = today.getFullYear() - join.getFullYear();
                }

                if (isBirthdayToday || isJoiningToday) {
                    return {
                        employeeName: emp.employeeName,
                        isBirthday: isBirthdayToday,
                        isWorkAnniversary: isJoiningToday,
                        yearsOfService: yearsOfService
                    };
                }

                return null;
            })
            .filter(item => item !== null);

        return res.status(200).json(filtered);
    } catch (error) {
        return res.status(500).json(error);
    }
});


module.exports = empRouter