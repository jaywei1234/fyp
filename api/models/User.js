/**
 * User.js
 *
 * @description :: A model definition represents a coachbase table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    Uid: {
      type: 'string'
    },

    Username: {
      type: 'string'
    },

    Password: {
      type: 'string'
    },

    role: {
      type: 'string',
      isIn: ['admin', 'student', 'teacher', 'visitor'],
      defaultsTo: 'student'
    },

    Faculty: {
      type: 'string',
      isIn: ['CE', 'CM','COMM','FOA','SCI','SOB','SS','VA','N/A'],
      defaultsTo:'N/A'
    },

    ChiName: {
      type: 'string',

    },
    EngName: {
      type: 'string',

    },


    Date: {
      type: 'ref',
      columnType: 'datetime'
    },


    Mobile: {
      type: 'string',

    },
    Hnumber: {
      type: 'string',

    },

    Email: {
      type: 'string',
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    student: {
      collection: 'Student',
      via: 'user'
    }

  },

};

