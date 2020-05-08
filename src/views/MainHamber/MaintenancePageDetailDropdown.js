import React from 'react'
import { Dropdown, Icon, Menu, Tooltip, message } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { MenuOutlined , UserOutlined } from '@ant-design/icons';
import {deletePendingLaborService} from './../../service/pendingLabor'
class MaintenancePageDetailDropdown extends React.Component {
  refresh = () => true
  deleteItem = (e) =>{
    return deletePendingLaborService(e).then(res=>{
        if(res){
            message.success('successfully deleted');
            setTimeout(function(){ window.location.reload(false); }, 2000);
        }
    })
}
  render() {
    const {
      match,
      itemKey,
      allowDelete = true,
      allowEdit,
      deleteTooltip,
      deleteFunction,
    } = this.props

    const menuItems = (
      <Menu>
        <Menu.Item key="0">
            <Link to={`${match.url}/${itemKey}`}>View</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to={`${match.url}/edit/${itemKey}`}>{allowEdit ? 'Edit' : 'View'}</Link>
        </Menu.Item>
        <Menu.Item key='delete' icon={<UserOutlined />}>  
            <a href="#" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteItem(itemKey) } }>
                Delete
            </a>
        </Menu.Item>
      </Menu>
    )

    return (
      <Dropdown overlay={menuItems} trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
         <MenuOutlined />
        </a>
      </Dropdown>
    )
  }
}

export default withRouter(MaintenancePageDetailDropdown)