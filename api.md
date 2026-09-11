# DevTinder APIs

### authRouter

- POST /signup
- POST /login
- POST /logout

### profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

> A connection request can be - ignore(left swipe), interested(right swipe), accepted, rejected

### connectionRequestRouter

- POST /request/send/interested/:id
- POST /request/send/ignored/:id

- POST /request/review/accepted/:id
- POST /request/review/rejected/:id

### userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed - gets profiles of other users on platform. fetched 20-30 at a time
