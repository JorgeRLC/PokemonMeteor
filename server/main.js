import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import '../imports/api/pokemons.js';
import '../imports/api/pokemonsType.js';
import '../imports/api/pokemonsList.js';
import './methods/miscFunc.js';

Meteor.startup(() => {
    // Meteor.call('PokemonsList.clearAll');
    // Meteor.call('PokemonsList.allList',1,151);
    
});
