debugger
var express = require('express');
var router = express.Router();
var router2 = express.Router();
var multer = require('multer')
const axios = require('axios');
var request1 = require("request");
const upload = multer({storage:multer.memoryStorage()})

// var popup = require('popups');

// var database = require('../database')


debugger
const { request } = require('../app');
const session = require('express-session');
debugger
var mysql = require('mysql');
const app = require('../app');
var connection  = mysql.createConnection({
    connectionLimit : 1000,
    host     : 'localhost',
    user     : 'root',
    password : 'signiwis@123',
    database : 'signiwis_schema',
    port : 3306

});
debugger
/* GET users listing. */
router.get('/', 
    // async(req, res)=>{
    // try {
        
    //     const response = await axios.get('https://api.greythr.com/employee/v2/employees',{
    //         Headers: {
    //             'Access-Token': '3EugofsPmeIqG8_OtLacebu8GNRah8emajQvsL1l7Po.wNX32VD57Wurnp53hYYaMJZE8wLXXVzqPxhp12fXnpc',
    //             'x-greythr-domain': 'signiwistech1.greythr.com'
    //         } 
    //     })
    //     res.json(response.data);

    // } catch (error) {
    //     debugger
    // }

// const accessToken = await generateAccessToken();
// const url = `https://api.greythr.com/employee/v2/employees`
// const response = await fetch(url, {
//     method: "GET",
//     headers:{
//         "Content-Type": "application/json",
//         'Access-Token': accessToken,
//         'x-greythr-domain':`signiwistech1.greythr.com`

//     }
// })
// const data =await response.json();
// console.log(data);
// res.write(data)

// })
// async function generateAccessToken(){
//     const response = await axios({
//         url: "https://signiwistech1.greythr.com/uas/v1/oauth2/client-token",
//         method:"post",
//         data:"grant_type=client_credentials",
//         auth: {
//             username: "Ganesh",
//             password:"89dd801c-a874-4ec5-b59d-67fa34153d18"
//         }
//     })
//     return response.data.access_token;
// }
     function(req, res, next) {
    debugger
    var message = req.flash('success');
    var message1 = req.flash('success');
    var largestNumber = `SELECT MAX(Employee_Id) AS greatest_value
    FROM (
        SELECT Employee_Id FROM employee_table
        UNION
        SELECT Employee_Id FROM resign_employeetab
    ) AS Largest_value;`

    connection.query('SELECT * FROM employee_table', function(error, data){
        connection.query('SELECT * FROM review_status', function(error, data2){
            connection.query(largestNumber,function(error3,data3){
                // debugger
                // console.log(data3[0]);
                // res.render('admin', {title:"Welcome to Signiwis", message ,session:req.session,sampleData:data, sampleData2:data2, newId:data3})

                connection.query('SELECT * FROM designation',function(error,data4){
 
 
                    debugger
                    console.log(data4[0]);
                    res.render('admin', {title:"Welcome to Signiwis", message ,session:req.session,sampleData:data, sampleData2:data2, newId:data3, designation:data4})
 
                })

            })
            
         })
       
    //    res.render('admin', {title:"Welcome to Signiwis", session:req.session, sampleData:data})
       
    });

   
});
// router.get('/searchEmp', async(req, res)=>{
// debugger
//     var searchId = req.query.searchId;

//       try {
        
//         const accessToken = await generateAccessToken();
// console.log(accessToken);
// const url = `https://api.greythr.com/employee/v2/employees/${searchId}`
// const response = await fetch(url, {
//     method: "GET",
//     headers:{
//         "Content-Type": "application/json",
//         'Access-Token': accessToken,
//         'x-greythr-domain':`signiwistech1.greythr.com`
//     }
// })
// const data =await response.json();
// console.log(data);
// req.session.employeeId = data.employeeId;
// req.session.dateOfBirth = data.dateOfBirth;
// req.session.email = data.email;
// req.session.employeeNo = data.employeeNo;
// req.session.gender = data.gender;
// req.session.mobile = data.mobile;
// req.session.name = data.name;
//     res.end();
// // req.flash('success', `Data fetched for ${data.name}`);
// // res.redirect('/admin');



//     } catch (error) {
//         debugger
//         req.flash('success', error)
//         res.redirect('/admin')

//     }




// })
// async function generateAccessToken(){
//     const response = await axios({
//         url: "https://signiwistech1.greythr.com/uas/v1/oauth2/client-token",
//         method:"post",
//         data:"grant_type=client_credentials",
//         auth: {
//             username: "Ganesh",
//             password:"89dd801c-a874-4ec5-b59d-67fa34153d18"
//         }
//     })
//     return response.data.access_token;
// }


router.get('/resign', function(req, res, next){
    debugger
        
        // connection.query('SELECT * FROM employee_table', function(error, data){
            
          
                res.redirect('/resignEmpPopup')
                
           
    
    // })
    });

router.get('/admin/:id',function(req, res){
debugger
var id = request.params.id   

var query = `SELECT * FROM employee_table WHERE Employee_Id = ${id}`
    
    connection.query(query, function(error, data, rows){
debugger
        
        res.redirect('adminMDPopup', {title:"Welcome to Signiwis", session:req.session, sampleData:data})
        
     })
   
})




router.post('/designation',function(req, res ){
    debugger;
    var sNewDesignation = req.body.designationName;
    var sql = `INSERT INTO designation (designationName) values(?)`
    connection.query(sql,[sNewDesignation],function(error, data){
        if(error){
            console.log(error);
        } else{
            res.redirect('/admin');
        }
    })
   
 })
















router.get('/fetchuser', (req, res)=>{
    debugger

    var UId = req.body.EmpIdForFeatchData

    var query = `SELECT * FROM employee_table WHERE Employee_Id = ${UId}`
    
    connection.query(query, function(error, data, rows){
debugger
        session.UId = UId
        res.render('admin', {title:"Welcome to Signiwis", sampleData:data})

      debugger 
        
     })
})
 router.get('/delete/:id', function(req,res,next){

    debugger
    var id = req.params.id;
    connection.query(`DELETE FROM review_status WHERE Unique_Id = ${id}`, function(error,data){
        debugger
        if(error)
        {
            debugger
            throw error;
            
            
           
        }
        else
        {
            debugger
            res.redirect("/admin")
        }
    })
 })

 router.post('/addEmployee',upload.single('Add_Employee_Image'),async(req,res,next)=>{
debugger
    try {
        var empId=req.body.Add_Employee_Id
        const accessToken = await generateAccessToken();
console.log(accessToken);
const url = `https://api.greythr.com/employee/v2/employees/${empId}`
const response = await fetch(url, {
    method: "GET",
    headers:{
        "Content-Type": "application/json",
        'Access-Token': accessToken,
        'x-greythr-domain':`signiwistech1.greythr.com`
    }
})
const data =await response.json();
console.log(data);
req.session.employeeId = data.employeeId;
req.session.dateOfBirth = data.dateOfBirth;
req.session.email = data.email;
req.session.employeeNo = data.employeeNo;
req.session.gender = data.gender;
req.session.mobile = data.mobile;
req.session.name = data.name;

debugger
;
var empName=data.name;
var empDesignation=req.body.Add_Employee_Designation;
var empEmail=data.email;
var empDept=req.body.Add_Employee_Department;
var empGender=data.gender;
var empPassword= 'Default@123';
var empStatus='Working';
var empMockTaken = 0;
var empMockGiven = 0;
var img = req.file.buffer.toString('base64');
var dateOfBirth = data.dateOfBirth;
var mobile = data.mobile;
var employeeNo = data.employeeNo;


console.log(img);

var file = req.file.uploaded_image;
console.log(file);




var sql = `INSERT INTO employee_table (Employee_Id, Employee_Name, Employee_Designation, Employee_Email,
    Employee_Department, Employee_Password,
    Employee_Icon,Employee_Status,Employee_Mock_Taken,Employee_Mock_Given,IMG_file,dateOfBirth,mobil,employeeNo) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?)`;


connection.query(sql,[empId,empName,empDesignation,empEmail,empDept,empPassword,empGender,empStatus,empMockTaken,empMockGiven,img,dateOfBirth,mobile,employeeNo],function(error, data, rows){
    if(error) 
{
  debugger
  
  console.log(error);
                             
} 
else 
{
  debugger
    console.log('data created successfully');
    req.flash('success',"Employee Added Successfully");
    res.redirect("/admin")
    
}
}
)} catch (error) {
        debugger
        req.flash('success', error)
        res.redirect('/admin')

    }






  
    
 }) 
 async function generateAccessToken(){
    const response = await axios({
        url: "https://signiwistech1.greythr.com/uas/v1/oauth2/client-token",
        method:"post",
        data:"grant_type=client_credentials",
        auth: {
            username: "Ganesh",
            password:"89dd801c-a874-4ec5-b59d-67fa34153d18"
        }
    })
    return response.data.access_token;
}

module.exports = router;
