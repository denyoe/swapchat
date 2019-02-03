## Chat API in Node JS

### Instructions

---

#### Server (NodeJS)
1. Go to server directory: `cd server`
2. Duplicate the `.env.example` file and rename it to `.env`
3. Install dependencies with: `npm install`
4. Update (MySQL) database details in `server/knexfile.js`
5. Run Migrations `knex migrate:latest --env staging` (You might need to install the migrations CLI `npm install knex -g`)
6. Run Seeders `knex seed:run --env staging` (Default Password: `password`)
7. Start Server with `npm run dev`

Server API URL: `http://localhost:4000/`

You can Run the tests with: `npm test`

***Sample API requests can be found in the root directory and imported: `Swapchat.postman_collection.json`***

---

#### Client (ReactJS)
1. Ensure the NodeJS server is running on port ***4000***
2. Go to the client directory: `cd client`
3. Install depencencies with: `npm install`
4. Run the App with: `npm start`

Notes: The API configuration details for the client are in: `/client/src/config/Api.js`

The application should now be accessible at `http://localhost:3000/`

---

### Description

#### Prerequisites

1.  User and authentication
    *   User creation
    *   Authentication with session or stateless session
    *   You must know which user sent a specific message
2.  Conversation channels
    *   Create a channel
    *   List the channels
    *   List the messages inside a channel
    *   Send a message to a channel
3.  Use a database (MongoDB/MySQL/PostgresQL/Cassandra or other)

#### Extended

1.  A ReactJS client. The client doesn’t need to implement every API feature but should be functional.
2.  Extended user:
    *   Update/delete user
    *   Email verification
    *   Password recovery
3.  Extended channel: 
    *   Delete a channel
    *   A channel owner can invite/kick another user into to/from his channel
    *   Users cannot read nor write into channel they aren’t a member of
3.  Extended message:
    *   Update/delete messages
    *   Add image/file to a message
    *   Url metadata enrichment 
    *   Message advanced search
4.  Api unit testing
