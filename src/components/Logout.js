import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import Login from './Login';

class Logout extends Component {
    eventLogout () {
        var {dispatch} = this.props;
        dispatch({type: 'LOG_OUT'});
    }

   render() {
        return (
            <div>
                <p>{this.props.username}</p>
                <hr/>
                <p>{this.props.token}</p>
                <button onClick={this.eventLogout.bind(this)}>Log out</button>
                <li><Link to={"/"} activeClassName="active" > Go Home </Link></li>
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

export default connect(mapStateToProps) (Logout);