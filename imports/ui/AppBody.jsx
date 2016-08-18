import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { PokemonsType } from '../collection/pokemonsType.js';

import PokemonCard from './components/PokemonCard.jsx';
import FormPokemon from './components/FormPokemon.jsx';

// App component - represents the whole app
class AppBody extends Component {
    renderCards(){
        return this.props.pokemonType.map((pokemonType) => (
            <PokemonCard key={pokemonType._id} pokemon={pokemonType}/>
        ));
    }
    render() {
        return (
            <div className="col s12">
                { this.props.menu == 'Form' ?
                    <div className="col s12">
                        <div className="row">
                            <FormPokemon/>
                        </div>
                        <div className="row">
                            {this.renderCards()}
                        </div>
                    </div>
                    :
                    <div className="row">
                        {this.renderCards()}
                    </div>
                }
            </div>
        );
    }
}

AppBody.propTypes = {
    menu: PropTypes.string.isRequired,
    pokemonType: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
      pokemonType: PokemonsType.find({}, { sort: { id: 1 }, limit: 9  }).fetch(),
      currentUser: Meteor.user(),
  };
}, AppBody);