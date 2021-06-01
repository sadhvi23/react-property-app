export const Button = (props) => {  
  return (
    <button type={props.type} disabled={props.disabled} className={props.class} onClick={props.onClick} name={props.type}>{props.label}</button>
  );
}