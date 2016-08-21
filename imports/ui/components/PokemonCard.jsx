import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// Task component - represents a single todo item
export default class PokemonCard extends Component {
    imgPokemon(){
        return 'thm/'+ this.props.pokemon.img +'.png';
    }
    render() {
        return (
                <div className="col s6 m3 l2">
                    <div className="card small">
                        <div className="card-panel blue">
                           <h6 className="white-text"> {this.props.pokemon.name} </h6>
                        </div>
                        <div className="center-align">
                            <img height="120" width="120" src={this.imgPokemon()}/>
                        </div>
                        <div className="card-content">
                            <div >{this.props.pokemon.types}</div>
                            <a href={'Form/' + this.props.pokemon._id}>Editar</a>
                        </div>
                    </div>
                </div>
        );
    }
}


PokemonCard.propTypes = {
    pokemon: PropTypes.object.isRequired
};