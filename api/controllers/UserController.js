/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcryptjs');
const { user_list } = require('./AdminController');

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = {
  index: async function (req, res) {
    return res.view('user/index');
  },

  login: async function (req, res) {
    if (req.method == 'GET') { return res.view('user/login'); }

    if (!req.body.email) { return res.badRequest(); }
    if (!req.body.password) { return res.badRequest(); }

    var user = await User.findOne({ Email: req.body.email });

    if (!user) {
      res.status(401);
      return res.send('找不到用戶');
    }

    const match = await bcrypt.compare(req.body.password, user.Password);
    if (!match) {
      res.status(401);
      return res.send('密碼錯誤');
    }

    req.session.regenerate((err) => {
      if (err) { return res.serverError(err); }

      req.session.username = user.username;
      req.session.userId = user.id;

      req.session.ChiName = user.ChiName;
      req.session.Email = user.Email;

      req.session.role = user.role;
      req.session.user = user;

      req.session.Faculty = user.Faculty;

      req.session.EngName = user.EngName;

      req.session.FormSub = user.FormSub;

      return res.redirect(req.query.r || '/user');

    });
  },

  logout: async function (req, res) {

    req.session.destroy(function (err) {

      if (err) return res.serverError(err);


      // return res.ok("Log out successfully.");




      return res.redirect("/user/login");

    });
  },

  register: async function (req, res) {
    if (req.method == 'GET') {
      return res.view('user/register');
    }

    if (req.method == 'POST') {

      req.session.data = req.body.User;

      var users = await User.find({ Username: req.session.data.Username });
      if (users.length > 0) {
        return res.badRequest('username already exists.');
      }

      var emails = await User.find({ Email: req.session.data.Email });
      if (emails.length > 0) {
        return res.badRequest('email already exists.');
      }

      const saltRounds = 10;
      const hash = await bcrypt.hash(req.session.data.Password, saltRounds);
      req.session.data.Password = hash;
      var user = await User.create(req.session.data).fetch();
      // await Membership.addToCollection('user', req.session.userId).members(member.id);

      req.session.data = {};  //clear data of session
      return res.view('user/login');

    }

    if (user) {
      req.session.user = user;
      return res.view('user/index');
    }

  },

  //register: async function (req, res) {
  //  const firebaseAuth = require('firebase-admin').app('admin').auth();
  //  console.log('register');

  //  if (req.method == 'GET') {
  //    return res.view('user/register');
  //  }

  //  const fuser = await firebaseAuth.createUser({
  //    email: req.body.User.Email,
  //    password: req.body.User.Password,
  //    phoneNumber: '+852' + req.body.User.Mobile,
  //    displayName: req.body.User.Username
  //  });
  //  console.log(fuser);
  //  await firebaseAuth.setCustomUserClaims(fuser.uid, { role: req.body.User.role = 'student' });
  //  req.body.User.Uid = fuser.uid;
  //  req.body.User.Password = await bcrypt.hash(req.body.User.Password, 10);
  //  const user = await User.create(req.body.User).fetch();
  //  if (user) {
  //    req.session.user = user;
  //    return res.view('user/index');
  //  }
  //  return res.badRequest(error.message);

  //},

  detail: async function (req, res) {

    const id = req.session.role !== 'admin' || _.isEmpty(req.params.id) ? req.session.userId : req.params.id;
    if (!id) { return res.notFound(); }

    if (req.method === 'GET') {
      const model = await User.findOne(id);
      if (!model) { return res.notFound(); }

      return res.view('user/detail', { 'user': model });
    }

    if (_.isEmpty(req.body)) {
      return res.badRequest('Form-data not received.');
    }

    const data = {
      Username: req.body.Username,
      ChiName: req.body.ChiName,
      EngName: req.body.EngName,
      Date: new Date(req.body.Date),
      Mobile: req.body.Mobile,
      Hnumber: req.body.Hnumber,
      Email: req.body.Email,
    };

    if (!_.isEmpty(req.body.Password)) {
      data.Password = await require('bcryptjs').hash(req.body.User.Password, 10);
    }

    const models = await User.update(id).set(data).fetch();
    if (_.isEmpty(models)) { return res.notFound(); }

    return res.redirect('/user/detail/' + id);
  },

  forgot: async function (req, res) {
    if (req.method === 'GET') {
      return res.view('user/forgot');
    }

    if (validateEmail(req.body.email)) {

    }
    return res.badRequest();
  },


};
