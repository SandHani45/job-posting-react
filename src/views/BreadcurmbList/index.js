import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd';
import { GlobalContext } from "./../../context/GlobalState";
import _ from 'lodash'
const BreadcurmbList = (props)  =>{
    const { href,name } = props;
    const { breadcurmbList } = useContext(GlobalContext);
    var breadcurmb = _.uniqBy(breadcurmbList, function (e) {
        return e.name;
    });
    let tempalate = <p></p>
    const onClickBreadcrumb =(item) =>{
        let indexVal = breadcurmb.findIndex(itemValue=>{
            if(itemValue.name === item.name){
                return itemValue
            }
        })
        breadcurmb.splice(indexVal,breadcurmb.length)
        console.log(breadcurmb)
        tempalate = (
            <Breadcrumb>
                {breadcurmb.length > 0 ? breadcurmb.map((item,index) => (
                    <Breadcrumb.Item onClick={(e) => onClickBreadcrumb(item)} >
                        <Link key={index} to={item.path}>
                            {item.name}
                        </Link>
                    </Breadcrumb.Item>
                )):<p></p>}  
            </Breadcrumb>
        )
    }
    if(breadcurmb.length > 0){
        tempalate = (
            <Breadcrumb>
                { breadcurmb.map((item,index) => (
                    <Breadcrumb.Item onClick={(e) => onClickBreadcrumb(item)} >
                        <Link key={index} to={item.path}>
                            {item.name}
                        </Link>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        )
    }
    return (
        <>
        {tempalate}
        </>
    )
}
export default BreadcurmbList