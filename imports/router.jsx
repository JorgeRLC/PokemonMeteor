import React from 'react';
import {mount} from 'react-mounter';

FlowRouter.route('/', {
    action: function() {
        console.log("Home");
        mount(MainLayout, {
            menu: 'Home',
        });
    }
});

FlowRouter.route('/form', {
    action: function() {
        console.log("Form");
        mount(MainLayout, {
            menu: 'Form',
        });
    }
});


