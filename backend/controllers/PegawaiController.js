import Pegawai from "../models/PegawaiModel.js";
import { checkDeletedAt, getAllFilterU1, getAllFilterU3, getAllFilterUp3, updateCreate } from "../querries/PegawaiQuerry.js";

export const getPegawai = async (req, res) => {
  try {
    const filter = req.query.filter;
    if (filter > 0) {
      if (filter == 1) {        
        const response = await getAllFilterU1(filter);
        res.status(200).json(response);
      }
      if (filter == 2) {        
        const response = await getAllFilterU3(filter);
        res.status(200).json(response);
      }
      if (filter == 3) {        
        const response = await getAllFilterUp3(filter);
        res.status(200).json(response);
      }
    } else {
      const response = await Pegawai.findAll();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error,
    });
  }
};

export const getPegawaiByNik = async (req, res) => {
  try {
    const response = await Pegawai.findOne({
      where: {
        nik: req.params.nik,
      },
    });
    if (response === null) {
      res.status(404).json({ msg: "data tidak ditemukan" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error,
    });
  }
};

export const createPegawai = async (req, res) => {
  try {
    const nik = req.body.nik;
    const check = await Pegawai.findOne({
      where: {
        nik: req.body.nik,
      },
    });
    const checkDelAt = await checkDeletedAt(nik);
    if (check != null) {
      res.status(409).json({ msg: "NIK sudah terdaftar" });
    } else if (checkDelAt != 0) {
      await updateCreate(req.body);
      res.status(201).json({ msg: "Berhasil Menambahkan" });
    } else {
      await Pegawai.create(req.body);
      res.status(201).json({ msg: "Berhasil Menambahkan" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error,
    });
  }
};

export const updatePegawai = async (req, res) => {
  try {
    const nikBody = req.body.nik;
    const nikParam = req.params.nik;
    const checkDelAt = await checkDeletedAt(nikBody);
    const check = await Pegawai.findOne({
      where: {
        nik: req.body.nik,
      },
    });
    if (nikParam == nikBody) {
      await Pegawai.update(req.body, {
        where: {
          nik: req.params.nik,
        },
      });
      res.status(200).json({ msg: "Berhasil diubah" });
    }else{
      if (check != null) {
        res.status(409).json({ msg: "NIK sudah terdaftar" });
      }else if(checkDelAt != 0) {
        await updateCreate(req.body);
        await Pegawai.destroy({
          where: {
            nik: req.params.nik,
          },
        });
        res.status(201).json({ msg: "Berhasil diubah" });
      }else{
        await Pegawai.update(req.body, {
          where: {
            nik: req.params.nik,
          },
        });
        res.status(201).json({ msg: "Berhasil diubah" });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error,
    });
  }
};

export const deletePegawai = async (req, res) => {
  try {
    await Pegawai.destroy({
      where: {
        nik: req.params.nik,
      },
    });
    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error,
    });
  }
};
