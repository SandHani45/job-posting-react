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
    const [error, setError] = useState(false)
    const { keyData, getWorkOrder, getKeyData, getBreadcurmbList} = useContext(GlobalContext);
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
        getWorkOrder(jobNumber).then(res=>{
            getKeyData('post_labor', workOrderPosting)
            getBreadcurmbList(`/job-posting-employee/${id}`,`WO ${jobNumber}`)
            history.push(`/labor-activity/${jobNumber}`);
        }).catch(error => setError(true));

    }
    return (
        <>
            <UiPageHeader content={Constants.JOBPOSTING} />
            <>
                <div className="job-posting">
                    <div className="bold">
                        WO #
                    </div>
                    <div>
                        <Input type="number" onChange={onChangeHandler} />
                    </div>
                    <div>
                        <Button type="primary" onClick={onSubmitHandler}>Enter</Button>
                    </div>
                </div>
                <div className="job-posting">
                    {console.log('--',error)}
                    {error && <p className="error"> * Please enter valid Work order</p> }
                </div>
            </>
            
        </>
    )
}
export default JobPosting