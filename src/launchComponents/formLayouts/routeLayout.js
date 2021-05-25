import FormErrors from "../../helpers/formErrors"
import { Route } from "react-router-dom";

export const RouteLayout = (props) => { 
  return (
    <Route path={props.path} render={() => {
      return(
        <div>
          <props.class formik={props.formik}/> 
          <div className="panel panel-default">
            <FormErrors formErrors={props.formik.values.formErrors} />
          </div>
        </div>
      )
    }} />
  )
}