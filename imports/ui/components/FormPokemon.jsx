import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


class FormPokemon extends Component {
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.name.value);
        Meteor.call('PokemonsList.update', this.props.pokemon._id,
            {
                name: this.name.value,
                img: this.img.value
            });
    }
    handleRestore() {
        m = Meteor.subscribe('PokemonsList.rest', this.props.pokemon._id);
        console.log(m);
    }
    render() {
        return (
            <div>
                <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
                    <label>Nombre</label><input type="text" defaultValue={this.props.pokemon.name} ref={(ref) => this.name = ref}/>
                    <label>Foto </label><input type="text" defaultValue={this.props.pokemon.img} ref={(ref) => this.img = ref}/>
                    <button className="btn waves-effect waves-light blue" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
                <button className="btn waves-effect waves-light blue" onClick={this.handleRestore.bind(this)} name="action">Restaurar
                    <i className="material-icons right"  >restore</i>
                </button>
            </div>
        );
    }
}

FormPokemon.propTypes = {
    pokemon: PropTypes.object.isRequired,
};

export default createContainer(() => {
    return {

    };
}, FormPokemon);