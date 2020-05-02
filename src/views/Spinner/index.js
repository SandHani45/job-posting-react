import React from 'react'
import { Spin } from 'antd';
import './spinner.scss'
const Spinner = () => {
    return (
        <section className="spinner">
            <Spin size="large" />
        </section>
    )
}
export default Spinner