var dbconn = require('../../config/dbconn');
var Q = require('q');

var Employee = function(){
	this.get = function(empId){
		var deferred = Q.defer();
		dbconn.query('SELECT * from employees where emp_id = ?', [empId], function(err, rows, fields) {
			if (err){
				deferred.resolve({status: 'error'});
			}else{
				deferred.resolve({ status: 'ok', row: rows });
			}
		  	
		});
		return deferred.promise;
	},

	this.getAll = function(){
		var deferred = Q.defer();
		dbconn.query('SELECT * from employees', function(err, rows, fields) {
			if (err){
				deferred.resolve({status: 'error'});
			}else{
				deferred.resolve({ status: 'ok', rows: rows });
			}
		  	
		});
		return deferred.promise;
	},

	this.add = function(data){
		var deferred = Q.defer();
		var insQuery = 'INSERT INTO employees(first_name, last_name, phone, email, created_date) values(?, ?, ?, ?, ?)';

		dbconn.query(insQuery, data, function(err, result) {
		   if (err){
				deferred.resolve({status: 'error'});
			}else{
				deferred.resolve({ status: 'ok', insertId: result.insertId });
			}
		});
		return deferred.promise;
	},

	this.update = function(data, empid){
		var deferred = Q.defer();
		var updtQuery = 'UPDATE employees SET first_name = ?, last_name = ?, phone = ?, email = ? WHERE emp_id = ?';
		data.push(empid);

		dbconn.query(updtQuery, data, function(err, result) {
		   if (err){
				deferred.resolve({status: 'error' });
			}else{
				deferred.resolve({ status: 'ok' });
			}
		});
		return deferred.promise;
	},

	this.delete = function(empId){
		var deferred = Q.defer();
		dbconn.query('DELETE from employees where emp_id = ?', [empId], function(err, rows, fields) {
			if (err){
				deferred.resolve({status: 'error'});
			}else{
				deferred.resolve({ status: 'ok' });
			}
		  	
		});
		return deferred.promise;
	}
}

module.exports = new Employee;