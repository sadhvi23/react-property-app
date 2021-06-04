const FormErrors = ({formErrors, fieldname}) => {
  if (formErrors[fieldname]) {
    return (
    <div>
      <span className="error">{fieldname.charAt(0).toUpperCase() + fieldname.slice(1)} {formErrors[fieldname]}</span>
      <br /> <br />
    </div>
    )
  } else {
    return null
  }
}

export default FormErrors;
  