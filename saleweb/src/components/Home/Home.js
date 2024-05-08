 import { useEffect, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import Apis, { endpoints } from "../../configs/Apis";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useSearchParams } from "react-router-dom";


const Home = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [kw, setkw] = useState('');
    const [page, setPage] = useState(1);
    const [param, ] = useSearchParams();
    const nav = useNavigate();

    const loadProduct = async () => {
        try {
            let url = `${endpoints['products']}?&page=${page}`;

            const cateId = param.get('cateId');
            console.log(cateId)

            if (cateId)
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
  
    useEffect(() => {
        loadProduct();
    }, [kw, page]);

    return <>
        {isLoading && <Spinner animation="grow" variant="success" />}
        {products && <div>
            <Container>
                <Row>
                    {products.map(p => <Col xs="3">
                        <Card className="p-2" onClick={e => nav(`/products/${p.id}`)}>
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