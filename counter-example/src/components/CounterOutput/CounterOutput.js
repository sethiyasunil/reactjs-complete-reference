import React from 'react';

import './CounterOutput.module.css';

const counterOutput = (props) => (
    <div className="CounterOutput">
        Current Counter: {props.value}
    </div>
);

export default counterOutput;