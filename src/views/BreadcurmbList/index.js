import React, {useContext,useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd';
import { GlobalContext } from "./../../context/GlobalState";
import _ from 'lodash'
const BreadcurmbList = (props)  =>{
    const { breadcurmbList, breadcurmbAction } = useContext(GlobalContext);
    const onClickBreadcrumb =(item) =>{
        breadcurmbAction(item.path, item.name)
    }
    return (
        <>
            <Breadcrumb>
                { breadcurmbList.length > 0 ? breadcurmbList.map((item,index) => (
                    <Breadcrumb.Item onClick={(e) => onClickBreadcrumb(item)} >
                        <Link key={index} to={item.path}>
                            {item.name}
                        </Link>
                    </Breadcrumb.Item>
                )): null}
            </Breadcrumb>
        </>
    )
}
export default BreadcurmbList