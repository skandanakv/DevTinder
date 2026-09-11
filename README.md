# DevTinder

> Tinder for Developers to connect and build their network

- focuses on 2 microservices mainly

1. FE: React
2. BE: Node, Express, Mongo

- created an express server
- learnt diff between package.json and package-lock.json
- learnt how to handle requests, routes and also learnt how to avoid constant restarts with nodemon
- understood handling routes and routes extensions
- HTTP Methods
- Postman Api Testing
- learnt about order of execution in routing
- learnt regex
- query parameters
- dynamic routing
- experimented with multiple route handlers with next
- what is middleware?
- Understood the role of middleware in the request-response cycle
- Experimented with placing next(), console.log(), and res.send() in different positions
- need to middlewares - learntt
- learnt about authorisation
- industry practices for maintaing middleware code
- understood imp of middleware in authorisation and use of next() here
- graceful error handling using 4 variable parameters and try catch block
- status codes

## Implementation

- conected Application to Mongo cluster
- created user schema and model
- created a /signup api
- dummy data pushed using this api call via postman
- adding dynamic data - signup api
- get user by emailId API
- feed api to get all users
- delete user by \_id
- data validation schemas
- API level data validation
- used validator package
- email, password and other schema level validators added
- Api level data validation done
- learnt about password encryption using bcrypt
- login api, api data validation and bcrypt compare
- understood cookies, jwt and token usage
- understood role of browsers here in storing cookies
- res.cookie(); , req.cookies
- deep dive jwt
- learn token validation for every user made request
- jwt.verify() & jwt.sign
- userAuth - Authentication middleware
- token and cookie expiration
