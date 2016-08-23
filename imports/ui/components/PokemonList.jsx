import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { PokemonsList } from '../../api/pokemonsList.js';

import PokemonCard from './PokemonCard.jsx';
import PokemonChips from './PokemonChips.jsx';


// App component - represents the whole app
class PokemonList extends Component {
    renderCards(){
        return this.props.pokemonsList.map((pokemon) => (
            <PokemonCard key={pokemon._id} 
                         pokemon={pokemon} 
                         isUser={this.props.currentUser? true : false}/>
        ));
    }
    render() {
        return (
            <div className="col s12">
                {this.renderCards()}
            </div>
        );
    }
}

PokemonList.propTypes = {
    pokemonsList: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('PokemonsList');
    return {
        pokemonsList: PokemonsList.find({}, { sort: { index: 1 } }).fetch(),
        currentUser: Meteor.user(),
    };
}, PokemonList);