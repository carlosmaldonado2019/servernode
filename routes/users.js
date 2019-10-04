var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const dbConfig = require('../dbConfig');
var connection = mysql.createConnection(dbConfig);

router.get('/', (req, res, next) =>{
  /* GET users listing. */
  connection.query('SELECT a.*\n' +
      '\tfrom alumnos a, periodos b\n' +
      '    where a.periodoAlumno = b.periodo\n' +
      '    and b.activo = 1 ', (err, rows, fields) => {
    if (err) throw err;
     res.json(rows)
  });
});

router.get('/getAlumnosPeriodo/:id',(req,res) =>{
  var id = req.params.id;
  connection.query('SELECT * from alumnos where periodoAlumno = '+ id +'', (err, rows, fields) => {
    if (err) throw err;
      if(rows.length > 0) {
          res.json(rows);
      }
  });
});


module.exports = router;
