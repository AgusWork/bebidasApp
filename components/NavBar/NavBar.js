import React from 'react'
import { Navbar, Text} from "@nextui-org/react";
import LocalBarSharpIcon from '@mui/icons-material/LocalBarSharp';
import { Cart } from '../Cart/Cart';

export const NavBar = () => {
  return (
    <Navbar>
        <Navbar.Brand>
          <LocalBarSharpIcon/>
          <Text h3 b color="inherit" hideIn="xs">
            Menu
          </Text>
        </Navbar.Brand>
        <Cart />
    </Navbar>
  )
}
