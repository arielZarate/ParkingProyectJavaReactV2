
//=============sweeetalert===============
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
// Inicializa SweetAlert con React
const MySwal = withReactContent(Swal);



//====================================
//================Enum================
 enum SweetPosition {
  TOP_RIGHT = "top-right",
  TOP_LEFT = "top-left",
  CENTER = "center",
  BOTTOM_RIGHT = "bottom-right",
  BOTTOM_LEFT = "bottom-left",
}

 enum SweetType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  QUESTION = "question",
}
//========FIN ENUM============================== 


// Tipos para las propiedades del hook
interface SweetProp {
  title: string;
  text: string;
  type?: SweetType;
  position?:SweetPosition ;
  time?:number;
}


//===========================================
//=====COMPONENT HOOK==================
const useSweetAlertHook = () => {



  //==============FUNCION SHOWALERT==================
  const showAlert = ({ title, text, type=SweetType.SUCCESS,position=SweetPosition.TOP_RIGHT ,time=1800}:SweetProp) => {
    MySwal.fire({
      title,
      text,
      icon:type ,
      timer: time,
      position
      
    });
  };

  //=============FUNCION CONFIRMALERT=======================
  const confirmAlert = ({
    title,
    text,
    type =SweetType.WARNING ,
    position=SweetPosition.CENTER,
  }: SweetProp) => {
    MySwal.fire({
      title,
      text,
      icon: type,
      showCancelButton: true, // Mostrar botón de cancelar
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
      timer: 1200,
      position,
    });
  }; 

  //=======================================================
  return {
    showAlert,
    confirmAlert,
    SweetPosition,
    SweetType
  };
};

export default useSweetAlertHook;
