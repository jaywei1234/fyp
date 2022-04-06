/**
 * Student.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    StudentNo: {
      type: 'number',
      autoIncrement: true

    },

    Confirm: {
      type: 'string',

    },

    EngName: {
      type: 'string'
    },

    ChiName: {
      type: 'string'
    },

    Id: {
      type: 'string'
    },

    Gender: {
      type: 'string'
    },

    Birthd: {
      type: 'ref',
      columnType: 'date'
    },

    Hnumber: {
      type: 'string'
    },

    Mnumber: {
      type: 'string'
    },

    Email: {
      type: 'string'
    },

    EngAddress: {
      type: 'string'
    },

    confirm_student: {
      type: 'string'
    },

    avatar: {
      type: 'string'
    },

    ChiScore: {
      type: 'string'
    },

    EngScore: {
      type: 'string'
    },

    MathScore: {
      type: 'string'
    },

    LSScore: {
      type: 'string'
    },

    E1: {
      type: 'string'
    },

    E1Score: {
      type: 'string'
    },

    E2: {
      type: 'string'
    },

    E2Score: {
      type: 'string'
    },

    statement: {
      type: 'string'
    },

     studentFaculty: {
       type: 'string'
     },

     teacherFaculty: {
       type: 'string'
     },

     comment: {
       type: 'string'
     },

     admit_student: {
       type: 'string'
     },







    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    user: {
      collection: 'User',
      via: 'student'
    }

  },

};

