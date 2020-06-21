import React from 'react';

import './CounterControl.module.css';

const counterControl = (props) => (
    <div className="CounterControl" onClick={props.clicked}>
        {props.label}
    </div>
);

export default counterControl;