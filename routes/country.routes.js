const router=require('express').Router();
const countryController=require('../controllers/country.controller');

router.get('/',countryController.getAll);

router.get('/:id',countryController.getOne);

router.post('/',countryController.addCountry);

router.put('/:id',countryController.updateCountry);

router.delete('/:id',countryController.deleteCountry);

module.exports=router;