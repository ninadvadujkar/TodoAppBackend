# TodoAppBackend

This project is a node server that has features to create a todo, delete a todo and get todo list. All the todo APIs are protected using jwt.
The jwt token is sent to the client on successful login.
Due to unavailability of a database, the todo data is stored in a json file. Similarly, the login credentials are hard-coded and saved in a json file.
In order to successfully login, the username and password to be supplied is "admin".

## Steps to start the server

1. Clone this repository using below command

```sh
$ git clone https://github.com/ninadvadujkar/TodoAppBackend.git
```

2. Install dependencies

```sh
$ cd TodoAppBackend && npm install
```

3. Start the server

``` sh
$ npm start
```

After these steps the server should start on port 3000 and will start serving the APIs.

P.S. I wanted to add atleast a couple of unit tests but I couldn't get much time for it in the stipulated timeframe hence avoided it.
