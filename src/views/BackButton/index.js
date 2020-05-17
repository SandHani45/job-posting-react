import React, {useContext} from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from "./../../context/GlobalState";
import { ArrowLeftOutlined  } from '@ant-design/icons';
import { Layout, Button } from 'antd';
const { Content } = Layout;
export default function BackButton() {
    let { id } = useParams();
    const { breadcurmbList, breadcurmbAction } = useContext(GlobalContext);
    const onClickBreadcrumb =() =>{
        let len = breadcurmbList.length-1
        console.log(breadcurmbList,len)
        history.push(breadcurmbList[len].path)
        breadcurmbAction(breadcurmbList[len].path, breadcurmbList[len].name)
    }
    const history = useHistory();
    let tempalate
    // Back Button
    const goBack = () => {
        history.goBack();
    }
    if(window.location.pathname === "/work-cell"){
        tempalate= null
    }else{
        tempalate = ( <Layout className="layout">
        <Content style={{ padding: '0 50px' }} > 
          <Button type="primary" className="back-button" onClick={onClickBreadcrumb} icon={<ArrowLeftOutlined  />}>Back</Button>
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
