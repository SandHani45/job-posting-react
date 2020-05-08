import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd';
import { GlobalContext } from "./../../context/GlobalState";
import _ from 'lodash'
const BreadcurmbList = (props)  =>{
    const { href,name } = props;
    const { breadcurmbList} = useContext(GlobalContext);
    let breadcurmb = _.uniqBy(breadcurmbList, function (e) {
        return e.name;
      });
    return (
        <Breadcrumb>
            {breadcurmb.length > 0 ? breadcurmb.map((item,index) => (
                <Breadcrumb.Item>
                    <Link key={index} to={item.path}>
                        {item.name}
                    </Link>
                </Breadcrumb.Item>
            )):<p></p>} 
        </Breadcrumb>
    )
}
export default BreadcurmbList