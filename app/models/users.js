var dbconn = require('../../config/dbconn');
var Q = require('q');

var User = function(){
	this.get = function(userId){
		var deferred = Q.defer();
		dbconn.query('SELECT * from users where id = ?', [userId], function(err, rows, fields) {
			if (err){
				deferred.resolve({status: 'error'});
			}else{
				deferred.resolve({ status: 'ok', row: rows });
			}
		  	
		});
		return deferred.promise;
	},

	this.getByEmail = function(email){
		var deferred = Q.defer();
		dbconn.query('SELECT * from users where email = ?', [email], function(err, rows, fields) {
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
		dbconn.query('SELECT * from users', function(err, rows, fields) {
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
		var insQuery = 'INSERT INTO users(name, email, password, profile_image) values(?, ?, ?, ?, ?)';

		dbconn.query(insQuery, data, function(err, result) {
		   if (err){
				deferred.resolve({status: 'error'});
			}else{
				deferred.resolve({ status: 'ok', insertId: result.insertId });
			}
		});
		return deferred.promise;
	},

	this.update = function(data, userId){
		var deferred = Q.defer();
		var updtQuery = 'UPDATE users SET name = ?, email = ?, profile_image = ? WHERE id = ?';
		data.push(userId);

		dbconn.query(updtQuery, data, function(err, result) {
		   if (err){
				deferred.resolve({status: 'error' });
			}else{
				deferred.resolve({ status: 'ok' });
			}
		});
		return deferred.promise;
	},

	this.delete = function(userId){
		var deferred = Q.defer();
		dbconn.query('DELETE from users where id = ?', [userId], function(err, rows, fields) {
			if (err){
				deferred.resolve({status: 'error'});
			}else{
				deferred.resolve({ status: 'ok' });
			}
		  	
		});
		return deferred.promise;
	}
}

module.exports = new User;