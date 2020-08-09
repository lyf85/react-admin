import React, {Component, Fragment} from "react";
//css
import "./Index.scss";
//验证
import {validate_password, validate_email} from"../../utils/validate";
//ANTD
import { Form, Input, Button,Row, Col, message } from 'antd';
import { UserOutlined ,LockOutlined,CheckSquareOutlined, PoweroffOutlined} from '@ant-design/icons';
//API
import {Login,GetCode} from "../../api/account";
class LoginForm extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
            code_button_disable: false,
            code_button_loading: false,
            code_button_text: "获取验证码"
        };
        //react没有双向数据绑定的概念。

        // this.onFinish = this.onFinish.bind(this)
    }
    //登录
    //点击submit后触发
    onFinish = (values) => {   
        
        Login().then(response => { //resloves
            console.log(response)
        }).catch(error=> {          //reject

        })
        console.log('Received values of form: ', values);
      };
    //获取验证码 调用“获取验证码”接口
    getCode = () => {
        alert(this.state.username);
        if(! this.state.username){
            message.warning('用户名不能为空');
            return false;
        }
        this.setState({
            code_button_loading: true,
            code_button_text: "发送中"
        })
        
        const requestData = {
            username: this.state.username,
            module: "login"
        }
       
        GetCode(requestData).then(response => { //resloves
            //执行倒计时
            this.countDown();
        }).catch(error=> {          //reject
            this.setState({
                code_button_loading: false,
                code_button_text: "重新获取"
            })
        })
    }
    /*input 输入处理*/
    inputChange = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    
    }
    /*倒计时*/
    countDown = () => {
        //定时器
        let timer = null;
        //倒计时时间
        let sec = 60;
        //修改状态
        this.setState({
            code_button_loading: false,
            code_button_disable: true,
            code_button_text: `${sec}s`
        })

        timer = setInterval(() => {
            console.log(222)
            sec--;
            if(sec <= 0){
                this.setState({
                    code_button_text: "重新获取",
                    code_button_disable: false,
                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                code_button_text: `${sec}s`
            })
        }, 1000)

        //setInterval \ clearInterval
        //setTimeout \ clearTimeout
    }
    toggleForm = () =>{
        
        this.props.switchForm("register");
    }
    render(){
        const { username, code_button_disable,code_button_loading, code_button_text} = this.state;
        const _this = this;
        return (
            <Fragment>
            <div className="form-header">
                <h4 className="column">登录</h4>
                <span onClick={this.toggleForm}>账号注册</span>
            </div>                  
            <div className="form-content"></div>
                <Form 
                name="normal_login" 
                className="login-form" 
                initialValues={{ remember: true }} 
                onFinish = {this.onFinish}>
                    
                    <Form.Item name="username" rules={
                        [
                            { required: true, message: "邮箱不能为空" }, 
                            {type: "email", message: "邮箱格式不正确"},
                            // ({ getFieldValue}) => ({
                            //     validator(rule, value) {
                            //         if (validate_email(value)) {
                            //             _this.setState({
                            //                 code_button_disable:　false
                            //             })
                            //             return Promise.resolve();
                            //         }
                            //         return Promise.reject("邮箱格式不正确");<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            //     }
                            // })
                        ]
                    }>
                        <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>      

                    <Form.Item name="password" rules={
                        [
                            { required: true, message: 'Please input your Password!' },
                            // ({getFiledValue}) => ({
                            //     validator(rule, value){
                            //         if(value.length < 6){
                            //             return Promise.reject('不能小于6位');
                            //         }else{
                            //             return Promise.resolve();
                            //         }
                            //     }
                            // })
                            // {min: 6, message: "不能小于6位"},// {max: 20, message: "不能大于20位"},
                            
                            { pattern: validate_password, message: "请输入大于6位小于20位数字+字母"},
                        ]
                    }>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>   

                    <Form.Item name="code" rules={
                        [
                            { required: true, message: 'Please input your Password!' },
                            { len: 6, message: '请输入长度为6位的验证码'}
                        ]
                    }>
                        <Row gutter={13}>
                            <Col span={15}>
                                <Input prefix={<CheckSquareOutlined className="site-form-item-icon" />} placeholder="Code" />
                            </Col>
                            <Col span={9}>
                                 <Button type="danger" block disabled={code_button_disable} onClick={this.getCode} loading={code_button_loading}>{code_button_text}</Button>                                           
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

export default LoginForm;