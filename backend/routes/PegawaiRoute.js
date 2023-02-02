import express from "express";
import { getPegawai, getPegawaiByNik, createPegawai, updatePegawai, deletePegawai } from "../controllers/PegawaiController.js";

const router = express.Router();

router.get("/pegawai", getPegawai);
router.get("/pegawai/:nik", getPegawaiByNik);
router.post("/pegawai", createPegawai);
router.put("/pegawai/:nik", updatePegawai);
router.delete("/pegawai/:nik", deletePegawai);

export default router;