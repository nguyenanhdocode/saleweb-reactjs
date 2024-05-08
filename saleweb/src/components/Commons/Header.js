import { useEffect, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import Apis, { endpoints } from "../../configs/Apis";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [cateId, setCateId] = useState(0);
    const nav = useNavigate();

    const loadCategories = async () => {
        try {
            // setIsLoading(true);
            const res = await Apis.get(endpoints['categories']);
            setCategories(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            // setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const filterByCateId = (e, cateId) => {
        e.preventDefault();
        nav(`/?cateId=${cateId}`)
    }

    return <>
        <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">SaleApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                {categories.map(p => <NavDropdown.Item onClick={e => filterByCateId(e, p['id'])} key={p['id']} href="#">{p['name']}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Form inline>
                        <Row>
                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className=" mr-sm-2"
                                />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Navbar>
    </>
}

export default Header;