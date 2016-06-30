Construyendo una Rest API con Sequelize & Express

Para construir un sitio web con express podemos usar express generator.

```

$ yo express

```

![image alt text](image_0.png)

Elegimos Basic, Jade (a.k.a. Pug) como View Engine y las tareas de Grunt, y esperamos que finalice las tareas de instalación npm install & bower install.

Una vez finalizada la operación abrimos una segunda terminal y ejecutamos:

```

$ npm start

> express-api-rest-sqlite@0.0.1 start /Users/cristian/repos/express-api-rest-sqlite

> node ./bin/www

Express server listening on port 3000

```

Si abrimos una nueva pestaña con nuestro navegador apuntando a http://localhost:3000/ deberíamos ver:

![image alt text](image_1.png)

Ya que pre-instalamos las tareas de grunt será preferible que las usemos durante el proceso de desarrollo. Esto nos evitará cosas como tener que reiniciar el server o mandar refrescos al navegador. Por lo tanto hacemos Ctrl+C y corremos el siguiente comando:

```

$ grunt

```

![image alt text](image_2.png)

Crearemos una carpeta db y alojaremos allí nuestra base de datos (archivo database.sqlite).

```

$ mkdir db

```

Dejaremos esta terminal abierta y a continuación instalaremos algunas dependencias que nos permitirán trabajar con SQLite:

```javascript

$ npm install --save sequelize sqlite

Creamos un archivo de conexión a nuestra base de datos y lo llamaremos conn.js

var Sequelize = require('sequelize');

var sequelize = new Sequelize('database', '', '',

      { storage: 'db/database.sqlite', dialect: 'sqlite'});

sequelize

  .authenticate()

  .then(function(err) {

    console.log('Connection has been established successfully.');

  })

  .catch(function (err) {

    console.log('Unable to connect to the database:', err);

  });

module.exports = sequelize;

```

Al ejecutarlo deberíamos ver los siguiente:

```

$ node conn.js

Executing (default): SELECT 1+1 AS result

Connection has been established successfully

```

Si inspeccionamos dicho archivo con un visor de SQLite, en mi caso SQLite Browser veremos que hay dos tablas Employees y Administrators

![image alt text](image_3.png)

Crearemos entonces una carpeta para guardar los modelos correspondientes a nuestra capa de ORM

```

$ mkdir models

```

Iniciaremos por modelar a los empleados creando un archivo employees.js dentro de la carpeta models.

```javascript

var Sequelize = require('sequelize');

var sequelize = new Sequelize('database', '', '',

      { storage: 'db/database.sqlite', dialect: 'sqlite'});

var Employee = sequelize.define('Employees', {

	idEmployee      : { type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true },

	first_name      : Sequelize.TEXT,

	last_name       : Sequelize.TEXT,

	email           : Sequelize.TEXT,

	hashed_password : Sequelize.TEXT

});

Employee.find().then(function(res){

	console.log(res);

});

module.exports = Employee;

```

Creamos un modelo con los mismos campos de la tabla usando sequelize.define, pero al intentar ejecutar este script nos encontramos con el siguiente error:

![image alt text](image_4.png)

Esto se debe a que sequelize intenta usar un par de campos adicionales para guardar un log de fecha sobre las operaciones de alta (*createdAt*) y modificación (*updatedAt*). Y debido a que no tenemos dicho campo en el schema de nuestra tabla se dispara este error. Por suerte podemos indicarle a sequelize que no deseamos operar con esos campos adicionales pasando un objeto de configuración adicional en la línea 13

```diff

var Employee = sequelize.define('Employees', {

	idEmployee      : { type : Sequelize.INTEGER, primaryKey : true, autoIncrement : true },

	first_name      : Sequelize.TEXT,

	last_name       : Sequelize.TEXT,

	email           : Sequelize.TEXT,

	hashed_password : Sequelize.TEXT

+}, {

+	timestamps: false

+});

```

