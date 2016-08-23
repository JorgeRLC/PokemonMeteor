import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import PokemonCard from './PokemonCard.jsx';



// App component - represents the whole app
export default class PokemonList extends Component {
    renderCards(){
        return this.props.pokemonsList.map((pokemon) => (
            <PokemonCard key={pokemon._id} 
                         pokemon={pokemon} 
                         isUser={this.props.isUser}/>
        ));
    }
    render() {
        return (
            <div className="">
                {this.renderCards()}
            </div>
        );
    }
}

PokemonList.propTypes = {
    pokemonsList: PropTypes.array.isRequired,
    isUser: PropTypes.bool,
};

