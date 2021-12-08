<h2>Node.js server (express.js)</h2>
<h3>Overview</h3>
<p>API for creating and updating notes.</p>
<p>Greetings page is available before authorization. To get notes, create new ones, update and delete them user has to send header with name "Authorization" and value "Bearer ${token}", generated on authorization/registration. Token expires in 3 hours and can be renewed by sending to "api/login/refresh" refresh token, which is also generated on authorization/registration and is active durind 1 day. Pagination is applied to getting notes at "api/notes", each page contains maximum 10 notes. Notes can be filtered by titles and dates sent in parameters.</p>
<h4>Validation rules:</h4>
<p>Email must be at least 5 and not more than 30 caracters long.</p>
<p>Password must be at least 8 and not more than 20 caracters long and include 1 uppercase, 1 lowercase caracter, 1 number and 1 special caracter.</p>
<p>Note title must be at least 3 caracters long.</p>
<p>Note content must be at least 3 and not more than 500 caracters long.</p>

<h3>Task 1</h3>
<h5>Links to heroku:</h5>
<a href="https://node-training-app-itech.herokuapp.com/api/greetings/"><p>Bad request: name undefined</p></a>
<a href="https://node-training-app-itech.herokuapp.com/api/greetings?name=User"><p>Html response</p></a>

<h3>Task 2</h3>
<h5>Link to heroku:</h5>
<a href="https://node-training-app-itech.herokuapp.com/api/notes"><p>Get notes</p></a>
<h5>Postman collection:</h5>
<a href="https://go.postman.co/workspace/Julia-Maliutsina~b5ce7cf5-293e-4ced-8c11-d13fce3b5416/collection/18621131-c9a597b8-26d9-4331-b815-c5a92ab84a59"><p>Notes API requests collection</p></a>

<h3>Task 3</h3>
<h5>Link to heroku:</h5>
<a href="https://node-training-app-itech.herokuapp.com/api/notes"><p>Get notes</p></a>
<h5>Postman collection for validation check:</h5>
<a href="https://go.postman.co/workspace/Julia-Maliutsina~b5ce7cf5-293e-4ced-8c11-d13fce3b5416/collection/18621131-20ceebfd-2163-47d6-98c2-550f6086773d"><p>Notes post and put requests collection</p></a>

<h3>Task 4</h3>
<h5>Link to heroku:</h5>
<a href="https://node-training-app-itech.herokuapp.com/api/notes"><p>Get notes - first page</p></a>
<h5>Postman collection for all requests:</h5>
<a href="https://go.postman.co/workspace/Julia-Maliutsina~b5ce7cf5-293e-4ced-8c11-d13fce3b5416/collection/18621131-878ff4c2-db54-4b2f-a715-d8790f862957"><p>Notes API requests collection with validation, filters, pagination and errors handler.</p></a>

<h3>Task 5</h3>
<h5>Link to heroku:</h5>
<a href="https://node-training-app-itech.herokuapp.com/api/notes"><p>Get notes - first page</p></a>
<h5>Postman collection for all requests:</h5>
<a href="https://go.postman.co/workspace/Julia-Maliutsina~b5ce7cf5-293e-4ced-8c11-d13fce3b5416/collection/18621131-8891f1f9-b5aa-4b1d-8837-375f2bd884ab"><p>Notes API requests with jwt.</p></a>
