import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { data } from "./data.js";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [products, setProduct] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch("https://dummyjson.com/products");
      const result = await response.json();
      setProduct(result?.products);
    }
    getProducts();
  }, []);

  return (
    <>
      <div>
        <Container>
          <h1 className="text-center mt-4">Contact Keeper</h1>
          <Form>
            <InputGroup className="my-3">
              {/* onChange for search */}
              <Form.Control
                onChange={(event) => setSearch(event.target.value)}
              />
            </InputGroup>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.title.toLowerCase().includes(search);
                })
                .map((item) => (
                  <tr key={item.id}>
                    <th>{item.title}</th>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
}

export default App;
