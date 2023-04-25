import FormatDate from "../../../Helps/FormatDate";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    item: {
        id: number,
        nome: string,
        email: string,
        data_nascimento: string,
    },
    
    funcDel(id:number): void;
}

const TR = ({ item, funcDel }: Props) => {
    const navigate = useNavigate();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'block rounded-md  p-2 font-medium bg-red-800 text-white ml-2',
          cancelButton: 'block rounded-md  p-2 font-medium bg-gray-800 text-white'
        },
        buttonsStyling: false
    });

   const handleClickDell = (id:number) => {
    swalWithBootstrapButtons.fire({
        title: 'Excluir paciente',
        text: 'Você não terá mais acesso ao paciente, você quer mesmo excluí-lo?',
        showCancelButton: true,
        icon: 'warning',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sim, excluir',
        denyButtonText: `Don't save`,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Paciente deletado com sucesso', '', 'success')
          funcDel(id);
        } else if (result.isDenied) {
          Swal.fire('Paciente não foi deletado', '', 'info')
        }
    });
   }

   const handleClickEdit = (id:number) => {
      navigate(`/edit/${id}`);
   }

    return (
        <div className="flex items-center justify-between mb-5 p-2 Header_Header__2g8Ew">
            <div className="w-full">
                {item.nome}
            </div>
            <div className="w-full">
                {item.email}
            </div>
            <div className="w-full">
                {FormatDate(item.data_nascimento)}
            </div>
            <div className="flex justify-end w-full">
                <button onClick={() => {handleClickEdit(item.id)}}><EditIcon/></button>
                <button onClick={() => {handleClickDell(item.id)}}><DeleteIcon/></button>
            </div>
        </div>
    );
}

export default TR;
