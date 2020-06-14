import React,{Component} from "react";
import Aux from '../Auxilery/Auxilery'
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (EmbeddedComponent, axios) => {

    return (
        class extends Component{

            state={
                error: null
            }

            componentDidMount() {
                this.requestInterceptor = axios.interceptors.request.use(request=>{
                    this.setState({error:null})
                    return request
                })
                this.responseInterceptor = axios.interceptors.response.use(response=>{
                    this.setState({error:null})
                    return response
                },error => {
                    this.setState({error:error})
                    return Promise.reject(error)
                })

            }

            componentWillUnmount() {
                axios.interceptors.request.eject(this.requestInterceptor)
                axios.interceptors.request.eject(this.responseInterceptor)

            }

            errorConfirmedHandler = ()=>{
                this.setState({error:null})
            }

            render(){
                    return (
                        <Aux>
                            <Modal show={this.state.error!=null} modelClosed={this.errorConfirmedHandler}>
                                    <p>{this.state.error?this.state.error.message:null}</p>
                            </Modal>
                            <EmbeddedComponent props={this.props}/>
                        </Aux>
                    )
                }
        }
    )
}

export default withErrorHandler