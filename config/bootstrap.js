/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

const bcrypt = require('bcryptjs');

module.exports.bootstrap = async function(done) {

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)

  const admin = await User.findOne({Username:'admin1'});
  if (!admin) {
    await User.create({Username:'admin1', Password:await bcrypt.hash('hkbu123456', 10), role:'admin',ChiName:'管理員',EngName:'Administrator',Email:'admin@admin.com',Date:new Date()});
    await User.create({Username:'teacher1', Password:await bcrypt.hash('hkbu123456', 10), role:'teacher',ChiName:'教師',EngName:'Teacher',Email:'teacher@teacher.com',Faculty:'SCI',Date:new Date()});
    await User.create({Username:'teacher2', Password:await bcrypt.hash('hkbu123456', 10), role:'teacher',ChiName:'教師2',EngName:'Teacher2',Email:'teacher2@teacher.com',Faculty:'VA',Date:new Date()});
    await User.create({Username:'teacher3', Password:await bcrypt.hash('hkbu123456', 10), role:'teacher',ChiName:'教師3',EngName:'Teacher3',Email:'teacher3@teacher.com',Faculty:'COMM',Date:new Date()});
    await User.create({Username:'student1', Password:await bcrypt.hash('hkbu123456', 10), role:'student',ChiName:'陳大文',EngName:'Student',Email:'student@student.com',Date:new Date()});
    await User.create({Username:'student2', Password:await bcrypt.hash('hkbu123456', 10), role:'student',ChiName:'教練',EngName:'Student',Email:'student2@student.com',Date:new Date()});
  }

  return done();
};
