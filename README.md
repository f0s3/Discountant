# db

To create a dump from current db use `mysqldump -u root -p discountant > dump.sql`

To apply a dump use `to be written`

To create a migration use `mysqldump --no-data -u root -p discountant > migration.sql`

To apply a migration create database `discountant` and use `sudo mysql discountant < migration.sql`

# Endpoints
-  ### Register
	-  Endpiont:  `POST /register`
	
	- Require: 
		- Body: `{name: string, password: string}`
	
	- Response: `{user_id: int}` Status: `200`
	
- ### Login
	- Endpiont: `POST /login`
	
	- Require: 
		-  Body: `{name:  string, password: string}`
	
	- Response: `{user_id: int}` Status: `200`
	
- ### Add code
	- Endpiont: `POST /code`
	
	- Require: 
		- Body:  `{name: string, image: string}`
		
		- Headers: `{user_id: int}`
		
	- Response: `{code_id: int}` Status: `200`
	
- ### Remove code
	- Endpoint: `DELETE /code/:id`
	
	- Require: 
	
		- Params: `id`
		
		- Headers: `{user_id: int}`
		
	- Response: Status `200`
	
- ### Share code
	- Endpoint: `PUT /code/:id`
	
	- Require: 
	
		- Params: `id`
		
		- Body: `{target_id: int}`
		
	- Response: Status `200`
	
- ### Get all codes
	- Endpoint: `GET /`
	
	- Require:
		
		- Headers: `{user_id: int}`
		
	- Response: `{codes: [{id: int, name: string, image: string}, ...]}` Status: `200`