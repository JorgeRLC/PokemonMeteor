import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Pokemons = new Mongo.Collection('pokemons');

if (Meteor.isServer) {
    Meteor.publish('PokemonsUser', function () {
        //var pokemon = PokemonsList.findOne({_id: id});
        return Pokemons.find({owner: this.userId});
    });
}

Meteor.methods({
    'Pokemons.insert'(index, name = null, level = 1) {
        check(index, Number);
        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        
        numPoke = Pokemons.find({owner: this.userId}).count();

        if (numPoke >= 6) {
            throw new Meteor.Error('no puedes tener mas pokemones');
        }

        Pokemons.insert({
            name,
            level,
            index,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'Pokemons.remove'(id) {
        check(id, String);

        Pokemons.remove(id);
    },
    'Pokemons.update'(id,data) {
        check(id, String);
        Pokemons.update(id,data);
    },
    'Pokemons.upLevel'(id) {
        check(id, String);
        
        Pokemons.update(id,{ $set: {
            level: Pokemons.find(id).level++
        } });
    },
});

