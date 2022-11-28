import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";

export { CHeader }

export interface HeaderProps {
    readonly onMenuOptionSelected?: (option:string) => void;
}


function CHeader (props: HeaderProps)
{
    function menuOptionSelected(option:string): void {
        if (props.onMenuOptionSelected) { props.onMenuOptionSelected(option); }
    }

    return (
        <header>
            <Navbar className="navbar-dark bg-dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Inscr&iacute;bete &amp; vete</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home" onClick={()=>{menuOptionSelected("home")}}>Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Button variant="outline-warning" onClick={()=>{menuOptionSelected("login")}}>¿Y t&uacute; de qui&eacute;n eres?</Button>                            
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}