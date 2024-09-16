

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Switcher from "../switcher";
import Logo from '../../public/Logo.png'
import Image from "next/image";
const NavBar = () => {
  return (
    <Navbar>
    <NavbarBrand>
      
      <Image height={50} width={50} src={Logo} alt="Santa"/>
    </NavbarBrand>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {/* <NavbarItem>
        <Link color="foreground" href="#">
          Features
        </Link>
      </NavbarItem> */}
      {/* <NavbarItem isActive>
        <Link href="#" aria-current="page">
          Customers
        </Link>
      </NavbarItem> */}
      {/* <NavbarItem>
        <Link color="foreground" href="#">
          Integrations
        </Link>
      </NavbarItem> */}
    </NavbarContent>
    <NavbarContent justify="end">
      {/* <NavbarItem className="hidden lg:flex">
        <Link href="#">Login</Link>
      </NavbarItem> */}
      <NavbarItem>
       <Switcher/>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
  )
}

export default NavBar