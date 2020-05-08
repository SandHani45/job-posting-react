import React from 'react'
import { Button ,Menu, Dropdown, message } from 'antd';
import { MenuOutlined , UserOutlined } from '@ant-design/icons';
// Router
import {useHistory, useLocation} from 'react-router-dom';

const MainHamber = ({keyValue,data}) => {
    const history = useHistory();
    let location = useLocation();
    const handleMenuClick = (e) => {
        if(e.key === 'add'){
            history.push(`labor-review-and-posting-add-labor-record`);
        }
    }
    return (
        <div>
            <Dropdown overlay= {
                <Menu onClick={handleMenuClick}>
                <Menu.Item key='add' icon={<UserOutlined />}>
                    Add a Labor Record 
                </Menu.Item>
              </Menu>
            } >
            <Button>
                 <MenuOutlined />
            </Button>
            </Dropdown>
        </div>
    )
}
export default MainHamber