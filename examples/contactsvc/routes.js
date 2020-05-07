var contactdao = require('./contactdao');
var imagePath = "public/photos/";
var multer = require('multer');
var sleep = require('sleep-promise');

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};

var getPhotoUrl = function(req) {
    var photoUrl;
    if (req.get('host').indexOf('heroku') > -1)
       photoUrl = 'https://' + req.get('host') + "/photos/";
    else
       photoUrl = req.protocol + '://' + req.get('host') + "/photos/";
    
    return photoUrl;
}

var storage = multer.diskStorage({
    destination : function(req, file, callback) {
        console.log("##DEST");
        callback(null, imagePath);
    }, 
    filename : function(req,file,callback) {
        console.log(file);
        var f = file.originalname.split('.')[0];
        var ext = file.originalname.split('.')[1];
         var newFileName = req.params.no + '_' + (new Date()).toTimeString().hashCode()  + '.' + ext;
        req.newFileName = newFileName;
        console.log(newFileName);
        callback(null, newFileName);
    }
})
var upload = multer({ storage:storage }).single('photo');


module.exports = function(app) { 
    app.get('/ip', function(req, res) {
        console.log("### GET /ip");
        var ip_info = { 
            ipaddress : req.clientIp
        };
        res.jsonp(ip_info);
    })

    app.get('/', function(req, res) {
        console.log("### GET /");
        res.render('index', {
             title: '연락처서비스 v2.0',
             subtitle : '(node.js + Express + sqlite3)'
        })
    });

    app.post('/contacts/:no/photo', function (req, res, next) {
        console.log("### POST /contacts/:no/photo");
        upload(req,res,function(err) {
            if (err) {
                return res.json({ message:"파일 업로드 실패!" });
            } else {
                contactdao.updatePhoto(req.params.no, req.newFileName)
                    .then(function(data) {
                        res.json(data);
                    })
                    .catch(function(err) {
                        res.json(err);
                    });
            }
        })
    });


    app.get('/contacts_long', function(req, res) {
        console.log("### GET /contacts_long");
        sleep(1000).then(()=> {
            var photoUrl = getPhotoUrl(req);
            pageno = parseInt(req.query.pageno);
            pagesize = parseInt(req.query.pagesize);
            if (isNaN(pageno)) pageno=0;
            if (isNaN(pagesize)) pagesize=5;
            if (pageno==0)  pagesize = 0;
            contactdao.getContactList(photoUrl, pageno, pagesize)
                .then(function(data) {
                    var contactlist = { 
                        pageno: pageno,
                        pagesize : pagesize,
                        totalcount : data[1],
                        contacts : data[0]
                    };
                    res.jsonp(contactlist);
                })
                .catch(function(err) {
                        console.log(err);
                });
        })
    });

    app.get('/contacts', function (req, res) {
        console.log("### GET /contacts");
        var photoUrl = getPhotoUrl(req);
        pageno = parseInt(req.query.pageno);
        pagesize = parseInt(req.query.pagesize);
        if (isNaN(pageno)) pageno=0;
        if (isNaN(pagesize)) pagesize=5;
        if (pageno==0)  pagesize = 0;
        contactdao.getContactList(photoUrl, pageno, pagesize)
            .then(function(data) {
                var contactlist = { 
                    pageno: pageno,
                    pagesize : pagesize,
                    totalcount : data[1],
                    contacts : data[0]
                };
                res.jsonp(contactlist);
            })
            .catch(function(err) {
                    console.log(err);
            });
    });

    app.get('/contacts/:no', function(req,res) {
        console.log("### GET /contacts/:no");
        var photoUrl = getPhotoUrl(req);
        var no = req.params.no;
        contactdao.getContact(photoUrl, no)
            .then(function(data) {
                res.jsonp(data);
            })
            .catch(function(err) {
                res.jsonp(err);
            });
    });

    app.get('/contacts/search/:name', function(req,res) {
        console.log("### GET /contacts/search/:name")
        var photoUrl = getPhotoUrl(req);
        var name = req.params.name;
        contactdao.searchContact(photoUrl, name)
            .then(function(data) {
                res.jsonp(data);
            })
            .catch(function(err) {
                res.jsonp(err);
            });
    });

    app.get('/contacts_long/search/:name', function(req,res) {
        console.log("### GET /contacts_long/search/:name");
        sleep(1000).then(()=>{
            var photoUrl = getPhotoUrl(req);
            var name = req.params.name;
            contactdao.searchContact(photoUrl, name)
                .then(function(data) {
                    res.jsonp(data);
                })
                .catch(function(err) {
                    res.jsonp(err);
                });
        })
    });

    app.post('/contacts', function(req,res) {
        console.log("### POST /contacts");
        var name = req.body.name;
        var tel = req.body.tel;
        var address = req.body.address;
        console.log("##" + name);

        contactdao.insertContact(name, tel, address)
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    app.put('/contacts/:no', function(req,res) {
        console.log("### PUT /contacts/:no");
        var no = req.params.no;
        var name = req.body.name;
        var tel = req.body.tel;
        var address = req.body.address;

        contactdao.updateContact(no, name, tel, address)
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    app.delete('/contacts/:no', function(req,res) {
        console.log("### DELETE /contacts/:no");
        var no = req.params.no
        contactdao.deleteContact(no)
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    app.post('/contacts/batchinsert', function(req,res) {
        console.log("### POST /contacts/batchinsert");
        var data = req.body;
        contactdao.batchInsert(data)
            .then(function(data) {
                res.json(data)
            }).cathc(function(err) {
                console.log(err);
            });
        
    });

    //----에러 처리 시작
    app.get('*', function(req, res, next) {
        var err = new Error();
        err.status = 404;
        next(err);
    });
    
    app.use(function(err, req, res, next) {
        if(err.status === 404) {
            res.json({ status:404, message:"잘못된 URI 요청"});
        } else if (err.status === 500) {
            res.json({ status:500, message:"내부 서버 오류"});
        } else {
            return next();
        }
    });

    
}

