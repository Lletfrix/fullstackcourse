const mongoose = require('mongoose');

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('Usage is: \n\t > node mongo.js <password> [<name> <number>]');
    return;
}

const password = process.argv[2];
const url =
    'mongodb+srv://lletfrix:'+password+'@cluster0-tb3vv.mongodb.net/phonebook?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3){
    console.log('phonebook:');
    Person.find({}).then(resp => {
        resp.forEach(person => {
            console.log(person.name, person.number);
        });
        mongoose.connection.close();
    });
} else if (process.argv.length === 5){

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });
    person.save().then(() => {
        console.log('added ' + person.name + ' number ' + person.number + ' to phonebook');
        mongoose.connection.close();
    });
}
