import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { PokemonsList } from '../../api/pokemonsList.js';

class FormPokemon extends Component {
    constructor(props) {
        super(props);
        //this.poke = PokemonsList.findOne(this.props.id);
        this.poke = this.props.pokemonsList.find((pokemon) => pokemon._id == this.props.id);
    }

        handleSubmit(event) {
        event.preventDefault();
        console.log(this.name.value);
        Meteor.call('PokemonsList.update', this.poke._id,
            {
                name: this.name.value,
                img: this.img.value
            });
    }
    handleRestore() {
        Meteor.subscribe('PokemonsList.rest', this.poke._id);
    }
    render() {
        console.log(this.poke);
        return (
            <div>
                <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
                    <label>Nombre</label><input type="text" defaultValue={this.poke.name} ref={(ref) => this.name = ref}/>
                    <label>Foto </label><input type="text" defaultValue={this.poke.img} ref={(ref) => this.img = ref}/>
                    <button className="btn waves-effect waves-light blue" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
                <br/>
                <button className="btn waves-effect waves-light blue" onClick={this.handleRestore.bind(this)} name="action">
                    Restaurar
                    <i className="material-icons right"  >restore</i>
                </button>
            </div>
        );
    }
}

FormPokemon.propTypes = {
    pokemonsList: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('PokemonsList');
    return {
        pokemonsList: PokemonsList.find({}, { sort: { index: 1 } }).fetch(),
    };
}, FormPokemon);