import React, {Component} from 'react';
import ProductList from "./ProductList";
import Modal from 'react-modal';
import PanelLeft from './PanelLeft';
import PanelRight from './PanelRight';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {connect} from 'react-redux'


class Main extends Component {
    render() {
        var {username} = this.props;
        var {token} = this.props;
        var {dispatch} = this.props;
        return (
            <div>
                <PanelLeft/>
                <PanelRight token={token} username={username} dispatch={dispatch}/>
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

export default connect(mapStateToProps) (Main);

