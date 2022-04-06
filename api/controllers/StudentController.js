/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    // action - create
    admissionform: async function (req, res) {

        if (req.method == 'GET') { return res.view('student/admissionform', { 'data': req.session.data || {} }); }
        req.session.data = req.body.Student;
        return res.view('student/admissionformPreview', { 'data': req.session.data || {} });
    },

    // action - preview
    admissionformPreview: async function (req, res) {
        if (req.method == 'POST') {

            req.session.data = req.body.Student;

            return res.view('student/confirm_student', { 'data': req.session.data || {} });
        }

    },

    confirm: async function (req, res) {

        if (req.method == 'POST') {
            var student = await Student.create(req.session.data).fetch();
            //  student.ChiName=req.session.ChiName;
            //  student.EngName=req.session.EngName;
            student.FormNum = req.session.Email;
            req.session.FormSub = "yes";
            User.FormSub = "yes";
            student.FormSubmit = "yes";

            return res.redirect("/status");
        }

    },

    confirm_student: async function (req, res) {


        // if (!await User.findOne(req.session.userId)) return res.notFound();

        // const thatPerson = await Student.findOne(req.params.id).populate("worksFor", { id: req.session.userId });

        // if (!thatPerson) return res.notFound();

        // if (thatPerson.worksFor.length)
        // return res.status(451).send("Already aprroved.");   // conflict

        // await User.addToCollection(req.session.userId, 'supervises').members([req.params.id]);



        var year = new Date().getFullYear();
        var pid = parseInt(req.params.id) || -1;
        var num = (year % 100) * 1000;
        var models = await Student.find({ where: { StudentNo: { '>': num } }, sort: 'StudentNo DESC', limit: 1 });
        var model = models[0];
        if (models.length > 0) {
            var model = await Student.update(pid).set({

                confirm_student: 'Y',
                StudentNo: model.StudentNo + 1,


            }).fetch();


        }

        else {

            model = await Student.update(pid).set({
                StudentNo: num + 1,
                confirm_student: 'Y',

            }).fetch();


        }


        model = model[0];

        if (req.wantsJSON) {
            return res.json({ message: "confirm successfully！", url: '/approved' });    // for ajax request
        }
    },

    status: async function (req, res) {
        var student = await Student.find();
        return res.view('profile/status', { 'student': student });

    },

    dashboard: async function (req, res) {
        var student = await Student.find();
        return res.view('profile/dashboard', { 'student': student });

    },

    approved: async function (req, res) {
        var student = await Student.find();
        return res.view('profile/approved', { 'student': student });

    },

    update_student: async function (req, res) {


        var pid = parseInt(req.params.id) || -1;

        if (req.method == 'GET') {

            var model = await Student.findOne(pid);

            if (model != null) { return res.view('student/update_student', { 'student': model }); }
            else { return res.send('No such student!'); }

        } else {

            var model = await Student.findOne(pid);

            var models = await Student.update(pid).set({

                EngName: req.body.Student.EngName,
                ChiName: req.body.Student.ChiName,
                Id: req.body.Student.Id,
                Gender: req.body.Student.Gender,
                Birthd: req.body.Student.Birthd,
                Education: req.body.Student.Education,
                Hnumber: req.body.Student.Hnumber,
                Mnumber: req.body.Student.Mnumber,
                Email: req.body.Student.Email,
                EngAddress: req.body.Student.EngAddress,
                ChiScore: req.body.Student.ChiScore,
                EngScore: req.body.Student.EngScore,
                MathScore: req.body.Student.MathScore,
                LSScore: req.body.Student.LSScore,
                E1: req.body.Student.E1,
                E1Score: req.body.Student.E1Score,
                E2: req.body.Student.E2,
                E2Score: req.body.Student.E2Score,
                statement: req.body.Student.statement,
                studentFaculty: req.body.Student.studentFaculty,

            }).fetch();



            if (models.length > 0) { return res.redirect('/status'); }


            else { return res.send('No such student!'); }
        }
    },

    admissionform_detail: async function (req, res) {

        var student = await Student.findOne(req.params.id);
        if (req.method == 'GET') {
            return res.view('student/admissionform_detail',
                { 'student': student, 'reg': 0 });
        }
    },

    cancel_student: async function (req, res) {
        var pid = parseInt(req.params.id) || -1;
        model = await Student.update(pid).set({
            confirm_student: 'N',

        }).fetch();

        if (req.wantsJSON) {
            return res.json({ message: "reject successfully！", url: '/approved' });    // for ajax request
        }

        //return res.redirect('/student/student_record');

    },

    admit_student: async function (req, res) {
        var pid = parseInt(req.params.id) || -1;
        model = await Student.update(pid).set({
            admit_student: 'Y',

        }).fetch();

        if (req.wantsJSON) {
            return res.json({ message: "admit successfully！", url: '/student' });    // for ajax request
        }
    },

    reject_student: async function (req, res) {
        var pid = parseInt(req.params.id) || -1;
        model = await Student.update(pid).set({
            admit_student: 'N',

        }).fetch();

        if (req.wantsJSON) {
            return res.json({ message: "reject successfully！", url: '/student' });    // for ajax request
        }
    },

    teacherFaculty: async function (req, res) {
        var pid = parseInt(req.params.id) || -1;

        if (req.method == 'GET') {

            var model = await Student.findOne(pid);

            if (model != null) { return res.view('profile/faculty', { 'student': model }); }
            else { return res.send('No such student!'); }

        } else {

            var model = await Student.findOne(pid);

            var models = await Student.update(pid).set({

                teacherFaculty: req.body.Student.teacherFaculty,

            }).fetch();



            if (models.length > 0) { return res.redirect('/approved'); }


            else { return res.send('No such student!'); }
        }

    },

    comment: async function (req, res) {
        var pid = parseInt(req.params.id) || -1;

        if (req.method == 'GET') {

            var model = await Student.findOne(pid);

            if (model != null) { return res.view('profile/comment', { 'student': model }); }
            else { return res.send('No such student!'); }

        } else {

            var model = await Student.findOne(pid);

            var models = await Student.update(pid).set({

                comment: req.body.Student.comment,

            }).fetch();



            if (models.length > 0) { return res.redirect('/student'); }


            else { return res.send('No such student!'); }
        }

    },

    CE: async function (req, res) {
        var student = await Student.find();
        return res.view('profile/CE', { 'student': student });
    },

    CM: async function (req, res) {
        var student = await Student.find();
        return res.view('profile/CM', { 'student': student });
    },

    COMM: async function (req, res) {
        var student = await Student.find();
        return res.view('profile/COMM', { 'student': student });
    },

    FOA: async function (req, res) {
        var student = await Student.find();
        return res.view('profile/FOA', { 'student': student });
    },

    SCI: async function (req, res) {
        var student = await Student.find();
        return res.view('profile/SCI', { 'student': student });
    },

    SOB: async function (req, res) {
        var student = await Student.find();
        return res.view('profile/SOB', { 'student': student });
    },

    SS: async function (req, res) {
        var student = await Student.find();
        return res.view('profile/SS', { 'student': student });
    },

    VA: async function (req, res) {
        var student = await Student.find();
        return res.view('profile/VA', { 'student': student });
    },

    email: async function (req, res) {
        var pid = parseInt(req.params.id) || -1;
        var model = await Student.findOne(pid);
        req.session.data = req.body.User;

        var html = await sails.renderView('student/email', { model: model, layout: false });
        await sails.helpers.sendSingleEmail({
            to: model.Email,
            from: sails.config.custom.mailgunFrom,
            subject: 'University Interview',
            html: html
        });

        if (req.wantsJSON) {
            return res.json({ message: "Email sent！", url: '/student' });
        }
    },

    personal_login: async function (req, res) {

        return res.view('student/personal_login');

    },

    // json function
    json: async function (req, res) {

        var students = await Student.find();

        return res.json(students);
    },

    // action - index
    index: async function (req, res) {

        var models = await Student.find();
        return res.view('student/index', { students: models });

    },

    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Student.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Student Deleted.");

    },

};

