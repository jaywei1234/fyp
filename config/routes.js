/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const StudentController = require("../api/controllers/StudentController");

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


   '/student': { view: 'pages/student' },

  'GET /student/admissionform': 'StudentController.admissionform',
  'POST /student/admissionform': 'StudentController.admissionform',
  'GET /student/admissionform_detail/:id': 'StudentController.admissionform_detail',
  'GET /student/admissionformPreview': 'StudentController.admissionformPreview',
  'POST /student/admissionformPreview': 'StudentController.confirm',
  'GET /student/confirm_student': 'StudentController.confirm',
  'POST student/confirm_student': 'StudentController.confirm',
  '/student/confirm_student/:id' : 'StudentController.confirm_student',
  'GET /student/update_student/:id': 'StudentController.update_student',
  'POST /student/update_student/:id': 'StudentController.update_student',
  'GET /student/view/:id': 'StudentController.view',
  '/student/cancel_student/:id' : 'StudentController.cancel_student',
  '/student/admit_student/:id' : 'StudentController.admit_student',
  '/student/reject_student/:id' : 'StudentController.reject_student',
  'POST /faculty/:id' : 'StudentController.teacherFaculty',
  'GET /faculty/:id' : 'StudentController.teacherFaculty',
  'POST /comment/:id' : 'StudentController.comment',
  'GET /comment/:id' : 'StudentController.comment',
  '/faculty/:id' : 'StudentController.teacherFaculty',
  '/status' : 'StudentController.status',
  'GET /status': 'StudentController.status',
  '/dashboard' : 'StudentController.dashboard',
  'GET /dashboard': 'StudentController.dashboard',
  '/approved' : 'StudentController.approved',
  'GET /approved': 'StudentController.approved',
  '/CE' : 'StudentController.CE',
  'GET /CE': 'StudentController.CE',
  '/CM' : 'StudentController.CM',
  'GET /CM': 'StudentController.CM',
  '/COMM' : 'StudentController.COMM',
  'GET /COMM': 'StudentController.COMM',
  '/FOA' : 'StudentController.FOA',
  'GET /FOA': 'StudentController.FOA',
  '/SCI' : 'StudentController.SCI',
  'GET /SCI': 'StudentController.SCI',
  '/SOB' : 'StudentController.SOB',
  'GET /SOB': 'StudentController.SOB',
  '/SS' : 'StudentController.SS',
  'GET /SS': 'StudentController.SS',
  '/VA' : 'StudentController.VA',
  'GET /VA': 'StudentController.VA',
  '/student/email/:id' : 'StudentController.email',

  'GET /user': 'UserController.index',
  '/user/login': 'UserController.login',
  '/user/update_user/:id': 'UserController.Update_User',
  'GET /user/register': 'UserController.register',
  'POST /user/register': 'UserController.register',
  '/user/forgot-password': 'UserController.forgot',
  '/user/logout': 'UserController.logout',

};
