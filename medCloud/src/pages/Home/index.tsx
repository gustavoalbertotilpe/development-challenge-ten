import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TR from "../../components/Table/TR";
import { api } from '../../api';
import * as s from '../../Helps/String';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Load from '../../components/Load';

const Home = () => {
   const [patients, setPatients] = useState([]);
   const [search, setSearch] = useState('');
   const [isLoad, setIsLoad] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);

   const handleClick = () => {
     loadPatients();
   }

   useEffect(()=>{

    if (currentPage > 0){
        loadPatients();
    }
    
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[currentPage]);

   const loadPatients = async () => {
        setIsLoad(true);
        setPatients([])

        try {
            let json = await api.getAll(currentPage, search);

            if (json) {
                
                if (json.length === 0) {
                    if (currentPage > 1) {
                       setCurrentPage(currentPage - 1);
                    }
                } 

                setPatients(json);
                setIsLoad(false);
            }
        
        } catch(e) {
            console.error(e);
        }
   }

    const handleDelete = async (id:number) => {
        try {  
          await api.delete(id);
          loadPatients();
        } catch(e) {
            console.error(e);
        }
    }

    return(
       <section>
            <section className="container mx-auto mt-2">
                <div className="container mx-auto p-2">
                    <div className="flex justify-end mb-1 p-2">
                        <Link 
                          to='/new'
                          className='block rounded-md  p-2 font-medium bg-blue-800 text-white'
                        >
                            <AddIcon/>
                            Novo
                        </Link>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 mt-5 bg-gray-300 p-2">
                <div className="container mx-auto px-4 mt-5 p-2  rounded-lx">
                    <div className="flex justify-between gap-5 items-center">
                        <div className="flex">
                            <h2>Pacientes</h2>
                        </div>
                        <div className="flex w-full bg-white items-center gap-1">
                            <SearchIcon className='ml-2 mr-1'/> |
                            <input 
                                className="w-full rounded p-2 border-gray-300"
                                value={search}
                                onChange={e => setSearch(s.capitalizeWords(e.target.value))}
                            />
                        </div>
                        <div className="flex">
                            <button onClick={handleClick} className="xxl:text-base text-xs xxl:h-10 h-8 rounded-md xxl:px-4 px-3 font-medium bg-blue-800 text-white">Buscar</button>
                        </div>
                    </div>
                </div>

                {isLoad &&
                    <Load/>
                }
                        
                {(!isLoad && patients.length > 0) &&
                    <div className="container mx-auto px-4 mt-5 p-2 bg-white rounded-lx">
                        <div className="flex justify-between mb-5 Header_Header__2g8Ew p-2">
                            <div className="w-full">
                                Nome
                            </div>
                            <div className="w-full">
                                Email
                            </div>
                            <div className="w-full">
                                Data de nascimento
                            </div>
                            <div className="w-full">

                            </div>
                        </div>
                        {patients.map((item, index) => (
                        <TR key={index} item={item} funcDel={handleDelete} />
                        ))} 

                        <div className='flex justify-between'>
                            <button onClick={() => (currentPage - 1 > 0) ? setCurrentPage(currentPage - 1) : null}><NavigateBeforeIcon /></button>
                            <span>Página {currentPage}</span>
                            <button onClick={() => setCurrentPage(currentPage + 1)}><NavigateNextIcon /></button>
                        </div>     
                    </div> 
                }     

                {(!isLoad && patients.length === 0 && search.length === 0) &&
                    <div className="container mx-auto px-4 mt-5 p-2 bg-white rounded-lx">
                       <h1>Não temos nenhum paciente cadastrado no sistema</h1>
                    </div> 
                }   
            

                {(!isLoad && patients.length === 0 && search.length > 0) &&
                    <div className="container mx-auto px-4 mt-5 p-2 bg-white rounded-lx">
                      <h1>Não foi encontrado resultado para "{search}"</h1>
                    </div>
                } 
            </section>
       </section>
    );
}

export default Home;
