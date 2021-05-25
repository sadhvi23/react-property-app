import { Link } from "react-router-dom";

const LinkLayout = (props) => {  
  return (
    <Link className="nav-link" to={props.path}>{props.label}</Link>
  );
}

export default LinkLayout;