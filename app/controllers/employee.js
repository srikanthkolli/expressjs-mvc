var config = require('../../config');
var employeeModel = require('../models/employee');
var Q = require('q');
var moment = require('moment');
var _ = require('lodash');

var Employee = function(){
	this.list = function(req, res){
		// List all the avb employes
		Q.all(employeeModel.getAll()).done(function(result){
			if(result['status'] == 'ok'){
				res.render(config.root + '/app/views/employee/index', { data: result['rows'] });
			}else{
				res.send('Database error');
			}
		})
		
	},

	this.employeeForm = function(req, res){
		var empData = {first_name:'', last_name:'', email: '', phone:''};
		res.render(config.root + '/app/views/employee/employee-form', { empData: empData});
	},

	this.addEmployee = function(req, res){
		if(!_.isEmpty(req.body)){
			var dataToIns = [];
			dataToIns.push(req.body['first-name']);
			dataToIns.push(req.body['last-name']);
			dataToIns.push(req.body['phone']);
			dataToIns.push(req.body['email']);
			dataToIns.push(moment().format("YYYY-MM-DD"));

			Q.all(employeeModel.add(dataToIns)).done(function(result){
				if(result['status'] == 'ok'){
					res.redirect('/employee/');
				}else{
					res.send('Database error');
				}
			});
		}
	},

	this.editEmployee = function(req, res){
		var empId = req.params['id'];
		if(!_.isEmpty(empId)){
			Q.all(employeeModel.get(empId)).done(function(result){
				if(result['status'] == 'ok'){
					console.log(result['row'][0]['first_name']);
					res.render(config.root + '/app/views/employee/employee-form', { empData: result['row'][0] });
				}else{
					res.send('Database error');
				}
			});
		}
	},

	this.updateEmployee = function(req, res){
		if(!_.isEmpty(req.params['id']) && !_.isEmpty(req.body)){
			var dataToIns = [];
			dataToIns.push(req.body['first-name']);
			dataToIns.push(req.body['last-name']);
			dataToIns.push(req.body['phone']);
			dataToIns.push(req.body['email']);

			Q.all(employeeModel.update(dataToIns, req.params['id'])).done(function(result){
				if(result['status'] == 'ok'){
					res.redirect('/edit-employee/' + req.params['id']);
				}else{
					res.send('Database error');
				}
			});
		}else{
			res.send('Invalid request');
		}
	},

	this.deleteEmployee = function(req, res){
		if(!_.isEmpty(req.params['id'])){
			Q.all(employeeModel.delete(req.params['id'])).done(function(result){
				if(result['status'] == 'ok'){
					res.redirect('/employee');
				}else{
					res.send('Database error');
				}
			});
		}
	}
}

module.exports = new Employee;