import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { renderRoutes } from '../imports/startup/pageRoutes.js';

Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('root'));
});
