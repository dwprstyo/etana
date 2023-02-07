import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Form = () => {
  const baseUrl = useSelector((state) => state.base_url);
  const navigate = useNavigate();
  const param = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  const [form, setForm] = useState({
    nik: "",
    nama: "",
    tanggal_lahir: "",
    tanggal_masuk: "",
    alamat: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const getDataByNik = () => {
    axios
      .get(`${baseUrl}/pegawai/${param.id}`)
      .then((res) => {
        setIsLoading(false)
        setForm(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postForm = () => {
    axios
      .post(`${baseUrl}/pegawai`, form)
      .then((res) => {
        setIsLoading(false)
        navigate("/");
      })
      .catch((err) => {
        let error = err.response.request.status
        if (error = 409) {
          alert("NIK Sudah Terdaftar")
        }
      });
  };

  const putForm = () => {
    axios
      .put(`${baseUrl}/pegawai/${param.id}`, form)
      .then((res) => {
        setIsLoading(false)
        navigate("/");
      })
      .catch((err) => {
        let error = err.response.request.status
        if (error = 409) {
          alert("NIK Sudah Terdaftar")
        }
      });
  };

  const handleForm = (event) => {
    let newForm = { ...form };
    newForm[event.target.name] = event.target.value;
    setForm(newForm);
  };

  const handleSubmit = () => {
    if (
      !form.nama ||
      !form.nik ||
      !form.tanggal_lahir ||
      !form.tanggal_masuk ||
      !form.alamat
    ) {
      alert("semua form harus diisi!");
    } else {
      if (isUpdate == true) {
        setIsLoading(true)
        putForm();
      } else {
        setIsLoading(true)
        postForm();
      }
    }
  };

  useEffect(() => {
    if (param.id === undefined) {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
      setIsLoading(true)
      getDataByNik();
    }
  }, []);

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
      {isLoading ? (
          <div className="d-flex justify-content-center pt-5">
            <ClipLoader color={"#b4b4b4"} loading={isLoading} size={50} />
          </div>
        ) : (
        <form>
          <div className="mb-3">
            <label htmlFor="nik" className="form-label">
              NIK
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Masukan NIK"
              onChange={handleForm}
              name="nik"
              value={form.nik}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nama" className="form-label">
              Nama
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukan nama"
              onChange={handleForm}
              name="nama"
              value={form.nama}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tanggal_lahir" className="form-label">
              Tanggal Lahir
            </label>
            <input
              type="date"
              className="form-control"
              name="tanggal_lahir"
              onChange={handleForm}
              value={form.tanggal_lahir}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tanggal_masuk" className="form-label">
              Tanggal Masuk
            </label>
            <input
              type="date"
              className="form-control"
              name="tanggal_masuk"
              onChange={handleForm}
              value={form.tanggal_masuk}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="alamat" className="form-label">
              Alamat
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukan alamat"
              name="alamat"
              onChange={handleForm}
              value={form.alamat}
            />
          </div>
          <div className="mb-3 d-flex justify-content-end">
            <Button className="btn btn-primary" onClick={handleSubmit}>
              { isUpdate ? <span>update</span> : <span>submit</span> }
            </Button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default Form;
