import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from '@nextui-org/react';
import Elf from '../../public/Elf.png';
import Switcher from '../switcher';
import Logo from '../../public/Logo.png';
import Image from 'next/image';
const NavBar = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <Image height={60} width={60} src={Logo} alt="Santa" />
      </NavbarBrand>
      <NavbarContent className=" sm:flex gap-4" justify="center">
        <Link href="/users" color="foreground">
          <NavbarItem className="text-3xl">Leal&apos;s Secret Santa</NavbarItem>
        </Link>
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
        <NavbarItem isActive>
          <Link
            color="foreground"
            href="/users"
            className="hover:text-red-500 text-2xl "
          >
            <Image height={40} width={40} src={Elf} alt="Santa" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Switcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
