import React,{Component} from 'react'
import * as authActions from '../../../store/actions/auth'
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux"

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout()
    }

    render() {
        return <Redirect to="/"/>
    }
}


const mapDispatchToProps = (dispatch)=>{
    return {
        onLogout : ()=>dispatch(authActions.logout())
    }
}
const mapStateToProps = (state)=>{
    return {
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Logout);