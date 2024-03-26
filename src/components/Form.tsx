import { useState, ChangeEvent, Dispatch, FormEvent, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { categories } from "../data/categories"
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = { 
    dispatch: Dispatch< ActivityActions >,
    state: ActivityState
}
const initialState: Activity = {
    id: uuidv4(),
    category: 1 ,
    nameActivity: '',
    calories: 0
}

function Form( { dispatch , state } : FormProps ) {

    const [ activity , setActivity ] = useState<Activity>( initialState );

    useEffect(() => {
        if( state.activeId ){ 
            console.log("id seleccionado" , state.activeId )
            const selectedActivity = state.activities.filter( activityState => activityState.id === state.activeId )[0];
            setActivity( selectedActivity );
        }
    } , [ state.activeId ] );

    const handleChange = ( e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>  ) => {
        console.log( e.target.id );
        const isNumberField = ['category' , 'calories'].includes( e.target.id );
        setActivity( { 
            ...activity,
            [ e.target.id ]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { calories , nameActivity } = activity;
        return nameActivity.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'save-activity' , payload: { newActivity: activity }})
        setActivity( 
            {...initialState , id: uuidv4() } 
        );
    }

    return(  
        <>
            <form   onSubmit={ handleSubmit }
                    className="space-y-5 bg-white shadow p-10 rounded-lg">

                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="category">Categoria:</label>
                    <select className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                            id="category"
                            value={ activity.category }
                            onChange={ handleChange }>
                            {
                               categories.map( ( { id , name } ) => ( 
                                <option key={ id }
                                        value={ id }>
                                    { name}
                                </option>
                               ) ) 
                            }
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="nameActivity">Actividades:</label>
                    <input  id="nameActivity"
                            type="text"
                            className="border border-slate-300 p-2 rounded-lg"
                            placeholder="Ej. Comida, Jugo de naranja, Ensalada , Ejercicio, Pesas"
                            value={ activity.nameActivity }
                            onChange={ handleChange } />
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="calories">Calorias:</label>
                    <input  id="calories"
                            type="text"
                            className="border border-slate-300 p-2 rounded-lg"
                            placeholder="Calorias. ej. 300 o 500"
                            value={ activity.calories }
                            onChange={ handleChange } />
                </div>

                <input  
                        type="submit"
                        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-center text-white cursor-pointer disabled:opacity-10"
                        value={activity.category == 1 ? 'Guardar comida' : 'Guardar ejercicio'}
                        disabled={ !isValidActivity() } />
            </form>

        </>
    )
}
export default Form