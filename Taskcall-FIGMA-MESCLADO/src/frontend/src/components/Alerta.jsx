import Swal from 'sweetalert2'
import userInfo from '../assets/scripts/userInfo'

const Alerta = () =>{
    const nome = userInfo.name
    const cargo = userInfo.cargo
    const uid = userInfo.uid
    
    Swal.fire({
      title: `Olá, ${nome}`,
      html: `Cargo: ${cargo}<br><br>
      UID: ${uid}`,
      icon: "success",
      confirmButtonText: "Continuar",
    })
}

export default Alerta