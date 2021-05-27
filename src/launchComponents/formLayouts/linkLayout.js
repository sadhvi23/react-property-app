import { Link } from "react-router-dom";

const LinkLayout = (props) => {  
  return (
    <b><Link className="nav-link" to={props.path}>{props.label}</Link></b>
  );
}

export default LinkLayout;