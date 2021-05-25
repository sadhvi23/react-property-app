import FormErrors from "../../helpers/formErrors"
import { Route } from "react-router-dom";

export const RouteLayout = (props) => { 
  return (
    <Route path={props.path} render={() => {
      return(
        <div>
          <props.class user={props.user} setUser={props.setUser} handleInputChange={props.handleInputChange}/> 
          <div className="panel panel-default">
            <FormErrors formErrors={props.user.formErrors} />
          </div>
        </div>
      )
    }} />
  )
}