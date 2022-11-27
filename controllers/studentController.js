
const path = require('path');

const { readFileSync, writeFileSync } = require('fs');
const {verifyAccountMail} = require('../utility/sendEmail');


//Get All verifyed student
const getAllStudent = (req, res) => {

    const studnts = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

    const verifyedStudent = studnts.filter( data=> data.isVerifyed == true );

    res.render('student/index', {
        studnts : verifyedStudent 
    });
    
}

//Get All Unverifyed student
const getAllUnverifyedStudent = (req, res) => {

    const studnts = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

    const unverifyedStudent = studnts.filter( data=> data.isVerifyed == false );

    res.render('student/unverifyed', {
        studnts : unverifyedStudent 
    });
    
}

//create student
const createStudent = ( req, res )=> {

    res.render('student/create');
}

//student data store to json db 

const studentDataStore = async (req, res) => {

    const {name, email, cell, location} = req.body;

    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));
    let last_id = 1;
    if (students.length > 0) {
        last_id = students[students.length - 1].id + 1; 
    }
        
    //creat token
     const token = Date.now() + '_' + Math.floor(Math.random() * 10000);


    //Account verification email sending
   await verifyAccountMail(email, 'Verify Your Account', {
        name, email, cell, token
    });


    students.push({
        id : last_id,
        name : name,
        email : email,
        cell : cell,
        location : location,
        photo : req.file ? req.file.filename : 'avatar.png',
        isVerifyed : false,
        token : token
    }) 

    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(students));

    res.redirect('/student');


}




//single student
const showSingStudent = ( req, res )=> {

    const {id} = req.params;

    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

    const singleStudent = students.find(data => data.id == id);

    
    res.render('student/show', { singleStudent });

}

//edit student
const editStudent = ( req, res )=> {

    const {id} = req.params;

    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

    const student = students.find( data => data.id == id )

    res.render('student/edit', {
        student : student
    });



}

//update student
const updateStudent = (req, res)=>{

    const {id} = req.params;
    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

    students[students.findIndex(data=> data.id == id)] = {
        ...students[students.findIndex(data=> data.id == id)],
        name : req.body.name,
        email : req.body.email,
        cell : req.body.cell,
        location : req.body.location
    }

    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(students));

    res.redirect('/student');

}


//Delete student
const deleteStudent =(req, res)=>{

    const {id} = req.params;

    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

    const newStudentData = students.filter( data => data.id != id);




    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(newStudentData));

    res.redirect('/student')

}


//Verify student
const verifyStudentAccount =(req, res)=>{

    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

    const token = req.params.token;

    students[students.findIndex(data => data.token == token )] = {
        ...students[students.findIndex(data => data.token == token )],
        isVerifyed : true,
        token : ''
    }


    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(students));

    //redirect
    res.redirect('/student')


}


module.exports = {
    getAllStudent,
    createStudent,
    showSingStudent,
    editStudent,
    studentDataStore,
    deleteStudent,
    updateStudent,
    getAllUnverifyedStudent,
    verifyStudentAccount
    
}