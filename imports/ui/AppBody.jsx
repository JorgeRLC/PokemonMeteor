import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import PokemonList from './components/PokemonList.jsx';
import FormPokemon from './components/FormPokemon.jsx';

import PokeListPage from './pages/PokeListPage.jsx';
import PokeUserPage from './pages/PokeUserPage.jsx';


// App component - represents the whole app
class AppBody extends Component {

    renderForm(){
        return <FormPokemon id={this.props.params.id}/>;
    }
    
    renderPage(){
        var ren = {};
        switch (this.props.menu){
            case 'Form':
                ren = <div className="col s12">
                    {this.renderForm()}
                </div>;
                break;
            case 'Home':
                ren = <div className="col s12">
                    <PokeUserPage />
                </div>;
                break;
            case 'Pokelist':
                ren = <div className="col s12">
                    <PokeListPage />
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
};

export default createContainer(() => {
  return {
      currentUser: Meteor.user(),
  };
}, AppBody);