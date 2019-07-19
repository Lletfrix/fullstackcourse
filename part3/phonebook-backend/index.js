const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
];


app.use(bodyParser.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan( (tokens, req, res) => {
    const logged = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ]

    if (tokens.method(req, res) === 'POST')
        logged.push(tokens.body(req, res));

    return logged.join(' ');
}));

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body){
        return res.status(400).json({error:'content missing'});
    }
    if (!body.number || !body.name){
        return res.status(400).json({error:'name or number is missing'});
    }
    if ((persons.map(p => p.name)).includes(body.name)){
        return res.status(400).json({error:'name must be unique'});
    }
    const person = ({
        id : Math.floor(Math.random()*300000),
        name: body.name,
        number: body.number
    });
    persons = persons.concat(person);
    res.json(person);
})

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    person = persons.find(p => p.id == id)
    if (person)
        res.json(person);
    else
        res.status(404).end();
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id != id);
    res.status(204).end();
});

app.get('/info', (req, res) => {
    const text = 'Phonebook has info for ' + persons.length + ' people';
    const day = new Date();
    res.send('<div>'+text+'<br>'+day+'</div>');
});

port = 3001;
app.listen(port);
console.log('sv running on port ' + port);
