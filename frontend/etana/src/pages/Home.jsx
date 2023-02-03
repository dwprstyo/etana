import React from "react";
import "../style/home.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Home = () => {
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
        <div className="col">
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
              <tr>
                <td>330402021299001</td>
                <td>Kuat Dwi Prasetiyo</td>
                <td>02-12-1999</td>
                <td>12-08-2018</td>
                <td>Jakarta</td>
                <td className="d-flex gap-2">
                  <Button className="btn-warning w-50 h-25 p-1">edit</Button>
                  <Button className="btn-danger w-50 h-25 p-1">delete</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
