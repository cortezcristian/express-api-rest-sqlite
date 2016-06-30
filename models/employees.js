var Sequelize = require('sequelize');

var sequelize = new Sequelize('database', '', '',
      { storage: 'db/database.sqlite', dialect: 'sqlite'});


var Employee = sequelize.define('Employees', {
	idEmployee      : { type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true },
	first_name      : Sequelize.TEXT,
	last_name       : Sequelize.TEXT,
	email           : Sequelize.TEXT,
	hashed_password : Sequelize.TEXT
}, {
	timestamps: false
});

Employee.findOne().then(function(record){
	console.log(record.get('email'));
});

module.exports = Employee;
