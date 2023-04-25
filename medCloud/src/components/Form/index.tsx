import { SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm, Controller as ReactHookFormController } from 'react-hook-form';
import { Inputs } from '../../types/formType';
import ReactInputMask  from 'react-input-mask';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as s from '../../Helps/String';
import { apiViaCEP } from '../../api';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from 'date-fns/locale/pt-BR'

registerLocale('ptBR', ptBR);

type Props = {
    callbackJson(dados:Inputs): void,
    data?:Inputs
}

const Form = ({ callbackJson, data }: Props) => {
    const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm<Inputs>();
    const [startDate, setStartDate] = useState<Date | null>(null);
    
    const onSubmit: SubmitHandler<Inputs> = async (newData) => {
        let cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
        let cpfRegex = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/;

        if (!cepRegex.test(newData.cep)) {
            Swal.fire({
                icon: 'error',
                title: 'CEP invalido',
            });

            return false;
        }

        if (!cpfRegex.test(newData.cpf)) {
            Swal.fire({
                icon: 'error',
                title: 'CPF invalido',
            });

            return false;
        }
    
        newData.nome     = s.capitalizeWords(newData.nome);
        newData.email    = s.lowerString(newData.email);
        newData.endereco = s.capitalizeWords(newData.endereco);
        newData.bairro   = s.capitalizeWords(newData.bairro);
        newData.cidade   = s.capitalizeWords(newData.cidade);
        newData.uf       = s.upperString(newData.uf);
        newData.pais     = s.capitalizeWords(newData.pais);

        callbackJson(newData);
    }

    const onblur = async (cep:string) => {
        
        let viaCep = await apiViaCEP.get(cep);

        if (viaCep.length != 0) {
            setValue("uf", viaCep?.uf);
            setValue("cidade", viaCep?.localidade);
            setValue("endereco", viaCep?.logradouro);
            setValue("bairro", viaCep?.bairro);
            setValue("pais", 'Brasil');
        }
    }

    const handleDateChange = (date: Date) => {
        setStartDate(date);
    }

    useEffect(() => {
        if (data?.data_nascimento) 
        {
            setStartDate(new Date(data?.data_nascimento as unknown as Date));
        }

        setValue("nome", data?.nome || "");
        setValue("email", data?.email || "");
        setValue("cpf", data?.cpf || "");
        setValue("cep", data?.cep || "");
        setValue("endereco", data?.endereco || "");
        setValue("numero", data?.numero || "");
        setValue("complemento", data?.complemento || "");
        setValue("bairro", data?.bairro || "");
        setValue("cidade", data?.cidade || "");
        setValue("uf", data?.uf || "");
        setValue("pais", data?.pais || "");
    }, [data, setValue]);

    return(
        <div className="container mx-auto px-4 mt-5 p-2  rounded-lx">
            <div className="flex justify-between Header_Header__2g8Ew p-2 bg-white">
                 <h2>Dados pessoais</h2>
            </div>

            <form 
                onSubmit={handleSubmit(onSubmit)} 
            >
                <div className="container mx-auto px-4 p-5 bg-white">
                    <div className="flex gap-5">
                            <div className="flex-col w-full bg-gray-300 p-2 rounded">
                                <div className="xxl:text-lg text-ls font-medium">
                                    Nome
                                </div>
                                <div className="mt-1">
                                    <input
                                        className="w-full placeholder-quaternary-light xxl:text-lg text-ls bg-input-bg rounded p-2 sm:w-full sm:mb-1"
                                        {...register("nome", { required: true })}
                                    />
                                </div>
                                {errors.nome && <span className='block bg-red-500 text-white p-1 mt-1'>Este campo é obrigatorio</span>}
                            </div>

                            <div className="flex-col w-full bg-gray-300 p-2 rounded">
                                <div className="xxl:text-lg text-ls font-medium">
                                    Email
                                </div>
                                <div className="mt-1">
                                    <input
                                        className="w-full placeholder-quaternary-light xxl:text-lg text-ls bg-input-bg rounded p-2 sm:w-full sm:mb-1"
                                        type="email"
                                        {...register("email", { required: true })}
                                    />
                                </div>
                                {errors.email && <span className='block bg-red-500 text-white p-1 mt-1'>Este campo é obrigatorio</span>}
                            </div>

                            <div className="flex-col w-full bg-gray-300 p-2 rounded">
                                <div className="xxl:text-lg text-ls font-medium">
                                    Data de nascimento
                                </div>
                                <div className="mt-1">
                                    <ReactHookFormController
                                        control={control}
                                        name="data_nascimento"
                                        rules={{ required: true }}
                                        render={({ field: { onChange } }) => (
                                            <DatePicker 
                                            selected={startDate} 
                                            onChange={date => {
                                                handleDateChange(date as Date);
                                                onChange(date);
                                            }} 
                                              className="w-full placeholder-quaternary-light xxl:text-lg text-ls bg-input-bg rounded p-2 sm:w-full sm:mb-1"
                                              locale="ptBR"
                                              dateFormat="dd 'de' MMMM 'de' yyyy" 
                                            />
                                      )}
                                    
                                />
                                   
                                </div>
                                {errors.data_nascimento && <span className='block bg-red-500 text-white p-1 mt-1'>Este campo é obrigatorio</span>}
                            </div>

                            <div className="flex-col w-full bg-gray-300 p-2 rounded">
                                <div className="xxl:text-lg text-ls font-medium">
                                    CPF
                                </div>
                                <div className="mt-1">
                                <ReactHookFormController
                                    render={({ field }) => (
                                        <ReactInputMask
                                        className="w-full placeholder-quaternary-light xxl:text-lg text-ls bg-input-bg rounded p-2 sm:w-full sm:mb-1"
                                        {...field}
                                        mask="999.999.999-99"
                            
                                        />
                                    )}
                                    control={control}
                                    name="cpf"
                                    rules={{ required: true }}
                                />
                                </div>
                                {errors.cpf && <span className='block bg-red-500 text-white p-1 mt-1'>Este campo é obrigatorio</span>}
                            </div>
                    </div>

                    <div className="Header_Header__2g8Ew mt-3 mb-3"></div>
                    
                    <div className="flex gap-5 mb-5">
                        <div className="flex-col w-full bg-gray-300 p-2 rounded">
                            <div className="xxl:text-lg text-ls font-medium">
                                CEP
                            </div>
                            <div className="mt-1">
                                <ReactHookFormController
                                    render={() => (
                                        <ReactInputMask
                                            className="w-full placeholder-quaternary-light xxl:text-lg text-ls bg-input-bg rounded p-2 sm:w-full sm:mb-1"
                                            mask="99999-999"
                                            {...register("cep", { required: true })}
                                            onBlur={(e) => {onblur(e.target?.value)}}
                                        />
                                    )}
                                    control={control}
                                    name="cep"
                                    rules={{ required: true }}
                                />
                            </div>
                            {errors.cep && <span className='block bg-red-500 text-white p-1 mt-1'>Este campo é obrigatorio</span>}
                        </div>

                        <div className="flex-col w-full bg-gray-300 p-2 rounded">
                            <div className="xxl:text-lg text-ls font-medium">
                                Endereço
                            </div>
                            <div className="mt-1">
                                <input
                                    className="w-full placeholder-quaternary-light xxl:text-lg text-ls bg-input-bg rounded p-2 sm:w-full sm:mb-1"
                                    type="text"
                                    {...register("endereco", { required: true })}
                                />
                            </div>
                            {errors.endereco && <span className='block bg-red-500 text-white p-1 mt-1'>Este campo é obrigatorio</span>}
                        </div>

                        <div className="flex-col w-full bg-gray-300 p-2 rounded">
                            <div className="xxl:text-lg text-ls font-medium">
                                Número
                            </div>
                            <div className="mt-1">
                                <input
                                    className="w-full placeholder-quaternary-light xxl:text-lg text-ls bg-input-bg rounded p-2 sm:w-full sm:mb-1"
                                    type="number"
                                    {...register("numero", { required: true})}                                    
                                />
                            </div>
                            {errors.numero && <span className='block bg-red-500 text-white p-1 mt-1'>Este campo é obrigatorio</span>}
                        </div>

                        <div className="flex-col w-full bg-gray-300 p-2 rounded">
                            <div className="xxl:text-lg text-ls font-medium">
                                Complemento
                            </div>
                            <div className="mt-1">
                                <input
                                    className="w-full placeholder-quaternary-light xxl:text-lg text-ls bg-input-bg rounded p-2 sm:w-full sm:mb-1"
                                    {...register("complemento", )}                                    
                                />
                            </div>
                            {errors.complemento && <span className='block bg-red-500 text-white p-1 mt-1'>Este campo é obrigatorio</span>}
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="flex-col w-full bg-gray-300 p-2 rounded">
                            <div className="xxl:text-lg text-ls font-medium">
                                Bairro
                            </div>
                            <div className="mt-1">
                                <input
                                    className="w-full placeholder-quaternary-light xxl:text-lg text-ls bg-input-bg rounded p-2 sm:w-full sm:mb-1"
                                    {...register("bairro", { required: true })}                                    
                                />
                            </div>
                            {errors.bairro && <span className='block bg-red-500 text-white p-1 mt-1'>Este campo é obrigatorio</span>}
                        </div>

                        <div className="flex-col w-full bg-gray-300 p-2 rounded">
                            <div className="xxl:text-lg text-ls font-medium">
                                Cidade
                            </div>
                            <div className="mt-1">
                                <input
                                    className="w-full placeholder-quaternary-light xxl:text-lg text-ls bg-input-bg rounded p-2 sm:w-full sm:mb-1"
                                    type="text"
                                    {...register("cidade", { required: true })}                                    
                                />
                            </div>
                            {errors.cidade && <span className='block bg-red-500 text-white p-1 mt-1'>Este campo é obrigatorio</span>}
                        </div>

                        <div className="flex-col w-full bg-gray-300 p-2 rounded">
                            <div className="xxl:text-lg text-ls font-medium">
                                UF
                            </div>
                            <div className="mt-1">
                                <input
                                    className="w-full placeholder-quaternary-light xxl:text-lg text-ls bg-input-bg rounded p-2 sm:w-full sm:mb-1"
                                    type="text"
                                    {...register("uf", { required:true} )}
                                    maxLength={2}                                                                       
                                />
                            </div>
                            {errors.uf && <span className='block bg-red-500 text-white p-1 mt-1'>Este campo é obrigatorio</span>}
                        </div>

                        <div className="flex-col w-full bg-gray-300 p-2 rounded">
                            <div className="xxl:text-lg text-ls font-medium">
                                País
                            </div>
                            <div className="mt-1">
                                <input
                                    className="w-full placeholder-quaternary-light xxl:text-lg text-ls bg-input-bg rounded p-2 sm:w-full sm:mb-1"
                                    {...register("pais", { required: true })}                                                                        
                                />
                            </div>
                            {errors.pais && <span className='block bg-red-500 text-white p-1 mt-1'>Este campo é obrigatorio</span>}
                        </div>
                    </div>
                </div>
                <div className="Header_Header__2g8Ew mt-3 mb-3"></div>
                <div className="flex justify-end gap-2 pt-2">
                        <Link 
                            to="/" 
                            className="block rounded-md p-3 font-medium bg-gray-500 text-white cursor-pointer"
                           
                         >
                            Cancelar
                        </Link>

                        <input 
                            type="submit" 
                            className="block rounded-md  p-3 font-medium bg-blue-800 text-white cursor-pointer"
                            value='Salvar'
                        />
                </div>
            </form>
        </div>
    )
}

export default Form;
