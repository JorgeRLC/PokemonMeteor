import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { PokemonsList } from '../api/pokemonsList.js';
import { Pokemons } from '../api/pokemons.js';

import PokemonCard from './components/PokemonCard.jsx';
import PokemonList from './components/PokemonList.jsx';
import FormPokemon from './components/FormPokemon.jsx';
import PokemonChips from './components/PokemonChips.jsx';

// App component - represents the whole app
class AppBody extends Component {

    renderForm(){
        return <FormPokemon id={this.props.params.id}/>;
    }
    renderChips(){
        return this.props.pokemonsUser.map((pokemon) => (
            <PokemonChips key={pokemon._id}
                         pokemon={pokemon}/>
        ));
    }
    renderPage(){
        var ren = {};
        switch (this.props.menu){
            case 'Form':
                ren = <div className="col s12">{this.renderForm()}</div>;
                break;
            case 'Home':
                ren = <div className="col s12">
                    {this.renderChips()} <br/><br/>
                    <PokemonList />
                </div>;
                break;
        }
       return ren;
    }
    render() {
        return (
            <div className="col s12">
                {this.renderPage()}
            </div>
        );
    }
}

AppBody.propTypes = {
    menu: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    pokemonsUser: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('PokemonsUser');
  return {
      pokemonsUser: Pokemons.find({}, { sort: { index: 1 } }).fetch(),
      currentUser: Meteor.user(),
  };
}, AppBody);