import React from 'react'
import { Link } from 'react-router-dom';
import './page-header.scss'
import { PlusCircleOutlined } from '@ant-design/icons';
export default function UiPageHeader(props) {
    const {content, track, progress,color} = props
    return (
      <div className="page-header-flex">
        <div className="main-title">
          <h3 style={{color:color}}>{content}</h3>
        </div>
        {track 
          ?<div className="plus-icons">
             <span><PlusCircleOutlined /></span> <Link to="/">Link Another Job in this Work Cell</Link>
            </div> 
          : null
        }
        {progress 
          ?<div style={{marginRight: "25px",textAlign:"center"}}>
            <p >Click any timer to return  <br></br> to that job </p>
          </div> 
          : null
        }
        
      </div>
    )
}
