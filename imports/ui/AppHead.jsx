import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
// App component - represents the whole app
class AppHead extends Component {
    render() {
        return (
          <div className="row">
              <nav className="blue">
                <div className="nav-wrapper">
                  <div className="col s12">
                      <a className="brand-logo">Pokemon</a>
                      <ul className="right">
                          { this.props.menu == 'Home'?
                              <li>
                                  <a href="/pokelist">
                                      Lista
                                  </a>
                              </li>
                              :
                              <li>
                                  <a href="/">
                                      Home
                                  </a>
                              </li>
                          }
                      </ul>
                  </div>
                </div>
              </nav>
              <div className="left"><AccountsUIWrapper /></div>
          </div>
        );
    }
}

AppHead.propTypes = {
    params: PropTypes.object,
    menu: PropTypes.string.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
      currentUser: Meteor.user(),
  };
}, AppHead);