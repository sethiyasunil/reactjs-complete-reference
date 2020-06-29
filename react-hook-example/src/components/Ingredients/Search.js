import React,{useState, useEffect, useCallback, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';
import axios from "axios";

const Search = React.memo(props => {

    const {onLoadIngredients} = props;
    const [enteredFilter, setEnteredFilter] = useState('')
    const inputRef = useRef()


   useEffect(()=>{

       setTimeout(()=>{
           if(enteredFilter === inputRef.current.value){
               const queryParam = enteredFilter.length===0
                   ? ''
                   : '?orderBy="title"&equalTo="'+enteredFilter+'"';
               axios.get("https://react-hooks-3546b.firebaseio.com/ingredients.json"+ queryParam)
                   .then(res=>{
                       let ingredients=[]
                       for(let key in res.data){
                           ingredients.push({id:key,...res.data[key]})
                       }
                       props.onLoadIngredients(ingredients,enteredFilter)
                   }).catch(err=>{
                   console.log(err)
               })
           }
       },500)
    },[enteredFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text"
                 ref={inputRef}
                 onChange={(event)=>{ const value = event.target.value; setEnteredFilter(value)}}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
