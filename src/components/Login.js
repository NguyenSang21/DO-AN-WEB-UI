import React, { Component } from 'react';
import { BrowserRouter as Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: "",
            goHome: false
		};
		this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    }

	handleSubmitRegister(event)
    {
        event.preventDefault();
        
        var md5 = require('md5');
        const data = new FormData(event.target);
		var username = data.get('usernameRegister');
		var email = data.get('emailRegister');
        var password = md5(data.get('passwordRegister'));
		

        fetch('https://shopdtonline.herokuapp.com/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'whatever-you-want',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
				Username: username,
				Pass: password,
				hoTen: "",
				ngSinh: "",
				gTinh: "",
				SDT: 0,
				email: email,
				Loai: "Thường",
              })
        })
        .then(res => res.json())
        .then(
            (result) => {
                alert('Đăng kí thành công !');

            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                alert('Đăng kí thất bại !');
            }
        );
    }

    handleSubmitLogin(event)
    {
		event.preventDefault();

		var md5 = require('md5');
        var {dispatch} = this.props;
        
        const data = new FormData(event.target);
        var username = data.get('username');
        var password = md5(data.get('password'));


        fetch('https://shopdtonline.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'whatever-you-want',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                name: username,
                password: password,
              })
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(JSON.stringify(result));
                this.setState({
                    token: result.token,
                    goHome: true,
                });
                dispatch({type: 'TOKEN',token: this.state.token});
                dispatch({type: 'LOG_IN',username: username});
                alert('Đăng nhập thành công mơi bạn liên hê admin sang');
                localStorage.setItem('login', JSON.stringify({
                    name: username,
                    token: this.state.token,
                }));
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                alert('Đăng nhập thất bại');
            }
        );
    }
   render() {
       var goHome = this.state.goHome === true ? <Redirect to='/'/> : null;
      return (
		<div class="container">
		<div class="row">
		<div class="col-md-4 col-md-offset-4">
		<div class="form-body">
			<ul class="nav nav-tabs final-login">
				<li class="active"><a data-toggle="tab" href="#sectionA">Sign In</a></li>
				<li><a data-toggle="tab" href="#sectionB">Join us!</a></li>
			</ul>
			<div class="tab-content">
				<div id="sectionA" class="tab-pane fade in active">
				<div class="innter-form">
					<form class="sa-innate-form" onSubmit={this.handleSubmitLogin}>
					<label>Email Address</label>
					<input type="text" name="username"/>
					<label>Password</label>
					<input type="password" name="password"/>
					<button type="submit">Sign In</button>
					<a href="">Forgot Password?</a>
					</form>
					</div>
					<div class="social-login">
					<p>- - - - - - - - - - - - - Sign In With - - - - - - - - - - - - - </p>
					<ul>
					<li><a href=""><i class="fa fa-facebook"></i> Facebook</a></li>
					<li><a href=""><i class="fa fa-google-plus"></i> Google+</a></li>
					<li><a href=""><i class="fa fa-twitter"></i> Twitter</a></li>
					</ul>
					</div>
					<div class="clearfix"></div>
				</div>
				<div id="sectionB" class="tab-pane fade">
					<div class="innter-form">
					<form class="sa-innate-form" onSubmit={this.handleSubmitRegister}>
					<label>Username</label>
					<input type="text" name="usernameRegister"/>
					<label>Email Address</label>
					<input type="text" name="emailRegister"/>
					<label>Password</label>
					<input type="password" name="passwordRegister"/>
					<button type="submit">Join now</button>
					<p>By clicking Join now, you agree to hifriends's User Agreement, Privacy Policy, and Cookie Policy.</p>
					</form>
					</div>
					<div class="social-login">
					<p>- - - - - - - - - - - - - Register With - - - - - - - - - - - - - </p>
					<ul>
					<li><a href=""><i class="fa fa-facebook"></i> Facebook</a></li>
					<li><a href=""><i class="fa fa-google-plus"></i> Google+</a></li>
					<li><a href=""><i class="fa fa-twitter"></i> Twitter</a></li>
					</ul>
					</div>
				</div>
			</div>
			</div>
			</div>
			</div>
            <p class="mt-5 mb-3 text-muted">&copy;{this.state.token} </p>
            {goHome}
        </div>
      );
   }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        token: state.token
    };
}

export default connect(mapStateToProps) (Login);