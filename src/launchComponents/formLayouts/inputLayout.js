export const Input = (props) => {    
  return (
    <div className={props.divClass}>
      <label>{props.label}
      <input type={props.type} name={props.type} className={props.class} placeholder=
      {props.placeholder} value={props.value} onChange={props.handleChange} />
      </label>
      <br />
      <br />
    </div>
  );
}