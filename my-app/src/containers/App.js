import React from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons'
import Cockpit from './Cockpit/Cockpit'
import withClass from "../hoc/withClass";
import AuthContext from '../context/auth-context'

class App extends React.Component {

    constructor(props){
        super(props)

        this.state ={
            persons:[
                {id:1, name:'sunil',age:'28'},
                {id:2, name:'manoj',age:20}
            ],
            showPersons:true,
            showCockpit:true,
            authenticated:false
        }

    }

    nameChangedHandler = (event, id)=>{

    const personIndex = this.state.persons.findIndex(p=>{
      return p.id === id;
  })

      const newPerson = {...this.state.persons[personIndex]}
      newPerson.name=event.target.value

      const persons = [...this.state.persons]
      persons[personIndex] = newPerson
      this.setState({persons:persons})


  }

  togglePersonHandler = ()=>{
      this.setState({showPersons: !this.state.showPersons})
  }

  loginHandler = ()=>{
        console.log('App.js loginHandler')
        this.setState({authenticated:true})
  }


    render(){

     let persons=null
     if(this.state.showPersons){
         persons = <Persons persons={this.state.persons} changed={this.nameChangedHandler}/>
     }



      return(
          <div className="App">
              <button onClick={()=>this.setState(()=>{ return {showCockpit:!this.state.showCockpit}})}>
                  Toggle Cockpit
              </button>
              <AuthContext.Provider value={{authenticated: this.state.authenticated, login:this.loginHandler}}>
                  {this.state.showCockpit?
                      (<Cockpit clicked={this.togglePersonHandler}
                               personsLength={this.state.persons.length}
                               showPersons={this.state.showPersons}
                               title={this.props.title}
                      />):null}
                   {persons}
              </AuthContext.Provider>
          </div>
      )
    }
}

export default withClass(App, classes.App);
