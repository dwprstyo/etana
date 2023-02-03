import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Form = () => {
  return (
    <div className="container-xl mt-5">
      <div className="row mt-5">
        <div className="col d-flex justify-content-start align-items-center title">
          Form Pegawai
        </div>
        <div className="col d-flex justify-content-end align-items-center">
          <Link to={`/`}>
            <Button className="btn btn-secondary">Home</Button>
          </Link>
        </div>
      </div>
      <div className="row mt-5">
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Nama
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Masukan nama"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Tanggal Lahir
            </label>
            <input type="date" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Tanggal Masuk
            </label>
            <input type="date" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Alamat
            </label>
            <input type="text" class="form-control" />
          </div>
          <div className="mb-3 d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
