import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// Task component - represents a single todo item
export default class FormPokemon extends Component {
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.name.value);
        Meteor.call('pokemonType.insert',
            this.number.value,
            this.name.value,
            this.typeP.value,
            this.levelE.value,
            this.evolution.value,
            this.imageP.value,
        );
    }
    render() {
        return (
            <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
                <label>Número del Pokemon</label><input type="number" ref={(ref) => this.number = ref}/>
                <label>Nombre</label><input type="text" ref={(ref) => this.name = ref}/>
                <label>Tipo</label><input type="text" ref={(ref) => this.typeP = ref}/>
                <label>Foto </label><input type="text" ref={(ref) => this.imageP = ref}/>
                <label>Nivel de evolución</label><input type="number" ref={(ref) => this.levelE = ref}/>
                <label>Evolución del Pokemon</label><input type="text" ref={(ref) => this.evolution = ref}/>
                <button className="btn waves-effect waves-light blue" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        );
    }
}
