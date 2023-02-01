const router=require('express').Router();

router.get('/',(req,res)=>{
    res.sendStatus(404);
})

router.post('/',(req,res)=>{

})

router.put('/',(req,res)=>{
    res.sendStatus(404);
})

router.delete('/',(req,res)=>{
    res.sendStatus(404);
})
module.exports=router;