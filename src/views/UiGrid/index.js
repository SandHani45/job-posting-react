
import React from 'react'
function UiGrid({title,number,desc, children}) {
    return (
    <React.Fragment>
        <div className="ui-grid">
            <p>{title}</p>
            <p>{number || children}</p>
            <p>{desc}</p>
        </div>
    </React.Fragment>
    )
}
export default UiGrid
            