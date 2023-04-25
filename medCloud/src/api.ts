import axios from 'axios';
import { Inputs } from './types/formType';
import Swal from 'sweetalert2';

const axiosInstance = axios.create({
    baseURL: 'https://v3hq9nu191.execute-api.us-east-1.amazonaws.com/dev'
});


const axiosInstanceViaCEP = axios.create({
    baseURL: 'https://viacep.com.br/ws'
});

export const api = {
    getAll: async (currentPage?:number, search?:string) => {
       try {
                      
        let response = await axiosInstance.get(`/paciente?search=${search}&page=${currentPage}&pageSize=10`);
        return response.data.data;
           
       } catch (e:any) {
          console.log(`${e.response.status} - ${e.response.data.message}`);
          return false;
       }
    }, 
    getPaciente: async(id:number) => {
       try {
            let headers = {
                authorization: '',
                'Content-Type': 'application/json'
            }

            let response = await axiosInstance.get(`/paciente/${id}`, {headers});
            return response.data;
       } catch(e) {
            console.log(e);
            return false;
       }
    },
    addNew: async (data:Inputs) => {
       try {
            let headers = {
                authorization: '',
                'Content-Type': 'application/json'
            }

            let response = await axiosInstance.post('/paciente', data, {headers});

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Paciente Cadastrado com sucesso!',
                });
            }

            return true;
       } catch(e: any) {
            if (e.response.status === 403) {
                Swal.fire({
                    icon: 'error',
                    title: e.response.data.message,
                });
            }
            console.log(e);
            return false;
       }
    }, 
    update: async (id:number, data:Inputs) => {
        try {
            let headers = {
                authorization: '',
                'Content-Type': 'application/json'
            }

            let response = await axiosInstance.put(`/paciente/${id}`,data, {headers});
            
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Paciente atualizado com sucesso!',
                });
            }

            return true;
        } catch(e:any) {
            if (e.response.status === 403) {
                Swal.fire({
                    icon: 'error',
                    title: e.response.data.message,
                });
            }
            console.log(e);
            return false;
        }
    },
    delete: async (id:number) => {
        try {
            let headers = {
                authorization: '',
                'Content-Type': 'application/json'
            }

            let response = await axiosInstance.delete(`/paciente/${id}`, {headers});
            return response.data;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
}

export const apiViaCEP = {
    get: async (cep:string) => {
        try {
            let response;
            cep = cep.replace('-','');

            response = await axiosInstanceViaCEP.get(`/${cep}/json/`);

            if (response.data?.erro) {
                Swal.fire({
                    icon: 'error',
                    title: 'CEP não encontrado!',
                });

                return [];
            }

            return response.data;
        } catch(e) {
            console.log(e);
            return false;
        }
    }, 
}
