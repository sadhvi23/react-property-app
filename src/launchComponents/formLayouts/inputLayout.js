export const Input = (props) => {    
  return (
    <div className={props.divClass}>
      { props.required ? (
      <div>
        <label>{props.label}</label>
        <input type={props.type} name={props.name} className={props.class} placeholder=
        {props.placeholder} defaultValue={props.defaultValue} onChange={props.handleChange} checked={props.checked} required />
        <br />
      </div>
      ) : (
      <div>
        <label>{props.label}</label>
        <input type={props.type} name={props.name} className={props.class} placeholder=
        {props.placeholder} defaultValue={props.defaultValue} onChange={props.handleChange} checked={props.checked} />
        <br />
      </div>
      )}
    </div>
  );
}