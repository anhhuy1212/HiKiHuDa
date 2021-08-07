const datcho = require('../models/datcho');
const cumrap = require('../models/cumrap');
const phim = require('../models/phim');
const suatchieu = require('../models/suatchieu');
const rap = require('../models/rap');
var multer = require('multer')
let alert = require('alert');
class AdminController {
    async getadminPage(req, res, next) {
        const listrap = await rap.lrap();
        const listphim = await phim.allphim();
        const listsc = await suatchieu.allsuatchieu();
        res.render('../views/admin/adminpage', { listsc, listrap, listphim });
    }
    async Addsuatchieu(req, res, next) {
        console.log(req.body.rap, req.body.phim)
        const { StartTime, EndTime, DayShow, maphong, rap, phim } = req.body;
        const addsuatchieu = await suatchieu.create({ batdau: StartTime, ketthuc: EndTime, ngaychieu: DayShow, maphong: maphong, rapId: rap, phimId: phim });
        if (addsuatchieu) {
            req.flash('success', 'successfully added')
            alert(req.flash('success'))
            res.redirect('/admin')
        } else {
            req.flash('error', ' failed to add')
            alert(req.flash('error'))
            res.redirect('/admin')
        }
    }
    async deletesuatchieu(req, res, next) {
        const { id } = req.params;
        await datcho.updatesc(id);
        await suatchieu.destroy({
            where: {
                id: id
            }
        });
        const listsc = await suatchieu.allsuatchieu();
        res.redirect('/admin');
        next();
    }
    async deletecumrap(req, res, next) {
        const { id } = req.params;
        await rap.updaterap(id);
        await cumrap.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/1');
        next();
    }
    async deleterap(req, res, next) {
        const { id } = req.params;
        await suatchieu.destroy({
            where: {
                rapId: id
            }
        });
        await rap.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/2');
        next();
    }
    async deletephim(req, res, next) {
        const { id } = req.params;
        await suatchieu.destroy({
            where: {
                phimId: id
            }
        });
        await phim.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/3');
        next();
    }
    async getcumrapPage(req, res, next) {
        const listcum = await cumrap.listcumrap();
        res.render('../views/admin/cumrap', { listcum });
    }
    async Addcumrap(req, res, next) {
        const tencumrap = req.body.txtTen;
        const diachicumrap = req.body.txtGia;

        const addcumrap = await cumrap.create({ ten: tencumrap, diachi: diachicumrap });
        if (addcumrap) {
            req.flash('success', 'successfully added')
            alert(req.flash('success'))
            res.redirect('/1')
        } else {
            req.flash('error', ' failed to add')
            alert(req.flash('error'))
            res.redirect('/1')
        }

    }
    async getrapPage(req, res, next) {

        const listrap = await rap.lrap();
        res.render('../views/admin/rap', { listrap });
    }
    async Addrap(req, res, next) {
        const { TenRap, DiaChi, LoaiRap, chieungang, chieudoc, cumrapid } = req.body;
        var path = null;
        if (req.file) {
            path = req.file.path

        }

        const addrap = await rap.create({ ten: TenRap, loairap: LoaiRap, chieungang: chieungang, chieudoc: chieudoc, map: DiaChi, cumrapId: cumrapid, image: path });
        if (addrap) {
            req.flash('success', 'successfully added')
            alert(req.flash('success'))
            res.redirect('/2')
        } else {
            req.flash('error', ' failed to add')
            alert(req.flash('error'))
            res.redirect('/2')
        }

    }
    async getphimPage(req, res, next) {

        const listphim = await phim.allphim();
        res.render('../views/admin/phim', { listphim });
    }
    async AddPhim(req, res, next) {
        console.log(req.body);
        if (req.files) {
            var path1 = req.files[0].path;
            var path2 = req.files[1].path;
            var path3 = req.files[2].path;


        }
        const { tenphim, loaiphim, chitiet, thoiluong, ngaycongchieu, category, trailer, txtGia } = req.body;
        const addPhim = await phim.create({ ten: tenphim, chitiet: chitiet, thoiluong: thoiluong, theloai: loaiphim, ngaycongchieu: ngaycongchieu, category: category, trailer: trailer, poster: path1, image1: path2, image2: path3 });
        if (addPhim) {
            req.flash('success', 'successfully added')
            alert(req.flash('success'))
            res.redirect('/3')
        } else {
            req.flash('error', ' failed to add')
            alert(req.flash('error'))
            res.redirect('/3')
        }

    }
    async getdoangthuPage(req, res, next) {
        // lấy ra tất cả các cụm rạp
        const listcinema = await cumrap.listcumrap();
        console.log(listcinema)
        var listci = [];
        var rap = [];
        listcinema.forEach(function(value, index) {
            listci.push(value.id);
            rap.push(value.ten);
        })

        const from = new Date()
        const to = new Date("2021-07-01");
        // danh sách doanh thu
        const doanhthu = await datcho.doanhthurap(to, from);

      
        var listTongTien = [];
        if(doanhthu != null){
            for (var i = 0; i < listci.length; i++) {
                var tempTien = 0;
                for (var j = 0; j < doanhthu.length; j++) {
                    if(doanhthu[j].suatchieu != null){
                        if (doanhthu[j].suatchieu.rap.cumrapId == listci[i]) {
                            tempTien += doanhthu[j].tongtien;
                        }
                    }
                }
                listTongTien.push(tempTien);
            }
        }
        else{
            listTongTien = [];
        }
       


        const data = listTongTien;

        res.render('../views/admin/doanhthu', { rap, data, to, from })
    }
    async postdoangthuPage(req, res, next) {
        // lấy ra tất cả các cụm rạp
        const listcinema = await cumrap.listcumrap();
        console.log(listcinema);
        var listci = [];
        var listname = [];
        listcinema.forEach(function(value, index) {
            listci.push(value.id);
            listname.push(value.ten);
        })

        const to = req.body.txtNgayBatDau;
        const from = req.body.txtNgayKetThuc;
        console.log(`dfffffffffffffffffffffffffffff`)
        console.log(to);
        console.log(from);
        console.log(`dfffffffffffffffffffffffffffff`)
        let d = new Date(from);
        // danh sách doanh thu
        const doanhthu = await datcho.doanhthurap(to, d.setTime(d.getTime() + 1000 * 60 * 60 * 24));
        var listTongTien = [];
        for (var i = 0; i < listci.length; i++) {
            var tempTien = 0;
            for (var j = 0; j < doanhthu.length; j++) {
                if(doanhthu[j].suatchieu!=null){
                    if (doanhthu[j].suatchieu.rap.cumrapId == listci[i]) {
                        tempTien += doanhthu[j].tongtien;
                    }
                }
            }
            listTongTien.push(tempTien);
        }
        console.log(listTongTien);

        const rap = listname;
        const data = listTongTien;
        res.render('../views/admin/doanhthu', { rap, data, to, from })
    }
    async gettaikhoanPage(req, res, next) {


        res.render('../views/admin/taikhoan')
    }
    async getsuatchieu(req, res, next) {


        res.render('../views/admin/suatchieu')
    }

    async getdoangthuphim(req, res, next) {
        const from = new Date()
        const to = new Date("2021-07-12");
        // lấy ra tất cả các cụm rạp
        const listcinema = await phim.listphim(to, from);
        var listci = [];
        var listname = [];
        listcinema.forEach(function(value, index) {
            listci.push(value.id);
            listname.push(value.ten);
        })


        // danh sách doanh thu
        const doanhthu = await datcho.doanhthuphim(to, from);
        var listTongTien = [];
        for (var i = 0; i < listci.length; i++) {
            var tempTien = 0;
            for (var j = 0; j < doanhthu.length; j++) {
                if(doanhthu[j].suatchieu!=null){
                    if (doanhthu[j].suatchieu.rap.cumrapId == listci[i]) {
                        tempTien += doanhthu[j].tongtien;
                    }
                }
            }
            listTongTien.push(tempTien);
        }
        console.log(listTongTien);

        const rap = listname;
        const data = listTongTien;

        res.render('../views/admin/doanhthuphim', { rap, data, to, from })
    }

    async postdoangthuphim(req, res, next) {
        const to = req.body.txtNgayBatDau;
        const from = req.body.txtNgayKetThuc;
        console.log(`dfffffffffffffffffffffffffffff`)
        console.log(to);
        console.log(from);
        console.log(`dfffffffffffffffffffffffffffff`)
            // lấy ra tất cả các cụm rạp
        const listcinema = await phim.listphim(to, from);
        var listci = [];
        var listname = [];
        listcinema.forEach(function(value, index) {
            listci.push(value.id);
            listname.push(value.ten);
        })


        // danh sách doanh thu
        const doanhthu = await datcho.doanhthuphim(to, from);
        var listTongTien = [];
        for (var i = 0; i < listci.length; i++) {
            var tempTien = 0;
            for (var j = 0; j < doanhthu.length; j++) {
                if(doanhthu[j].suatchieu != null){
                    if (doanhthu[j].suatchieu.phim.id == listci[i]) {
                        tempTien += doanhthu[j].tongtien;
                    }
                }
            }
            listTongTien.push(tempTien);
        }
        console.log(listTongTien);

        const rap = listname;
        const data = listTongTien;

        res.render('../views/admin/doanhthuphim', { rap, data, to, from })
    }

}
var storageRap = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img/rap');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadRap = multer({
    storage: storageRap,
    onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting ...')
    },
});
var storagePhim = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img/phims');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadPhim = multer({
    storage: storagePhim,
    onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting ...')
    },
});
module.exports.uploadFileRap = uploadRap.single('fHinhRap')
module.exports.uploadFilePhim = uploadPhim.array('fHinhPhim', 3)

module.exports.AdminController = AdminController