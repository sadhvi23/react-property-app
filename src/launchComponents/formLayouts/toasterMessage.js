import Toast from 'react-bootstrap/Toast'

export const ToasterMessage = (props) => {    
    return (
        <Toast>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    );
  }