require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Person = require('./models/person');

const app = express();

mongoose.set('useFindAndModify', false);
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan( (tokens, req, res) => {
    const logged = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ];

    if (tokens.method(req, res) === 'POST')
        logged.push(tokens.body(req, res));

    return logged.join(' ');
}));

app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person
        .save()
        .then(savedPerson => res.json(savedPerson.toJSON()))
        .catch(error => next(error));
});

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons.map(p => p.toJSON()));
    })
        .catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findById(id).then(p => {
        if (p){
            res.json(p.toJSON());
        } else {
            res.status(404).end();
        }
    }).catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.deleteOne({ _id: id }).then(() => {
        res.status(204).end();
    }).catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    const person = {
        name: req.body.name,
        number: req.body.number
    };
    Person.findByIdAndUpdate(id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON());
        })
        .catch(error => next(error));
});

app.get('/info', (req, res) => {
    Person.countDocuments({}).then(count => {
        const text = 'Phonebook has info for ' + count + ' people';
        const day = new Date();
        res.send('<div>'+text+'<br>'+day+'</div>');
    });
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error:'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformed id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }
    next(error);
};
app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT);
console.log('sv running on port ' + PORT);
