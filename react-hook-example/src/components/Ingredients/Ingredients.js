import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios'

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorModal from "../UI/ErrorModal";

const  Ingredients=()=> {


    const [ingredients,setIngredients] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const addIngredientHandler = newIngredient =>{
        setIsLoading(true)
        axios.post("https://react-hooks-3546b.firebaseio.com/ingredients.json",newIngredient)
            .then(res=>{
                newIngredient = {...newIngredient, id:res.data.name}
                setIngredients((prevIngredients)=>([...prevIngredients,newIngredient]))
                setIsLoading(false)
            }).catch(err=>{
                setError(err.message)
                setIsLoading(false)

        })
    }

    const filterdIngredientsHandler = useCallback(filteredIngredients =>{
            setIngredients(filteredIngredients)
    },[])

    const removeIngredientHandler = (id)=>{
        setIsLoading(false)
        setIngredients(ingredients.filter( currIng=> currIng.id !== id))
            axios.delete('https://react-hooks-3546b.firebaseio.com/ingredients/'+id+'.json')
                .then(res=>{
                    setIngredients((prevIngredients)=>(prevIngredients.filter(ig=>id.id !== id)))
                    setIsLoading(true)
                }).catch(err=>{
                    setError(err.message)
                    setIsLoading(false)
            })
        }

        const clearError = () =>{
            setError(null)
        }

  return (
    <div className="App">
        {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>
        <section>
                <Search onLoadIngredients={filterdIngredientsHandler}/>
                <IngredientList ingredients = {ingredients} onRemoveItem={removeIngredientHandler}/>
            </section>
    </div>
  );
}

export default Ingredients;
