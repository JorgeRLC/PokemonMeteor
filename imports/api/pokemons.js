import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Pokemons = new Mongo.Collection('pokemons');
Meteor.methods({
    'pokemons.insert'(name = null, level = 1, pokemonTypeId) {
        check(level, String);
        check(pokemonTypeId, Number);
        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Pokemons.insert({
            name,
            level,
            pokemonTypeId,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'pokemons.remove'(id) {
        check(id, String);

        Pokemons.remove(id);
    },
    'pokemons.update'(id,data) {
        check(id, String);
        Pokemons.update(id,data);
    },
    'pokemons.upLevel'(id) {
        check(id, String);
        
        Pokemons.update(id,{ $set: {
            level: Pokemons.find(id).level++
        } });
    },
});

