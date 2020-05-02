import React, {useState, useEffect, useContext} from 'react'
// ant
import { Table, Tag , Button} from 'antd';
// context
import { GlobalContext } from "./../../context/GlobalState";
// Router
import {useHistory, useParams} from 'react-router-dom';
// service
import { getListLaborAuditTrail } from './../../service/pendingLabor'
import Spinner from './../../views/Spinner'
const columns = [
    {
        title: '',
        dataIndex: 'TRANSACTION_TYPE',
        key: '',
    },
    {
        title: 'Date',
        dataIndex: 'ENTRY_DATE',
        key: 'ENTRY_DATE',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Edit by',
        dataIndex: 'ENTRY_FORM',
        key: 'ENTRY_FORM',
    },
    {
        title: 'Work Order',
        dataIndex: 'ORIGINAL_WORK_ORDER_NUMBER',
        key: 'ORIGINAL_WORK_ORDER_NUMBER',
    },
    {
        title: 'Work Cell',
        dataIndex: 'ORIGINAL_WORK_CELL_KEY',
        key: 'ORIGINAL_WORK_CELL_KEY',
    },
    {
        title: 'Employee',
        dataIndex: 'ORIGINAL_EMPLOYEE_KEY',
        key: 'ORIGINAL_EMPLOYEE_KEY',
    },
    {
        title: 'Labor Performed',
        dataIndex: 'ORIGINAL_WORK_CELL_KEY',
        key: 'ORIGINAL_WORK_CELL_KEY',
    },
    {
        title: 'Start Time',
        dataIndex: 'ORIGINAL_START_TIME',
        key: 'ORIGINAL_START_TIME',
    },
    {
        title: 'Stop Time',
        dataIndex: 'ORIGINAL_STOP_TIME',
        key: 'ORIGINAL_STOP_TIME',
    },
    {
      title: 'Note',
      key: 'NOTE',
      dataIndex: 'NOTE',
      render: text => <a>{text}</a>
    }
  ];
const LaborReviewAndPostingView = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState(1);
    const { getWorkCell, workCellData , getKeyData, keyData, getPanalShop ,keyEmpty} = useContext(GlobalContext);
    const history = useHistory();
    let { id } = useParams();
    useEffect(() => {
        getListLaborAuditTrail(id).then(res=>setData(res))
    }, [page]);
    const cancleChanges = () =>{
        history.goBack();
    }
    return (
        <div>
            {data.length > 0 ?<Table columns={columns} dataSource={data} /> : <Spinner /> }
            <div className="footer-cancle">
                <Button 
                    type="primary" 
                    className="time-button" 
                    onClick={cancleChanges}
                    style={{backgroundColor:'rgba(0, 0, 0, 0.65)'}}  
                > <b>Close This Page</b> 
                </Button>  
            </div>
        </div>
    )
}
export default LaborReviewAndPostingView