var express = require('express');
let ejs = require('ejs');
var router = express.Router();
const puppeteer = require('puppeteer');
const path = require('path');
const {generateReport} = require('../controller/userController');


var mysql = require('mysql');
const session = require('express-session');

var connection  = mysql.createConnection({
    connectionLimit : 1000,
    host     : 'localhost',
    user     : 'root',
    password : 'signiwis@123',
    database : 'signiwis_schema',
    port : 3306
});

this.User_Id = null

router.get(['/','/:id'], (req, res)=>{
  debugger
    var message = req.flash('success')

    UID = req.params.id
    this.User_Id = req.params.id
    UserID = UID
    var query = `select * from employee_rating right join employee_table on employee_rating.Employee_Id = employee_table.Employee_Id`
    req.session.UID = UID
    console.log( this.User_Id)
    connection.query(query, function(error, data, rows){
      connection.query('select * from designation', function(error, designationdata){
        connection.query(`select * from kpi where employee_id = '${req.params.id}'`, function(err,kpiData){
          connection.query(` SELECT * FROM employee_table    ` , function(error,sameDept){
            
            var Departmenet = null;
             data.forEach((data)=>{
              if(data.Employee_Id == req.params.id){
                 Departmenet = data.Employee_Department
              }
            })
            res.render('adminMDPopup', {title:UID,message,session:req.session, sampleData:data, currDepartment:Departmenet, disignationArr:designationdata, KPIdata: kpiData,sameDept:sameDept})
          })
          // res.render('adminMDPopup', {title:UID,message,session:req.session, sampleData:data, currId:UID, disignationArr:designationdata, KPIdata: kpiData})
      

    })
  })
    
      
    })


    






})


var date = new Date()
debugger
var sStrRevrs = date.toISOString().split(":")[0].split("T")[0]
var cDate = sStrRevrs.split("-")
var vFormattedDate = cDate[2]+"/"+cDate[1]+"/"+cDate[0]
debugger
// console.log("Current Date", cDate[2]+"/"+cDate[1]+"/"+cDate[0])

// router.post('/rating',(req,res,next)=>{

//   var UserID = "MD102";
// var singleUserData=null
// var ReviewDate = "nulldate"
// var ReviewName = "nullName"
// var Status = "nullStatus"
// var ReviewRate = 5

//     // var UID = req.params.id
//     var sql = `INSERT INTO employee_notifaction (Employee_Id, Requested_Date, Review_Date, Review_Rating, Reviewer_Name, Status) VALUES ("${UserID}", "${date}", "${ReviewDate}", "${ReviewRate}", "${ReviewName}", "${Status}")`;
   
//                 connection.query(sql, (error, results)=>{

//                 if(error) 
//                 {
                    
//                     res.send("Error occured") 
                         
//                 } 
//                 else 
//                 {
//                     // console.log('data created successfully');
//                     res.redirect("admin")
                    
//                 }
//                 // res.redirect('admin')
        
//             })
  
// })

router.post('/rating/:Department',(req,res,next)=>{
debugger

  var Status = "Pending"
  
     
      //   randomly creating Request Id
 
    const reqId = Math.floor(Math.random() * 1000000);
    const requestId = 'REQID' + reqId; //

    var Departmenet = req.params.Department
    var User_Id = req.session.UID


    var sMockType = req.body.Mock_Type;
    var selectedId = req.body.Reviewer_name.split(',')[1]

    // var reference = `INSERT INTO accept_reject `;
    //               connection.query(reference, [requestId, ])

    const prefix = 'M001';
    const randomNumber = Math.floor(Math.random() * 10000);
    const meetingId = `${prefix}${randomNumber.toString().padStart(4, '0')}`;
    var sql = `INSERT INTO admin_notification (User_Id, Requested_Date, Status, Reviewer_name, Mock_Type, Request_Id,selectedId) VALUES (?, ?, ?, ?, ?, ?, ?)`;
   
            connection.query(sql, [this.User_Id, vFormattedDate, Status,meetingId, sMockType, requestId,selectedId], (error, results)=>{
  
                  if(error) 
                  {
                    debugger
                    req.flash('success', "Request already sent")

                    res.redirect(`/adminMDPopup/${User_Id}`);
                  } 
                  else 
                  {
                    debugger
                    connection.query(`SELECT * FROM employee_table`, function (error, emp_data) {
                      if (error) {
                          debugger;
                          console.error('Error fetching employee data:', error);

                      } else {
                          debugger;
                          var arr = []
                          console.log('Employee Data:', emp_data);
                          emp_data.forEach((ele)=>{
                              if( Departmenet == ele.Employee_Department){
                                const prefix1 = 'M001';
                                  const randomNumber = Math.floor(Math.random() * 100000000);
                                  const meetingId = `${prefix1}${randomNumber.toString().padStart(4, '0')}`;

                                  arr.push([requestId,ele.Employee_Id,ele.Employee_Name,vFormattedDate,sMockType, meetingId]);

                         
                              }
                           
                          })
                          var reference = ` INSERT into accept_reject (Request_Id, emp_id, name, request_date, type_of_mock, table_UId) VALUES ? `
                          connection.query(reference, [arr], function( error, refData){
                                if(error){

                                  throw error
                                }
                                else{
                                  // console.log("success");
                                  req.flash('success', "Request sent successfully");
                                  res.redirect(`/adminMDPopup/${User_Id}`);
                                }
                          })
                      }
              });
              
            }
          
          })
    
  })
  router.get('/pdf/:id', generateReport);

  router.get('/delete/:id/:id2', function(req,res,next){
    debugger
    var id = req.params.id;
    var id2 = req.params.id2;
    connection.query(`DELETE FROM employee_rating WHERE UniqueId = ${id}`, function(error,data){
        debugger
        if(error)
        {
            throw error
        }
        else
        {
            debugger
            res.redirect(`/adminMDPopup/${id2}`)
        }
    })
 })
 router.get('/updatekpipoits/:Department', function(req, res){
    debugger;
    // :Department
    var Departmenet = req.params.Department;
let value = []
const reqId = Math.floor(Math.random() * 1000000);
const requestId = 'REQID' + reqId;
    for(const property in req.query){
      const prefix = 'M001';
const randomNumber = Math.floor(Math.random() * 10000);
const meetingId = `${prefix}${randomNumber.toString().padStart(4, '0')}`;
      
      value.push([req.session.UID,meetingId,property,req.query[property],requestId,vFormattedDate]);
    }
    const prefix = 'M001';
const randomNumber = Math.floor(Math.random() * 10000);
const meetingId = `${prefix}${randomNumber.toString().padStart(4, '0')}`;
    
    let sql = `INSERT into employee_review (employee_id, unique_id,employee_review_val, review_points,Request_Id,Requested_Date) values ?`;
    let sql1 = `INSERT INTO admin_notification (User_Id, Requested_Date, Status,Reviewer_name, Mock_Type,Request_Id) VALUES (?,?,?,?,?,?)`;
    connection.query(sql1,[req.session.UID, vFormattedDate, 'pending',meetingId, 'KPI',requestId, ], function(error, data){
      if(error){
        req.flash('success',`Previous Ratings Not yet Reviewed`);
        res.redirect(`/adminMDPopup/${req.session.UID}`)
      } else{

        connection.query(`SELECT * FROM employee_table`, function (error, emp_data) {
          if (error) {
              debugger;
              console.error('Error fetching employee data:', error);
          } else {
              debugger;
              var arr = []
              console.log('Employee Data:', emp_data);
              emp_data.forEach((ele)=>{
                  if( Departmenet == ele.Employee_Department){     
                    const prefix1 = 'M001';
                      const randomNumber = Math.floor(Math.random() * 100000000);
                      const meetingId = `${prefix1}${randomNumber.toString().padStart(4, '0')}`;
                      arr.push([requestId,ele.Employee_Id,ele.Employee_Name,vFormattedDate,"KPI", meetingId]);
                  }
              })
              var reference = ` INSERT into accept_reject (Request_Id, emp_id, name, request_date, type_of_mock, table_UId) VALUES ? `
              connection.query(reference, [arr], function( error, refData){
                    if(error){
                      throw error
                    }
                    else{
                      // console.log("success");
                      connection.query(sql,[value],function(error, data){
                        if(error){
                          throw error
                        } else{
                        req.flash('success',`KPI Request sent`);
                          res.redirect(`/adminMDPopup/${req.session.UID}`)
                        }
                      })
                    }
                 })
               }    
            });  
          }
       })
    })
  

 router.get('/empDelete/:id',function(req,res,next){
  debugger
    var id = req.session.UID;
    var sql=`Select Employee_Name from employee_table WHERE Employee_Id = ${id}`;
    var sqlData=`Select * from employee_table WHERE Employee_Id = ${id}`;
    var empName;
    var employeeName;
    var employeeDesignation;
    var employeeEmail;
    var employeeDept;
    var employeePassword;
    var employeeIcon;
    var employeeeStatus;

    var insertData = `INSERT INTO resign_employeetab (Employee_Id, Employee_Name, Employee_Designation, Employee_Email,
    Employee_Department, Employee_Password,
    Employee_Icon,Employee_Status,Employee_Mock_Taken,Employee_Mock_Given,IMG_file,dateOfBirth,mobil,employeeNo) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?)`;

    connection.query(sqlData,function(error,data){
      if(error)
      {
          throw error
      }
      else
      {
        debugger
        employeeName= data[0].Employee_Name;
        employeeDesignation= data[0].Employee_Designation;
        employeeEmail= data[0].Employee_Email;
        employeeDept= data[0].Employee_Department;
        employeePassword= data[0].Employee_Password;
        employeeIcon= data[0].Employee_Icon;
        employeeeStatus= "Resigned";
        employeeMockTaken= data[0].Employee_Mock_Taken;
        employeeMockGiven= data[0].Employee_Mock_Given;
        employeeImg = data[0].IMG_file;
        var dateOfBirth = data[0].dateOfBirth;
        var mobile = data[0].mobile;
        var employeeNo = data[0].employeeNo;

        connection.query(insertData,[id,employeeName,employeeDesignation,employeeEmail,employeeDept,employeePassword,employeeIcon,employeeeStatus,employeeMockTaken,employeeMockGiven,employeeImg,dateOfBirth, mobile, employeeNo],function(error, data, rows){
          if(error) 
          {
            debugger
            
            console.log(error);
                                      
          } 
            else 
            {
              debugger
              connection.query(sql,function(error,data){
                if(error)
                {
                    throw error
                }
                else
                {
                  // debugger
                  empName= data[0].Employee_Name
                  connection.query(`DELETE FROM employee_table WHERE Employee_Id = ${id}`,function(error,data){
                    debugger
                    if(error)
                    {
                        throw error
                    }
                    else
                    {
                      req.flash('success',`${id} Employee ${empName} Deleted successfully`);
                      res.redirect("/admin");
                    }
                  })
                }
              })
              
             
                
                
            }
        })
      }
    })


    



    
 })


  router.get('/empEdit/:id',function(req,res,next){
    debugger
      var empId=req.session.UID;
      var empName=req.query.empEditName;
      var empEmail=req.query.empEditEmail;
      var empDesignation=req.query.empEditDesignation;
      var empDept=req.query.empEditDept;
      var empStatus = req.query.Status;

      var sql=`UPDATE  employee_table SET 
      Employee_Name = "${empName}",
      Employee_Designation = "${empDesignation}",
      Employee_Email = "${empEmail}",
      Employee_Department = "${empDept}",
      Employee_Status = "${empStatus}"
       WHERE Employee_Id = "${empId}"
      `;

      connection.query(sql,function(error,data){
        if(error){
          throw error;
        }else{
          // req.flash('success',`${empId} Employee Updated!!`);
         req.flash('success',`${empId} Employee Updated!!`);
          res.redirect(`/adminMDPopup/${empId}`)
          
        }
      })
  })



  //--------------------------------------- Hari Changes ---------------------



  router.get('/adminMDPopup/:department', (req, res) => {
    const department = req.params.department;

    // Add your logic for handling the request based on the department
    console.log("Department selected:", department);
    
    // You can query your database or process as needed
    res.send(`Department: ${department}`);
});

  














  //---------------------------------------------------------------------------

module.exports = router;



