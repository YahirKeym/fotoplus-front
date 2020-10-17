import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import './css/nav-menu.css';
import {Nav, NavItem, Navbar, UncontrolledDropdown, DropdownToggle,DropdownItem,DropdownMenu, Collapse} from 'reactstrap';
let provisionalStrings = {
  home: "Inicio",
  shop: "Productos",
  about_us: "Nosotros",
  contact_us: "Contactanos",
};
const NavMenu = (props) => {
  let { strings, menuWhiteClass, sidebarMenu } = props;
  if (strings === undefined) {
    strings = provisionalStrings;
  }
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <Navbar>
        <Collapse isOpen={true} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
                <Link to={process.env.PUBLIC_URL + "/"}>
                  {strings["home"].toUpperCase()}
                  {sidebarMenu ? (
                    <span>
                      <i className="fa fa-angle-right"></i>
                    </span>
                  ) : null}
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    <li>
                      {" "}
                      {strings["shop"].toUpperCase()}
                      {sidebarMenu ? (
                        <span>
                          <i className="fa fa-angle-right"></i>
                        </span>
                      ) : null}
                    </li>
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem>
                    <a href={`/shop/`}>Tienda</a>
                  </DropdownItem>
                  <DropdownItem>
                    <a href={`/shop/category/Marco`}>Marcos</a>
                  </DropdownItem>
                  <DropdownItem>
                    <a href={`/shop/category/Marcos%20Personalizados`}>Marcos Personalizados</a>
                  </DropdownItem>
                  <DropdownItem>
                    <a href={`/shop/category/Album`}>Albunes</a>
                  </DropdownItem>
                  <DropdownItem>
                    <a href={`/shop/category/Fotobook`}>Fotobook</a>
                  </DropdownItem>
                  <DropdownItem>
                    <a href={`/shop/category/Impresiones`}>Impresiones</a>
                  </DropdownItem>
                  <DropdownItem>
                    <a href={`/shop/category/Fotoregalos`}>Fotoregalos</a>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Link to={process.env.PUBLIC_URL + "/about"}>
                  {strings["about_us"].toUpperCase()}
                </Link>
              </NavItem>
              <NavItem>
                <Link to={process.env.PUBLIC_URL + "/contact"}>
                  {strings["contact_us"].toUpperCase()}
                </Link>
              </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
};

export default multilanguage(NavMenu);
