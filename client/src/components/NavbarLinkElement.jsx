import { Link } from "react-router-dom"

function NavbarLinkElement({ children, destination }) {
  return <Link to={destination}>{children}</Link>
}

export default NavbarLinkElement
