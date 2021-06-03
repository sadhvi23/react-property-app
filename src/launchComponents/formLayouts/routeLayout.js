import { Route } from "react-router-dom";

export const RouteLayout = (props) => { 
  return (
    <Route path={props.path} render={() => {
      return(
        <div>
          <props.class formik={props.formik} setUser={props.setUser} /> 
        </div>
      )
    }} />
  )
}