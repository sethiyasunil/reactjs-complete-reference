import React,{Component}  from "react";
import {Form,Button,FormGroup,FormControl} from 'react-bootstrap'
class H3toInput extends Component{

    constructor(props){
        super(props)
        this.state = {title:"Click me to edit", showh3:true}
    }



    handleTitleSubmit = ()=>{
        this.setState({showh3: ! this.state.showh3})
    }

    handleTitleChange = (event)=>{
        this.setState({title: event.target.value})
    }

    changeComponent = (event)=>{
        this.setState({title: event.target.value})
    }


    render() {
        let clickableTitle=null;

        if(this.state.show) {
            clickableTitle = <Form inline onSubmit={this.handleTitleSubmit}>
                <FormGroup controlId="formInlineTitle">
                    <FormControl type="text" onChange={this.handleTitleChange}/>
                </FormGroup>
            </Form>;
        } else {
            clickableTitle = <div>
                <Button onClick={this.changeComponent}>
                    <h3> Default Text </h3>
                </Button>
            </div>;
        }
        return (
            <div className="comment">
                {clickableTitle}
            </div>
        );
    }
}

export default H3toInput