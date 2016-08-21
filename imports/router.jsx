import React from 'react';
import {mount} from 'react-mounter';

FlowRouter.route('/', {
    action: function(params, queryParams) {
        console.log("Home");
        mount(MainLayout, {
            menu: 'Home',
            params: params
        });
    }
});

FlowRouter.route('/form/:id', {
    action: function(params, queryParams) {
        console.log("Form");
        mount(MainLayout, {
            menu: 'Form',
            params: params
        });
    }
});


