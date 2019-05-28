//Import (require) connection.js into orm.js
const connection = require('../config/connection.js')


//Create methods that will execute MySQL commands in the controllers. 
//Methods needed to use to retrieve and store data in the database.
const orm = {

    //selectAll()
    selectAll: function (callback) {
        //mySQL Query
        connection.query('SELECT * FROM burgers', function (err, result) {
            if (err) throw err;
            callback(result);
        });
    },

    //insertOne()
    insertOne: function (burger_name, callback) {
        connection.query('INSERT INTO burgers SET ?', {
            burger_name: burger_name,
            devoured: false,
        }, function (err, result) {
            if (err) throw err;
            callback(result);
        });

    },

    //updateOne()
    updateOne: function (burgerID, callback) {
        connection.query('UPDATE burgers SET? WHERE?', [{
                devoured: true
            }, {
                id: burgerID
            }],
            function (err, result) {
                if (err) throw err;
                callback(result);
            });
    }
};


// Export the ORM object in module.exports.
module.exports = orm;