import React, { useEffect, useState } from "react";
import "../style/home.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { DropdownButton, Dropdown, InputGroup, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Home = () => {
  const baseUrl = useSelector((state) => state.base_url);
  const navigate = useNavigate();
  const [dataPegawai, setDataPegawai] = useState([]);
  const [title, setTitle] = useState("Filter");
  const [search, setSearh] = useState("");
  const [filterValue, setFilterValue] = useState(0);

  const handleSelect = (eventKey, event) => {
    setTitle(event.target.innerText);
    setFilterValue(eventKey)
  };

  const handleFormSearch = (event) => {
    setSearh(event.target.value)
  }

  const handleSearch = () => {
    getData()
  }

  const getData = () => {
    axios
      .get(`${baseUrl}/pegawai?filter=${filterValue}&search=${search}`)
      .then((res) => {
        setDataPegawai(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delData = (nik) => {
    axios
      .delete(`${baseUrl}/pegawai/${nik}`)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editData = (nik) => {
    navigate(`/edit/${nik}`);
  };

  useEffect(() => {
    getData(0);
  }, []);

  return (
    <div className="container-xl mt-5">
      <div className="row">
        <div className="col d-flex justify-content-start align-items-center title">
          Daftar Pegawai
        </div>
        <div className="col d-flex justify-content-end align-items-center">
          <Link to={`/create`}>
            <Button className="btn">Create</Button>
          </Link>
        </div>
      </div>
      <div className="row mt-5">
        <div className="row m-0 p-0">
          <div className="col d-flex justify-content-end gap-2">
            <Form className="search-expanded">
              <InputGroup>
                <Form.Control type="text" placeholder="Search" onChange={handleFormSearch}/>
              </InputGroup>
            </Form>
            <DropdownButton
              title={title}
              variant="light"
              id="dropdown-basic-button"
              className="btn-light btn-sm"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="1">Dibawah 1 tahun</Dropdown.Item>
              <Dropdown.Item eventKey="2">Diantara 1-3 tahun</Dropdown.Item>
              <Dropdown.Item eventKey="3">Diatas 3 tahun</Dropdown.Item>
              <Dropdown.Item eventKey="0">Filter</Dropdown.Item>
            </DropdownButton>
            <Button variant="light" className="search-btn">
              <BsSearch onClick={handleSearch}/>
            </Button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">NIK</th>
                <th scope="col">Nama</th>
                <th scope="col">Tanggal Lahir</th>
                <th scope="col">Tanggal Masuk</th>
                <th scope="col">Alamat</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataPegawai.map((item) => {
                return (
                  <tr key={item.nik}>
                    <td>{item.nik}</td>
                    <td>{item.nama}</td>
                    <td>{item.tanggal_lahir}</td>
                    <td>{item.tanggal_masuk}</td>
                    <td>{item.alamat}</td>
                    <td>
                      <Button
                        className="btn-warning btn-sm h-25 p-1 m-1 btn-custom"
                        onClick={() => editData(item.nik)}
                      >
                        edit
                      </Button>
                      <Button
                        className="btn-danger btn-sm h-25 p-1 m-1 btn-custom"
                        onClick={() => delData(item.nik)}
                      >
                        delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
