/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {
    index: async function(req, res) {
      return res.view('admin/index');
    },
  
    email_list: async function(req, res) {
      return res.view('admin/email/index', {emails:await Email.find()});
    },
  
    email_detail: async function(req, res) {
      return res.json(await Email.update(req.params.id).set(req.body.Email).fetch());
    },
  
    user_list: async function(req, res) {
      return res.view('admin/user/index', {news:await User.find({sort:'create_at DESC'})});
    },
  
    user_detail: async function(req, res) {
  
    },
  
  };
  
  