const path = require('path');
const express = require('express');
const { getAllStudent, createStudent, showSingStudent, editStudent, studentDataStore, deleteStudent, updateStudent, getAllUnverifyedStudent, verifyStudentAccount } = require('../controllers/studentController');

const multer = require('multer');


const router = express.Router();




//Multer init

const storage =  multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/students'));
    }, 
    filename : (req, file, cb)=> {
        cb(null, Date.now() + '_' + file.originalname);
    }
});


const studentImageMiddleware = multer({
    storage : storage
}).single('student_image');




//index page route

router.get('/', getAllStudent );
router.get('/unverifyed', getAllUnverifyedStudent );
router.get('/verify/:token', verifyStudentAccount );

router.get('/create', createStudent );
router.post('/create', studentImageMiddleware, studentDataStore );

router.get('/:id', showSingStudent );


router.get('/edit/:id', editStudent );
router.post('/update/:id', studentImageMiddleware, updateStudent );

//Delete student route
router.get('/delete/:id', deleteStudent );





module.exports = router;