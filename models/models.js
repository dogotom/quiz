var path = require('path');

// Postgres DATABASE_URL = postgres://user_passwd@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name 	= (url[6]||null);
var user 		= (url[2]||null);
var pwd 		= (url[3]||null);
var protocol 	= (url[1]||null);
var dialect 	= (url[1]||null);
var port 		= (url[5]||null);
var host 		= (url[4]||null);
var storage		= process.env.DATABASE_STORAGE;

// Cargar modelo ORM
var Sequelize = require('sequelize');

// usar BBDD SQLite
var sequelize = new Sequelize(DB_name, user, pwd, 
	{	dialect: dialect, 
		protocol: protocol,
		port: port,
		host: host,
		storage: storage,
		omitNull: true
	});

// importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; 	// exportar definicion de tabla quiz

// crear e inicializar la tabla
sequelize.sync.sucess(function()) {
	// success ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count)) {
		if(count === 0) {		// se inicializa solo si está vacía
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			})
			.success(function() {console.log('Base de datos inicializada')});
		};	
	};
};