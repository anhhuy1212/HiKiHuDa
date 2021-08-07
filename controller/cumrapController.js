const phim = require('../models/phim');
const suatchieu = require('../models/suatchieu');
const rap = require('../models/rap');
const cumrap = require('../models/cumrap');
const datcho = require('../models/datcho');
const ve = require('../models/ve');
const { v4: uuidv4 } = require('uuid');
var mailer = require('../lib/nodemailer');
class cumrapController {
    async getcumrapPage(req, res) {
        const phim1 = await phim.allphim();
        res.render('../views/cumrap/rap', { phim1 });
    }
    async getphim(req, res) {
        let phim1 = await phim.allphim();
        const tenphim = req.body.heroSearchInput;
        console.log(tenphim);
        const value = req.body.currentPatient;
        if (value == 'button1') {
            phim1 = await phim.timkiemten(tenphim);
        } else if (value == 'button2') {
            phim1 = await phim.dangchieu();
        } else if (value == 'button3') {
            phim1 = await phim.sapchieu();
        }

        res.render('../views/cumrap/rap', { phim1 });
    }
    async getdetailPage(req, res, next) {

        const { id } = req.params;
        const phimct = await phim.chitiet(id);

     

        var listcumrap = [];
        var listname =[];
        var listidcum = await cumrap.listcumrap();
        listidcum.forEach(function(value, index) {    
            listcumrap.push(value.id);
            listname.push(value.ten);
        });
        console.log(listcumrap)
        var a = [];
        // cumrap thứ 1
        var valuecum = [];
        var valuedate = [];
        let daysRequired = 5;
        var date = new Date();
        date.setDate(date.getDate()-1);
        for (let j = 0; j < daysRequired; j++) {
            date.setDate(date.getDate()+1);
            var ngay='2021-'+(date.getMonth()+1)+"-"+date.getDate();
            valuecum = [];
            for( var i= 0 ; i < listcumrap.length ;i++){
                const a = await phim.getPhim(id,ngay,listcumrap[i])
                if(a==null){
                    valuecum = []
                }
                else{
                    valuecum.push(a.suatchieus);// chỗ này sai nen z á
                }
               
            }
            valuedate.push(valuecum);
            console.log(valuedate);
        }
        res.render('../views/cumrap/chitiet',{phimct,valuedate,listname})

    }
    async getsuatchieu(req, res, next) {
        res.render('../views/cumrap/pagesuatchieu')
    }
    async getnotice(req, res, next) {
        res.render('../views/cumrap/notice')
    }
    async getpagesuatchieu(req, res, next) {
        res.render('../views/cumrap/pagesuatchieu')
    }
    async getseat(req, res, next) {
        /*  console.log(req.params.id);
         console.log(req.params.idcinema);
         console.log(req.params.date);
         console.log(req.params.time); */
        const { id } = req.params;
        const ngaychieu = req.params.date;
        const giochieu = req.params.time;
        const phimct = await phim.chitiet(id);
        const listseat = await ve.getsuatchieu(req.params.schieu);
        const seat = [];
        listseat.forEach(function(value, index) {
            seat.push(value.maghe);
        });
        console.log(seat);
        const idrap=req.params.idcinema;
        console.log(idrap);
        const tenrap = await rap.timrap(idrap)
        var rapname=" ";
        tenrap.forEach(function(value, index) {
           
            rapname= value.ten;
        });
        const maphong = req.params.phong;
        res.render('../views/ghe/chonghe', { phimct, ngaychieu, giochieu, seat,rapname ,maphong});

    }
    async themdatcho(req, res, next) {
        // ngày hiện tại
        if (typeof(req.user) != "undefined") {
            var datetime = new Date();
            var dateString = new Date(
                datetime.getTime() - datetime.getTimezoneOffset() * 60000
            );
            var curr_time = dateString.toISOString().replace("T", " ").substr(0, 19);
            /*  console.log(curr_time); */

            console.log(req.body.total);
            var iddatcho = uuidv4();
            await datcho.adddatcho(iddatcho, req.user.id, req.params.schieu, curr_time, req.body.myText);
            /// insert cái vé
            await ve.findAll();
            var mang = req.body.demo;

            console.log(`heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`);
            let globArr = [];
            let answ = mang.split(',');
            answ.forEach(function(obj) {
                globArr.push(obj);
            });
            var datve = null;
            for (var i = 0; i < globArr.length; i++) {
                datve = await ve.addticket(uuidv4(), iddatcho, globArr[i], 49000);
            }
            if (datve) {
                var arrayItems = "";
                var n;
                for (n in globArr) {
                    arrayItems += globArr[n] + ',';
                }
                const suatchieuphim = await suatchieu.findByPk(req.params.schieu)
                const infophim = await phim.findByPk(suatchieuphim.phimId)
                console.log(suatchieuphim, req.body.myText, globArr, req.params.date, infophim.ten)
                mailer({
                    from: '"Hikihuda" <Hikihuda@gmail.com>',
                    to: req.user.email,
                    subject: 'Successfully purchased ticket',
                    text: 'Hello ' + req.user.hoten + ',\n\n' + 'ticket detail' + '\n' + 'name: ' + infophim.ten + '\n' + 'screen: 4' + '\n' + 'seat: ' + `${arrayItems}` + '\n' + 'showtime: ' + suatchieuphim.batdau + '\n' + ' price: ' + req.body.myText + 'đ' + '\n\nThank You!\n'

                });
            }
            res.redirect('/thongbao');
        } else {
            res.redirect('/RegAndLogin');
        }


    }
}
module.exports = cumrapController