# Simple Impl of Server with Session

Last updated: 16/12/2021  
Tech: TS + Express + `express-session` + `connect-mongo` (for session store)

## Run

- `npm i`
- `npm run build`
- `npm start`

## Notes

- Code structure
  - `/config`: vars for server, mongodb options, express-session options and a method to connect to Mongo
  - `/middlewares`: contains logic code to handle respective routes
  - `/routes`: simple routes for testing
  - `/utils`: just a way to inject props to `req.session` without declare merge
    - [See this](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/49941)

**Manual test - 20/12/2021**

- [x] session obj is saved and can be seen at Mongo Atlas
  - [x] can save custom props inside the session obj, e.g: `{"cookie":{"originalMaxAge":29999,"expires":"2021-12-20T20:29:09.328Z","secure":false,"httpOnly":false,"path":"/","sameSite":"lax"},"userId":"1"}`
  - [x] session is auto del based on `connect-mongo` using TTL ?
- [x] client receives a cookie contains sessionID
  - [x] tested on Postman & a simple React form
  - [x] if client cookie is decay, can see new cookie be updated
  - e.g: `s%3A6c26jOB0_JNzfLvi8OU5QIUw-Yf4Of5L.BmmxNCpoBK1b1hG4M7lZXmlYzuGMQ8XXiL5hfka3tPA`
- [ ] receives from client a HTTP req with the Set-Cookie header attri ?
  - [ ] use that to authN user to protected routes

## Bugs
