export const Input = (props) => {    
  return (
    <div className={props.divClass}>
      <label>{props.label}</label>
      <input type={props.type} name={props.name} className={props.class} placeholder=
      {props.placeholder} value={props.value} onChange={props.handleChange} />
      <br />
    </div>
  );
}