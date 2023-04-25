import Form from "../../components/Form";
import { Inputs } from '../../types/formType';
import { api } from "../../api";
import { useNavigate } from 'react-router-dom';

const New = () => {
    const navigate = useNavigate();

    const data = async (data:Inputs) => {
       await api.addNew(data);
       navigate('/');
    };

    return(
        <>
            <section className="w-full px-4 bg-gray-300 p-2">  
                <div className="container mx-auto p-2">
                    <h1 className="text-2xl">Cadastrar paciente</h1>
                </div>
                
                <Form callbackJson={data}/>
            </section>
        </>
    );
}

export default New;
