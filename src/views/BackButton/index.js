import React from 'react'
import { useHistory } from 'react-router-dom';
import { ArrowLeftOutlined  } from '@ant-design/icons';
import { Layout, Button } from 'antd';
const { Content } = Layout;
export default function BackButton() {
    const history = useHistory();
    let tempalate
    // Back Button
    const goBack = () => {
        history.goBack();
    }
    console.log('---',window.location.pathname )
    if(window.location.pathname === "/work-cell"){
        tempalate= null
    }else{
        tempalate = (<Layout className="layout">
        <Content style={{ padding: '0 50px' }} > 
          <Button type="primary" className="back-button" onClick={goBack} icon={<ArrowLeftOutlined  />}>Back</Button>
        </Content>
      </Layout>)
    }
    if(window.location.pathname.includes("/labor-review-and-posting")){
        tempalate= null
    }
    if(window.location.pathname === "/labor-tracker"){
        tempalate=null
    }
    return (
        <>
            {tempalate}
        </>
    )
}