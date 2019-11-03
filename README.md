## Installation
### Install and run server
1. `cd server && npm install`
2. `npm start` or for dev mode, `npm run start:dev`
### Install and run client
1. `cd  ../client && npm install`
2. `npm start` 
3. Navigate to `localhost:3000` in your browser	
## Theory of Operation
The app allows a user to select from a list of contacts. When a contact is selected the chat history between the user and the contact is displayed. In addition, the user can send and receive messages from their contact in real time.
## Decisions
I chose to use [apollo-server](https://www.apollographql.com/docs/apollo-server/api/apollo-server/) rather than [socket](https://socket.io/). I've been using GraphQL with Apollo at work, and I thought this would be a good chance to continue to expand my knowledge.
The UI is written in typescript and bootstrapped with [Create React App](https://create-react-app.dev/). [Apollo-client](https://www.apollographql.com/docs/react/) was used for the GraphQL connection to the server.
To save on time I did not connect a database. Users and messages are stored in local variables. Any history is lost when the server is restarted. To avoid having to handle authentication three users were hard coded.
Something I personally find difficult about working with apollo (and possibly other GraphQL frameworks) in the frontend is how easily it can pollute your components if you follow the documentation. I did my best to try to separate the GraphQL logic to container components so that I could have cleaner display components.
I didn't have the time to add the tests I would have liked to. There are a few frontend tests, and no backend tests.
## Future Work
### Frontend
- Automatically generate typescript types for the GraphQL schema using something like [graphql-code-generator](https://graphql-code-generator.com/docs/getting-started/)
- More/better styling
- Possibly better organization of types and graphql queries. I tried to keep them local to where they're used. As the app grows it might make sense to move centralize them.
- Add routing. Being able to navigate to to a url like `messages/<contact-name>` might be convenient for the user.
- Responsive layout. I used flex box to quickly enable a responsive layout. More care and thought needs to be put in here.
### Backend
- Connect the backend to a database
- Better structure for code
- Add timestamps to messages
### Features
- User Authentication
- Notify the user when they have new messages from a contact in their contact list
- Allow chats between more than two people at a time