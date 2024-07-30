var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/employees', async function(req, res, next) {
  const URL = 'http://localhost:4444/rest/empleados/findAll/json';
  const response = await axios.get(URL);
  res.render('empleados', { title: 'Empleados', fotos: response.data });
});

router.get('/employees/add', function(req, res, next) {
  res.render('empleados_adicion', { title: 'Agregar empleados' });
});

router.post('/employees/save', async function(req, res, next) {
  let { user, name, surname, profile } = req.body;
  const URL = 'http://localhost:4444/rest/fotos/save';
  let data = {
    usuario: user,
    nombre: name,
    apellido: surname,
    perfil: profile
  };
  try {
    const response = await axios.post(URL, data);
    if (response.status === 200 && response.statusText === 'OK') {
      res.redirect('/employees');
    } else {
      console.error('Failed to save employee:', response.status, response.statusText);
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error during saving employee:', error);
    res.redirect('/');
  }
});

router.get('/delete/:id', async function(req, res, next) {
  const employeeId = req.params.id;
  const URL = `http://localhost:4444/rest/empleados/delete/${employeeId}`;
  try {
    const response = await axios.delete(URL);
    if (response.status === 200 && response.statusText === 'OK') {
      res.redirect('/employees');
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.redirect('/');
  }
});

module.exports = router;
