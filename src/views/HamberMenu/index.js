import React from 'react'
import { Button ,Menu, Dropdown, message, Popconfirm } from 'antd';
import { MenuOutlined , UserOutlined } from '@ant-design/icons';
// Router
import {useHistory, useLocation} from 'react-router-dom';
//Service
import {deletePendingLaborService} from './../../service/pendingLabor'
import { Link, withRouter } from 'react-router-dom'
const HamberMenu = ({keyValue,data,match,title}) => {
    const history = useHistory();
    let location = useLocation();
    // const handleMenuClick = (e) => {
    //     switch (e.key) {
    //         case "delete":
    //         var del=confirm("Are you sure you want to delete this record?");
    //         if (del==true){
    //             return deletePendingLaborService(keyValue).then(res=>{
    //                 message.success('This is a success message');
    //                 history.push(`${location.pathname}`);
    //             })
    //          }else{
    //              alert("Record Not Deleted")
    //          }
    //          return del;
            
    //         case "edit":
    //         return history.push(`${location.pathname}/edit/${keyValue}`);
    //         case "view":
    //         return history.push(`${location.pathname}/${data.WORK_CELL_KEY}`);
    //         default:
    //             return history.push(`${location.pathname}/${data.WORK_CELL_KEY}`);
    //     }
    // }
    const deleteItem = (e) =>{  
        e.preventDefault()
        return deletePendingLaborService(keyValue).then(res=>{
            if(res){
                message.success('successfully deleted');
                setTimeout(function(){ window.location.reload(false); }, 2000);
            }
        })
    }
    return (
        <span>
            <Dropdown overlay= {
                <Menu >
                <Menu.Item key='edit' icon={<UserOutlined />}>
                    <Link to={`${match.url}/edit/${keyValue}`}>Edit</Link>
                </Menu.Item>
                <Menu.Item key='view' icon={<UserOutlined />}>
                    <Link to={`${match.url}/${data.WORK_CELL_KEY}`}>View</Link>
                </Menu.Item>
                <Menu.Item key='delete' icon={<UserOutlined />}>  
                    <a href="#" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteItem(e) } }>
                        Delete
                    </a>
                </Menu.Item>
              </Menu>
            } >
            <Button>
                 <MenuOutlined />
            </Button>
            </Dropdown>
        </span>
    )
}
export default withRouter(HamberMenu)