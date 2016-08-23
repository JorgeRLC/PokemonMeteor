import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// Task component - represents a single todo item
export default class PokemonChips extends Component {
    imgPokemon(){
        var s = this.props.pokemon.index + '';
        while (s.length < 3) s = "0" + s;
        return 'spr/'+ s +'MS.png';
    }
    deleteThisChip() {
        Meteor.call('Pokemons.remove', this.props.pokemon._id);
    }
    render() {
        return (
            <div className="chip">
                
                <img src={this.imgPokemon()}  />
                    {this.props.pokemon.name}
                <i className="close material-icons"
                   onClick={this.deleteThisChip.bind(this)}>
                    close
                </i>
            </div>
        );
    }
}


PokemonChips.propTypes = {
    pokemon: PropTypes.object.isRequired
};