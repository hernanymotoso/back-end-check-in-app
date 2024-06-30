# App

## FRs (Functional requirements) 

- [x] It should be possible to register;
- [ ] It should be possible to autenticate;
- [ ] It should be possible to get an authenticated user profile; 
- [ ] It should be possible to obtain the number of check-ins performed by the logged in user; 
- [ ] It should be possible the user get his check-ins history;
- [ ] It should be possible for the user to search for nearby gyms;
- [ ] It should be possible for the user to search gyms by name;
- [ ] It should be possible for the user to check in at a gym; 
- [ ] It should be possible to validate an user's  check-in;
- [ ] It should be possible to register a gym;

## BRs (Business rules)

- [X] The user should not be able to register with a duplicate e-mail;
- [ ] The user cannot make 2 check-ins on the same day;
- [ ] The user cannot check-in if he is not near(100m) the gym;  
- [ ] Check-in can only be validated up to 20 minutes after creation;
- [ ] Check-in can only be validated by administrators;
- [ ] The academy can only be registered by administrators;

## NFRs (Non-Functional Requirements)

- [ ] User password must be encrypted
- [ ] The application data must be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token)