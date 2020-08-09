import React, {Component, Fragment} from "react";
//css
import "./Index.scss";
//ANTD
import { Form, Input, Button,Row, Col } from 'antd';
import { UserOutlined ,LockOutlined,CheckSquareOutlined} from '@ant-design/icons';
class RegisterForm extends Component{
    constructor(){
        super();
        this.state = {};

        // this.onFinish = this.onFinish.bind(this)
    }
    onFinish = (values) => {
        console.log('Received values of form: ', values);
      };

    toggleForm = () =>{
    this.props.switchForm("login");
    }

    render(){
        return (
            <Fragment>
            <div className="form-header">
                <h4 className="column">注册</h4>
                <span onClick={this.toggleForm}>登录</span>
            </div>                  
            <div className="form-content"></div>
                <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish = {() => this.onFinish}>
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>      

                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>   

                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>   

                    <Form.Item name="Code" rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Row gutter={13}>
                            <Col span={15}>
                                <Input prefix={<CheckSquareOutlined className="site-form-item-icon" />} placeholder="Code" />
                            </Col>
                            <Col span={9}>
                            <Button type="danger" block> 获取验证码</Button>                                           
                            </Col>
                        </Row>
                    </Form.Item>                                        

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block> 登录 </Button>
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }
}

export default RegisterForm;