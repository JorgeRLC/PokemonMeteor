import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// Task component - represents a single todo item
export default class PokemonCard extends Component {
    render() {
        return (
                <div className="col s12 m4 l2">
                    <div className="card small">
                        <div className="card-title s8">
                            {this.props.pokemon.name}
                        </div>
                        <div className="card-image">
                            <img src={this.props.pokemon.img} alt=""/>
                        </div>
                        <div className="card-content">
                            <div >{this.props.pokemon.type}</div>
                        </div>
                        <div className="card-action">
                        </div>
                    </div>
                </div>
        );
    }
}


PokemonCard.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
    pokemon: PropTypes.object.isRequired
};