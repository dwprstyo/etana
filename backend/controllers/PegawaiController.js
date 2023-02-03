import Pegawai from "../models/PegawaiModel.js";

export const getPegawai = async (req, res) => {
  try {
    const response = await Pegawai.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
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
      res.status(404).json({ msg: "data not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPegawai = async (req, res) => {
  try {
    await Pegawai.create(req.body);
    res.status(201).json({ msg: "Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePegawai = async (req, res) => {
  try {
    await Pegawai.update(req.body, {
      where: {
        nik: req.params.nik,
      },
    });
    res.status(200).json({ msg: "Updated" });
  } catch (error) {
    console.log(error.message);
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
    console.log(error.message);
  }
};
