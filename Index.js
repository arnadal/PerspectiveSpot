/** Initialize the Firebase application and connect to the Firebase project. */

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

/** A global-scope variable "Database" that is a container for database manipulation of Firebase. */

Database = firebase.database();

/** An object that contains all inputs on the page. */

Inputs = {

  Name: document.querySelector(`#Name`),
  Email: document.querySelector(`#Email`),
  ContactNumber: document.querySelector(`#ContactNumber`),
  Comment: document.querySelector(`#Comment`)

};

// Listen to the database if any child is added.

Database.ref(`Comments/`).on(`child_added`, Snap => {

  RenderPost({

    Name: Snap.child(`Name`).val(),
    Email: Snap.child(`Email`).val(),
    ContactNumber: Snap.child(`Email`).val(),
    Comment: Snap.child(`Comment`).val(),
    Timestamp: Snap.child(`Timestamp`).val()

  });

});


/** A function that sends user-generated information from inputs as a request to the server to be appended into the database. */

function CreatePost() {

  if (
    !Inputs.Name.value ||
    !Inputs.Email.value ||
    !Inputs.ContactNumber.value ||
    !Inputs.Comment.value
  ) return InvalidPost();

  const NewPostKey = Database.ref(`Comments/`).push().key;

  Database.ref(`Comments/${NewPostKey}`).set({

    Name: Inputs.Name.value,
    Email: Inputs.Email.value,
    ContactNumber: Inputs.ContactNumber.value,
    Comment: Inputs.Comment.value,
    Timestamp: Date.now()

  });

};

/** A function that marks the user-generated post invalid. */

function InvalidPost() {

  document.querySelector(`div#InvalidPostMessage`).style.display = `block`;

};

/** A function that renders posts. */

function RenderPost(Data = {}) {

  let NewElement = document.createElement(`div`);
  NewElement.className = `Perspective`;
  NewElement.innerHTML = `

  <small style="float: right;">${TranslateDate(Data.Timestamp)}</small>
  <label>${Data.Name}</label>
  <p>${Data.Comment}</p>

  `;

  document.querySelector(`#PerspectiveList`).appendChild(NewElement);
  document.querySelector(`#NoPerspectiveFoundMessage`).style.display = `none`;

};

/** A function that translates dates into human-readable text. */

function TranslateDate(Timestamp) {

  let MonthList = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

  function Pad60(Integer) {

    let ParsedInteger = Integer;

    if (Integer < 10) ParsedInteger = `0${Integer}`;

    return ParsedInteger;

  };

  let InterprettedDate = new Date(Timestamp);

  let Year = InterprettedDate.getFullYear();
  let Month = MonthList[InterprettedDate.getMonth()];
  let DayOfMonth = InterprettedDate.getDate();
  let Hour = Pad60(InterprettedDate.getHours());
  let Minute = Pad60(InterprettedDate.getMinutes());
  let Second = Pad60(InterprettedDate.getSeconds());

  let RenderedDate = `${Hour}:${Minute}:${Second}, ${DayOfMonth} ${Month} ${Year}`;

  return RenderedDate;

};
