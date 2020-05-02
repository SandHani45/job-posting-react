import React, {useState,useEffect, useContext} from 'react'
import { useParams, useHistory} from "react-router-dom";
//components
import UiPageHeader from './../../views/UiPageHeader'
// context
import { GlobalContext } from "./../../context/GlobalState";
//Constants
import Constants from './../../constants'
import './job-posting.scss'
import { Input, Button  } from 'antd';

const JobPosting = (props) => {
    let { id } = useParams();
    const [page, setPage] = useState(1);
    const [jobNumber, setJobNumber] = useState();
    const { keyData, getWorkOrder, getKeyData} = useContext(GlobalContext);
    const history = useHistory();
    useEffect(() => {
        if(keyData.length  === 0){
            history.push(`/work-cell`)
          }
      }, [page]);

    function onChangeHandler(event) {
        setJobNumber(event.target.value)
    }

    const onSubmitHandler = () => {
        let workOrderPosting = {
            workOrderPosting:jobNumber
        }
        getWorkOrder(jobNumber)
        getKeyData('post_labor', workOrderPosting)
        history.push(`/labor-activity/${jobNumber}`);
    }
    return (
        <>
            <UiPageHeader content={Constants.JOBPOSTING} />
            <div className="job-posting">
                <div>
                    WO #
                </div>
                <div>
                    <Input onChange={onChangeHandler} />
                </div>
                <div>
                    <Button type="primary" onClick={onSubmitHandler}>Enter</Button>
                </div>
            </div>
        </>
    )
}
export default JobPosting