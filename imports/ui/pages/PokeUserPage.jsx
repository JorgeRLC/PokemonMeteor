import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { PokemonsList } from '../../api/pokemonsList.js';
import { Pokemons } from '../../api/pokemons.js';

import PokemonList from '../components/PokemonList.jsx';
import PokemonChips from '../components/PokemonChips.jsx';


// App component - represents the whole app
class PokeUserPage extends Component {
    
    render() {
        return (
            <div className="col s12">
                <PokemonList
                    pokemonsList={this.props.pokemonsList}
                    isUser={false}
                />
            </div>
        );
    }
}

PokeUserPage.propTypes = {
    pokemonsList: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
    pokemonsUser: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('PokemonsList');
    Meteor.subscribe('PokemonsUser');
    pokeList = [];
    pokeUser = Pokemons.find({}, { sort: { index: 1 } }).fetch();
    pokeUser.map((poke)=>{
        pokeList[pokeList.length] =  PokemonsList.findOne({index: poke.index});
    });
    return {
        pokemonsList: pokeList,
        pokemonsUser: pokeUser,
        currentUser: Meteor.user(),
    };
}, PokeUserPage);