Task 2. Express REST service
Let's try to create a competitor for Trello!

Create an Express application, the application should operate with the following resources:

User (with attributes):
{ id, name, login, password }
Board (set of columns):
{ id, title, columns }
Column (set of tasks):
 { id, title, order }
Task:
{
  id,
  title,
  order,
  description,
  userId, //assignee
  boardId,
  columnId
}
Details:

For User, Board and Task REST endpoints with separate router paths should be created

/users
GET /users - get all users (remove password from response)
GET /users/:id - get the user by id (ex. “/users/123”) (remove password from response)
POST /users - create user
PUT /users/:id - update user
DELETE /users/:id - delete user
/boards
GET all
GET by id
POST
PUT
DELETE
/tasks
GET all by boardId
GET by id
POST
PUT
DELETE
When somebody DELETE Board, all its Tasks should be deleted as well.

When somebody DELETE User, all Tasks where User is assignee should be updated to put userId=null.

For now, these endpoints should operate only with in-memory (hardcoded) data, in the next tasks we will use a DB for it. You may organize your modules with the consideration that the data source will be changed soon.

An application/json format should be used for request and response body.

Do not put everything in one file - use a separate file for application creation (bootstrapping), for controllers (routers) and code related to business logic. Also split files to different modules depends on a domain (user-related, board-related, etc...).

To run the service “npm start” command should be used.

Service should listen on PORT 4000.

Hints

To test the service CRUD methods you can use Swagger html (see README.md).
To generate all entities “id”s use uuid package.
