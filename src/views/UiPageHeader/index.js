import React from 'react'

export default function UiPageHeader(props) {
    const {content} = props
    return (
        <div className="main-title">
          <h3>{content}</h3>
        </div>
    )
}
