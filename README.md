# node-typescipt
 Node Js + Typescript + SequelizeJs

# sample env variables
- PORT=3001
- NODE_ENV = 'development'

### DB Credentials

- DB_HOST='127.0.0.1'
- DB_PORT='5432'
- DB_USERNAME='postgres'
- DB_PASSWORD=''
- DB_NAME='dummy'
- DB_DIALECT='postgres'

### JWT Secret
- JWT_SECRET='Test12'

### For the production value is true. because rds required SSL for connection.
- DB_SSL='false'

### issue that i got.
- When i have to create migration i directly create it into the migrations folder.
- I always run it in to the production build. that i store into dist folder.
- I run the migration with the below command.

npm run db:migration