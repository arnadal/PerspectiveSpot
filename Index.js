firebase.initializeApp({
  apiKey: "AIzaSyBmC3oT__m1QwQtZZGUJug9Nq0Mk-G65FQ",
  authDomain: "perspectivespot-app.firebaseapp.com",
  databaseURL: "https://perspectivespot-app-default-rtdb.firebaseio.com",
  projectId: "perspectivespot-app",
  storageBucket: "perspectivespot-app.appspot.com",
  messagingSenderId: "61597461758",
  appId: "1:61597461758:web:47c8ca192687901d2149af",
  measurementId: "G-5F26F460WE"
});

Database = firebase.database();

Inputs = {

  Name: document.querySelector(`#Name`),
  Comment: document.querySelector(`#Comment`)

};

function CreatePost() {

  const NewPostKey = Database.ref(`comments/`).push().key;

  Database.ref(`comments/${NewPostKey}`).set({

    Name: Inputs.Name.value,
    Comment: Inputs.Comment.value,
    Timestamp: Date.now()

  });

};

function RenderPost(Data) {



};
