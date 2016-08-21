import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { PokemonsList } from '../api/pokemonsList.js';

import PokemonCard from './components/PokemonCard.jsx';
import FormPokemon from './components/FormPokemon.jsx';

// App component - represents the whole app
class AppBody extends Component {
    renderForm(){
        //pokemon =  Meteor.call('pokemonsList.show', this.props.params.id);
        console.log(this.props.params.id);
        var pokemon = PokemonsList.findOne({_id: this.props.params.id});
        return <FormPokemon pokemon={pokemon}/>;
    }
    renderCards(){
        return this.props.pokemonsList.map((pokemonType) => (
            <PokemonCard key={pokemonType._id} pokemon={pokemonType}/>
        ));
    }
    renderPage(){
        var ren = {};
        switch (this.props.menu){
            case 'Form':
                ren = <div className="col s12">{this.renderForm()}</div>;
                break;
            case 'Home':
                ren = <div className="col s12">{this.renderCards()}</div>;
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
    pokemonsList: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
      pokemonsList: PokemonsList.find({}, { sort: { index: 1 }, }).fetch(),
      currentUser: Meteor.user(),
  };
}, AppBody);