import db from "../config/Database.js";
import Pegawai from "../models/PegawaiModel.js";

export const getAllFilterU1 = () => {
  return db.query(
    `SELECT *, DATEDIFF(NOW(), tanggal_masuk) AS years_employed
  FROM pegawai
  WHERE DATEDIFF(NOW(), tanggal_masuk) <= 1 * 365 and deletedAt IS NULL`,
    {
      type: db.QueryTypes.SELECT,
    }
  );
};

export const getAllFilterU3 = () => {
  return db.query(
    `SELECT *, DATEDIFF(NOW(), tanggal_masuk) AS years_employed
  FROM pegawai
  WHERE DATEDIFF(NOW(), tanggal_masuk) >= 1 * 365 and DATEDIFF(NOW(), tanggal_masuk) <= 3 * 365 and deletedAt IS NULL`,
    {
      type: db.QueryTypes.SELECT,
    }
  );
};

export const getAllFilterUp3 = () => {
  return db.query(
    `SELECT *, DATEDIFF(NOW(), tanggal_masuk) AS years_employed
  FROM pegawai
  WHERE DATEDIFF(NOW(), tanggal_masuk) >= 3 * 365 and deletedAt IS NULL`,
    {
      type: db.QueryTypes.SELECT,
    }
  );
};

export const checkDeletedAt = (id) => {
  return db.query(
    `SELECT * FROM pegawai WHERE nik = ${id} and deletedAt IS NOT NULL`,
    {
      type: db.QueryTypes.SELECT,
    }
  );
};

export const updateCreate = (props) => {
  return db.query(
    `UPDATE pegawai SET nama = :nama, tanggal_lahir = :tanggal_lahir, tanggal_masuk = :tanggal_masuk, alamat = :alamat, deletedAt = NULL WHERE nik = :nik`,
    {
      replacements: {
        nik: props.nik,
        nama: props.nama,
        tanggal_lahir: props.tanggal_lahir,
        tanggal_masuk: props.tanggal_masuk,
        alamat: props.alamat,
      },
    }
  );
};
