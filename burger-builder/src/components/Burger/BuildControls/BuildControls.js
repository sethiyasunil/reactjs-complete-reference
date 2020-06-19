import React from "react";
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const controls=[
    {label:'Salad', type:'salad'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
    {label:'Bacon', type:'bacon'},
]

const buildControls = (props)=>(


        <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(bldCtrl=>{
                    return <BuildControl
                            type={bldCtrl.type}
                            label={bldCtrl.label}
                            key={bldCtrl.label}
                            added={()=>props.ingredientAdded(bldCtrl.type)}
                            removed={()=>props.ingredientRemoved(bldCtrl.type)}
                            disabled = {props.disabledInfo[bldCtrl.type]}
                    />
            })}
            <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>Order Now</button>
        </div>


)

export default buildControls;