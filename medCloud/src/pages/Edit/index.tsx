import Form from "../../components/Form";
import { Inputs } from '../../types/formType';
import { api } from "../../api";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Load from "../../components/Load";

const Edit = () => {
    const params = useParams();
    const [dataPaciente, setDataPaciente] = useState<Inputs>();
    const [isLoad, setIsLoad] = useState(false);
    
    let id = parseInt(params.id as string);

    const loadPatient = async () => {
        setIsLoad(true);
        let data = await api.getPaciente(id);
        if (data) {
            setDataPaciente(data);
            setIsLoad(false);
        }
       
    } 
    
    const data = async (data:Inputs) => {
        
        setIsLoad(true);

        await api.update(id, data);
        
        loadPatient();
        setIsLoad(false);
    }

    useEffect(()=>{
        loadPatient();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },['*']);

    return(
        <>
            <section className="w-full px-4 bg-gray-300 p-2">  
                <div className="container mx-auto p-2">
                    <h1 className="text-2xl">Editar paciente</h1>
                </div>

                {isLoad &&
                    <Load/>
                }

                {!isLoad &&
                    <Form data={dataPaciente} callbackJson={data}/>
                }
                
            </section>
        </>
    );
}

export default Edit;
