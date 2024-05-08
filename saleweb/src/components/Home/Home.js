import { useEffect, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import Apis, { endpoints } from "../../configs/Apis";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Home = () => {

    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [kw, setkw] = useState('');
    const [page, setPage] = useState(1);
    const [cateId, setCateId] = useState(0);

    const loadCategories = async () => {
        try {
            setIsLoading(true);
            const res = await Apis.get(endpoints['categories']);
            setCategories(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setIsLoading(false);
        }
    };

    const loadProduct = async () => {
        try {
            let url = `${endpoints['products']}?kw=${kw}&page=${page}`;
            if (cateId > 0)
                url = `${url}&cateId=${cateId}`;
            const res = await Apis.get(url);
            if (page > 1)
                setProducts(current => [...current, ...res.data]);
            else
                setProducts(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadMore = () => {
        setPage(current => current + 1);
    }

    const filterByCateId = (e, cateId) => {
        e.preventDefault();
        setCateId(cateId);
    }

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadProduct();
    }, [kw, page, cateId]);

    return <>
        {isLoading && <Spinner animation="grow" variant="success" />}

        {/* Load load categories */}
        {categories != null && <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">SaleApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                {categories.map(p => <NavDropdown.Item key={p['id']} href="#" onClick={e => filterByCateId(e, p['id'])}>{p['name']}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Form inline>
                        <Row>
                            <Col xs="auto">
                                <Form.Control
                                    type="text" value={kw} onChange={e => setkw(e.target.value)}
                                    placeholder="Search"
                                    className=" mr-sm-2"
                                />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Navbar>
        </div>}

        {products && <div>
            <Container>
                <Row>
                    {products.map(p => <Col xs="3">
                        <Card className="p-2">
                            <Card.Img variant="top" src={p.image} />
                            <Card.Text>{p.name}</Card.Text>
                            <Card.Text>{p.price}</Card.Text>
                        </Card>
                    </Col>)}
                </Row>
                <div className="text-center p-2">
                    <Button onClick={loadMore}>Xem thêm</Button>
                </div>
            </Container>
        </div>}
    </>
};

export default Home;