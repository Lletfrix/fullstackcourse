import React from 'react';

const Filter = ({filter, filtfunc}) =>
<div>
    filter shown with <input value={filter} onChange={(event) => filtfunc(event.target.value)}/>
</div>;

export default Filter;
