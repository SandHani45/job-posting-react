import React, { useState, useEffect, useContext } from 'react';
import {
    Radio,
    Select,
    Input,
    Col,
    DatePicker,
    TimePicker,
    Row,
    Button
  } from 'antd';

import moment from 'moment';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
  //components
import UiPageHeader from './../../views/UiPageHeader'
import UiGrid from './../../views/UiGrid'
import UiTimerButton from './../../views/UiTimerButton'
//Constants
import Constants from './../../constants'
//scss
import './review-timer.scss'
  
  const { Option } = Select;
  const format = 'HH:mm';
  const { TextArea } = Input;
  
  function ReviewTimer() {
    const onFinish = values => {
      console.log('Received values of form: ', values);
    };
    return (
      <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={12}>
        <div>
        <UiPageHeader content={Constants.WORKCELL_PROGRESS_TIMERS} />
      <UiGrid title="Work Order" desc="SMS PRESS HIGHT  VOLATAGE">
        <Input placeholder="" value="180944"  />
      </UiGrid>
      <UiGrid title="Customar " number="180944" desc="SMS PRESS HIGHT  VOLATAGE" />
      <UiGrid title="Plat " number="18" desc="Electrical" />
      <UiGrid title="Departement " number="180" desc="Panel Shop" />

      <UiGrid title="Work Order" >
        <Input.Group compact>
        <Select defaultValue="Panel Shop Wiring">
          <Option value="Panel Shop Wiring">Panel Shop Wiring</Option>
          <Option value="Option1-2">Option1-2</Option>
        </Select>
        </Input.Group>
      </UiGrid>
      <UiGrid title="Employee" >
        <Input.Group compact>
        <Select defaultValue="227 Jerry">
          <Option value="227 Jerry">227 Jerry</Option>
          <Option value="Option1-2">Option1-2</Option>
        </Select>
        </Input.Group>
      </UiGrid>
      <UiGrid title="Labor Activity" >
        <Input.Group compact>
        <Select defaultValue="1811 Wiring ">
          <Option value="1811 Wiring">1811 Wiring</Option>
          <Option value="Option1-2">Option1-2</Option>
        </Select>
        </Input.Group>
      </UiGrid>
      <UiGrid title="Start Time" >
        <div className="data-set">
          <div>
            <Input.Group compact>
              <DatePicker />
            </Input.Group>
          </div>
          <div>
            <TimePicker defaultValue={moment('12:08', format)} format={format} />
          </div>
          <div>
            <Radio.Group>
              <Radio value="a">AM</Radio>
              <Radio value="b">PM</Radio>
            </Radio.Group>
          </div>

        </div>
      </UiGrid>
      <UiGrid title="Stop Time" >
        <div className="data-set">
          <div>
            <Input.Group compact>
              <DatePicker />
            </Input.Group>
          </div>
          <div>
            <TimePicker defaultValue={moment('12:08', format)} format={format} />
          </div>
          <div>
            <Radio.Group>
              <Radio value="a">AM</Radio>
              <Radio value="b">PM</Radio>
            </Radio.Group>
          </div>

        </div>
      </UiGrid>
      <UiGrid title="Labor Hours " number="1.5"  />
        </div>
      </Col>
      <Col className="gutter-row" span={12}>
        <div >
          <p>Note *</p>
          <TextArea rows={4} />
        </div>
        <div className="check-time-button">
          <Button type="primary" className="time-button yellow"  >Complete Tracking</Button>  
          <Button type="primary" className="time-button"  >Complete Tracking And Start New Job</Button>  
        </div>
      </Col>
    </Row>
      </>
    )
}
export default ReviewTimer