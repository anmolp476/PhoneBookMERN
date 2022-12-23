require('dotenv').config({ path: 'variables.env' })
const express = require("express");
const app = express();
const cors = require('cors');
const Person = require('./models/phoneNumber')

app.use(cors());
app.use(express.json());

app.get("/api/persons", (request, response) => {
  Person.find({}).then((theLogs) => {
    response.json(theLogs);
  })
});

app.get("/", (request, response) => {
  response.write("<h1>Hey</h1>");
});


app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person);
  })
})


app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json(
      {
        error: "content missing"
      }
    )
  }
  const newPerson = Person(
    {
      name: body.name,
      number: body.number
    })

  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  })
})


app.delete("/api/persons/:id", (request, response) => {
  const thisId = request.params.id;

  Person.findOneAndDelete({ id: { thisId } }, (err, docs) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Deleted User: ", docs);
    }
  })

  response.status(204).end();
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
