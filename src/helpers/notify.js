import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure();

const notify = (message) => { 
  // Calling toast method by passing string
  toast(message, {position: toast.POSITION.TOP_CENTER}) 
}

export default notify;