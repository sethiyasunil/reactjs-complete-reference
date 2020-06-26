import React, { Component } from 'react';

import Aux from '../../hoc/Auxilery/Auxilery';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from "react-redux";
import * as authActions from "../../store/actions";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isAuthenticated={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        isAuthenticated: state.auth.idToken!=null
    }
}


const mapDispatchToProps =(dispatch)=> {
    return {
    }

}


export default connect(mapStateToProps,mapDispatchToProps)(Layout);