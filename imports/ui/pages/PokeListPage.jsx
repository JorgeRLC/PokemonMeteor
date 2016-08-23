import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { PokemonsList } from '../../api/pokemonsList.js';
import { Pokemons } from '../../api/pokemons.js';

import PokemonList from '../components/PokemonList.jsx';
import PokemonChips from '../components/PokemonChips.jsx';


// App component - represents the whole app
class PokeListPage extends Component {
    renderChips(){
        return this.props.pokemonsUser.map((pokemon) => (
            <PokemonChips key={pokemon._id}
                          pokemon={pokemon}/>
        ));
    }
    render() {
        return (
            <div className="col s12">
                {this.renderChips()}
                <br/><br/>
                <PokemonList 
                    pokemonsList={this.props.pokemonsList}
                    isUser={this.props.currentUser? true : false}
                />
            </div>
        );
    }
}

PokeListPage.propTypes = {
    pokemonsList: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
    pokemonsUser: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('PokemonsList');
    Meteor.subscribe('PokemonsUser');
    return {
        pokemonsList: PokemonsList.find({}, { sort: { index: 1 } }).fetch(),
        pokemonsUser: Pokemons.find({}, { sort: { index: 1 } }).fetch(),
        currentUser: Meteor.user(),
    };
}, PokeListPage);