import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';//引入路由
// import './App.scss';
//引用组件
import Login from './views/login/Index';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
//渲染路由 //从'react-router-dom'过来 //组件，自定义
  render(){
    return( 
        <BrowserRouter>  
          <Switch>
            <Route exact component={Login} path="/"/>                       
          </Switch>
        </BrowserRouter>
    )
  }
}

export default App;
