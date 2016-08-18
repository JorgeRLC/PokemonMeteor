import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const PokemonsType = new Mongo.Collection('pokemonsType');
Meteor.methods({
    'pokemonType.insert'(number, name, typeP, levelE = null, evolution = null, imageP) {
        check(name, String);
        check(typeP, String);
        check(imageP, String);
        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        PokemonsType.insert({
            number,
            name,
            typeP,
            levelE,
            evolution,
            imageP,
            createdAt: new Date(),
        });
    },
    'pokemonType.remove'(Id) {
        check(Id, String);

        PokemonsType.remove(Id);
    },
    'pokemonType.update'(Id,data) {
        check(Id, String);
        PokemonsType.update(Id,data);
    },
    'pokemonType.all'() {
        var myFile = JSON.parse(Assets.getText('seed.json'));
        myFile.map((pokemonType)=>(
            PokemonsType.insert(pokemonType)
        ));
    },
});

