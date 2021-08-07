const express = require("express");
const router = express.Router();
const cumrap = require('../models/cumrap');
const rap = require('../models/rap');
const suatchieu = require('../models/suatchieu');
router.use(function(req, res, next) {
    res.locals.title = 'hệ thống rạp';
    next();
});
router.get('/', async function(req, res) {
    const listcinema = await cumrap.listcumrap();
    var listci = [];
    listcinema.forEach(function(value, index){ 
        listci.push(value.id);
    })
    var mang =[];
    for(var i=0;i<listci.length ;i++){
        mang.push(await rap.lstrap(listci[i]));
    }
    res.render('homepage/hethongrap', {listcinema,mang})
});
router.get('/rapchitiet/:idrap', async function(req, res) {
    const{ id} = req.params.idrap;
        var mangphim=[];
       /*  console.log(await suatchieu.getallsuatchieu(2)); */
      /*  lay ra tất cả id phim */
        /* const listsuatchieu = await suatchieu.getallsuatchieu(2);
        listsuatchieu.forEach(function(value, index){ 
           
                if(mangphim.includes(value.phimId)== false){
                    mangphim.push(value.phimId)
                }
            
        });
        var mangdetailphim=[];
        for(var i=0 ; i< mangphim.length;i++){
            mangdetailphim.push(await suatchieu.getallsuatchieutheophim(2,mangphim[i]));
        }
        
     

        mangdetailphim[0].forEach(function(item, index){ 
            console.log(item.phim.ten)
            console.log(item.batdau)
        }); */
        const marap = req.params.idrap;
        let daysRequired = 5;
        var date = new Date();
        date.setDate(date.getDate()-1);
        var valuedate = [];
     
        for(let i = 0; i <= daysRequired; i++) {
            date.setDate(date.getDate()+1);
            var ngay='2021-'+(date.getMonth()+1)+"-"+date.getDate();
            const a = await suatchieu.getallsuatchieu(marap,ngay);
            console.log(a);
            valuedate.push(a); 
        }
    res.render('homepage/suatchieu',{valuedate})
});

module.exports = router;