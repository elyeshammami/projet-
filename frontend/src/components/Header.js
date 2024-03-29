import {Route} from "react-router-dom"
import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import { Nav,Container,Navbar , NavDropdown} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap"
import {logout} from "../actions/userActions"
import SearchBox from "../components/SearchBox"



function Header() {
  const dispatch=useDispatch()
  const cart = useSelector(state=>state.cart)
  const {cartItems} = cart

  const userLogin = useSelector(state=>state.userLogin)
  const { userInfo }=userLogin
  const logoutHandler=()=>{
    dispatch(logout())
  }


  return (
<header>
  {/* bg='dark' variant='dark' expand='lg' */}
<Navbar  collapseOnSelect className='navigation'>
    <Container >
    <LinkContainer to="/">
    <Navbar.Brand>  <span className='title'> <h1>MyShop</h1> </span> </Navbar.Brand>
    </LinkContainer>
  
    <Navbar.Collapse id='basic-navbar-nav'>
    <Nav className='ms-auto'>
    <LinkContainer to="/cart">
        <Nav.Link id="cart"> <i className='fas fa-shopping-cart' id="carticon">
        </i> Cart
        </Nav.Link>
    </LinkContainer>
    {userInfo? (
     <NavDropdown title={userInfo.name} id="username">
       <LinkContainer to="/profile">
         <NavDropdown.Item>Profile</NavDropdown.Item>
       </LinkContainer>
       <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
     </NavDropdown>
    ) 
  : <LinkContainer to="/login">
    <Nav.Link id="sign"> <i className='fas fa-user'></i> Sign In</Nav.Link>
    </LinkContainer>
    }
    {userInfo && userInfo.isAdmin && (
      <NavDropdown title="Admin" id="adminmenu">
      <LinkContainer to="/admin/userlist">
        <NavDropdown.Item>Users</NavDropdown.Item>
      </LinkContainer>

      <LinkContainer to="/admin/productlist">
        <NavDropdown.Item>Products</NavDropdown.Item>
      </LinkContainer>

      <LinkContainer to="/admin/orderlist">
        <NavDropdown.Item>Orders</NavDropdown.Item>
      </LinkContainer>
      
    </NavDropdown>
    ) }
    </Nav>
     
    </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header