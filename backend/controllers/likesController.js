import express from "express";
import db from "../db/dbconnection.js";

const router = express.Router();

router.get("/", (req, res) => {
    const query = "SELECT * FROM likes;";
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Dar like a un plan
router.post("/:plan_id/:user_id", (req, res) => {
    const { plan_id, user_id } = req.params;
    const query = `INSERT INTO likes (usuario_id, plan_id) VALUES (${user_id}, ${plan_id});`;
  
    db.query(query, (err, data) => {
      if (err){ return res.json(err)};
      data.message = "true";
      return res.json(data);
    });
  });

// Eliminar like de un plan por parte de un usuario
router.delete("/unlike/:plan_id/:user_id", (req, res) => {
  const { plan_id, user_id } = req.params;
  const query = `DELETE FROM likes WHERE usuario_id = ${user_id} AND plan_id = ${plan_id};`;

  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }else{
      data.message = "true";
      return res.json(data);
    }

  });
});

// Verificar si un usuario ha dado like a un plan
router.get("/:plan_id/:user_id", (req, res) => {
  const { plan_id, user_id } = req.params;
  const query = `SELECT COUNT(*) AS count FROM likes WHERE usuario_id = ${user_id} AND plan_id = ${plan_id};`;

  db.query(query, (err, data) => {
    if (err) return res.json(err);

    const hasLiked = data[0].count > 0;

    return res.json({ hasLiked });
  });
});

router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;
  const query = `SELECT plan_id FROM LIKES where usuario_id = ${user_id};`;

  db.query(query, (err, data) => {

  if (err) {
      return res.json(err);
    }else{
      return res.json(data);
    }
  });
});

export default router;