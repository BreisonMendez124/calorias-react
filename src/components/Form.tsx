import { useState, ChangeEvent } from "react";
import { categories } from "../data/categories"
import { Activity } from "../types/categories";

function Form() {

    const [ activity , setActivity ] = useState<Activity>({
        category: 0 ,
        nameActivity: '',
        calories: 0
    });

    const handleChange = ( e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>  ) => {
        const isNumberField = ['category' , 'calories'].includes( e.target.id );
        setActivity( { 
            ...activity,
            [ e.target.id ]: isNumberField ? +e.target.value : e.target.value
        })
    }

    return( 
        <>
            <form className="space-y-5 bg-white shadow p-10 rounded-lg">

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
                        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-center text-white cursor-pointer"
                        value='Guardar comida o Guaradar ejercicio' />
            </form>

        </>
    )
}
export default Form