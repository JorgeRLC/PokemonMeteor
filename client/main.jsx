import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.js';
import '../imports/router.jsx'

import AppHead from '../imports/ui/AppHead.jsx';
import AppBody from '../imports/ui/AppBody.jsx';

MainLayout = React.createClass({
    
  render() {
      
    return (
        <div>
          <AppHead menu={this.props.menu} params={this.props.params}/>
          <div className="row">
            <AppBody menu={this.props.menu} params={this.props.params}/>
          </div>
        </div>
    );
  }
});
