import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Pokemons } from './pokemons.js';

export const PokemonsList = new Mongo.Collection('pokemonsList');

if (Meteor.isServer) {
    Meteor.publish('PokemonsList.rest', function (id) {
        Meteor.call('PokemonsList.Restore', id);
        return 'OK';
    });
    
    Meteor.publish('PokemonsList', function () {
        return PokemonsList.find();
    });
    
    Meteor.publish('PokemonListUser', function (id) {
        ind = [];
        Pokemons.find({owner: this.userId}).map((poke)=>{
            ind[ind.length] = poke.index;
        });
        return PokemonsList.find({index: ind});
    });
}

Meteor.methods({
    'PokemonsList.insert'(number) {
        check(number, String);
        var pokemon = JSON.parse(Assets.getText('pokemon/'+ number +'.json'));
        PokemonsList.insert({
            index: pokemon.index,
            name: pokemon.name,
            types: pokemon.types,
            evolution: pokemon.evolutions,
            createdAt: new Date()
        });
    },
    'PokemonsList.remove'(id) {
        check(id, String);
        PokemonsList.remove(id);
    },
    'PokemonsList.update'(id,data) {
        check(id, String);
        PokemonsList.update({_id: id},{$set: data});
    },
    'PokemonsList.Restore'(id) {
        check(id, String);
        pok = PokemonsList.findOne({_id: id});
        var s = pok.index + '';
        while (s.length < 3) s = "0" + s;
        var pokemon = JSON.parse(Assets.getText('pokemon/'+ s +'.json'));
        PokemonsList.update({_id: id},{
            index: pokemon.index,
            img: s + pokemon.name,
            name: pokemon.name,
            types: pokemon.types,
            evolution: pokemon.evolutions,
            createdAt: new Date()
        });
    },
    'PokemonsList.allList'(num1, num2) {
        var i;
        for(i = num1; i <= num2; i++){
            var s = i + '';
            while (s.length < 3) s = "0" + s;
            var pokemon = JSON.parse(Assets.getText('pokemon/'+ s +'.json'));
            PokemonsList.insert({
                index: pokemon.index,
                img: s + pokemon.name,
                name: pokemon.name,
                types: pokemon.types,
                evolution: pokemon.evolutions,
                createdAt: new Date()
            });
        }
    },

    'PokemonsList.clearAll'() {
        var pokemons = PokemonsList.find({});
        pokemons.map((pokemonType)=>(
            PokemonsList.remove(pokemonType._id)
        ));
    },
});

