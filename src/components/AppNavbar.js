import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link,Outlet} from 'react-router-dom';
import '../navbar.css'


function AppNavbar({logged=false}) {
  return (
    <>
      <Navbar sticky='top' bg="primary" variant="dark">
        <Container>
          <Navbar.Brand ><img className='rounded m-1' style={{width:"35px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvXwhXkagoAGuGb077lzRbsVgqcObC7FQaYA&usqp=CAU" /><span className="ms-1 fs-4">SmartNotes</span></Navbar.Brand>
          {!logged ? <Nav>
            <Link style={{textDecoration:"none"}} to="/"><span className='fs-lg-5 me-3' style={{color:"white"}}>Home</span></Link>
            <Link style={{textDecoration:"none"}} to="/signup"><span className='fs-lg-5 me-3' style={{color:"white"}}>Sign Up</span></Link>
            <Link style={{textDecoration:"none"}} to="/signin"><span className='fs-lg-5 ' style={{color:"white"}}>Sign In</span></Link>
          </Nav> : <Nav>
            <Link style={{textDecoration:"none",color:"white"}} to="/notes"><span style={{marginLeft:10}}>Notes</span></Link>
            <Link style={{textDecoration:"none"}} to="/todos"><span style={{marginLeft:10,color:"white"}}>Todos</span></Link>  
            <Link style={{textDecoration:"none"}} to="/profile"><span style={{marginLeft:10,color:"white"}}>Profile</span></Link>
          </Nav>}
          
        </Container>
      </Navbar>
      <br/>
    </>
  );
}

export default AppNavbar;