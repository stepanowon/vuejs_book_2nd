var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('contacts.db');

var firstNames= "Kel,Morgan,Amari,Akiyama,Quan,Ariana,Rana,Carrie,London,Shelley,Hailey,Stella,Aki,Sun,Leigh,Maya,Jermyn,Kim,Lauren,Koryne,Fanny,Maima,Nahid,Khalea,Rachel,Maired,Sa,Serin,Blake,Drew,Lina,Priyal,Megan,Bailey,Amaya,Kaelyn,Charlotte,Korra,Kassie,Keeta,Mallie,Noel,Tracy,Kace,Killion,Kenyatta,Pita,Raye,Sadie,Evon,Addison,Arrietty,Engel,Feron,Courtney,Tonya,Landon,Mila,Nade,Gladys,Sean,Rhu,Rosebud,Sophie,Zari,Rose,Jain,Harper,Lai,Kelley,Lyanne,Le,Nivea,Penelope,Remy,Sophia,Ray,Rai,Amoni,Zoe,Kylie,Zenon,Alania,Aveen,Annabelle,Caroline,Emani,Catera,Lin,Francess,Isabella,Victoria,Isabelle,Ambrosia,Jennifer,Jesse,Kalisa,Katchi,Katherine,Keandra"
var arrfNames = firstNames.split(',');
var lastNames = "Anderson,Allen,Adams,Brown,Baker,Bailey,Bell,Brooks,Bennett,Butler,Barnes,Clark,Campbell,Carter,Collins,Cook,Cooper,Cox,Cruz,Davis,Díaz,Evans,Edwards,Flores,Foster,Fisher,Harris,Hall,Hill,Howard,Hughes,Johnson,Jones,Jackson,James,Jenkins,Gray,King,Miller,Martinez,Moore,Martin,Mitchell,Morris,Murphy,Morgan,Myers,Morales,Nelson,Nguyen,Ortiz,Lee,Lewis,Long,Phillips,Parker,Peterson,Price,Powell,Perry,Robinson,Ramirez,Roberts,Rivera,Rogers,Reed,Richardson,Reyes,Ross,Russell,Smith,Scott,Stewart,Sanders,Sullivan,Taylor,Thomas,Thompson,Turner,Torres,Williams,Wilson,White,Walker,Wright,Ward,Wood,Watso,Young";
var arrlNames = lastNames.split(',');

var initializeDB = function() {
    var base = (new Date()).getTime();
    var no = 0;
    db.get("SELECT no, name, tel, address FROM contacts", function(err,row) {
        if (err) {
            db.serialize(function() {
                db.run("CREATE TABLE contacts (no INTEGER PRIMARY KEY, name TEXT, tel TEXT, address TEXT, photo TEXT)");
                var stmt = db.prepare("INSERT INTO contacts (no, name,tel,address, photo) VALUES (?,?,?,?,?)");
                for (var i=0; i < 100; i++) {
                    var num=""+no;
                    if (no < 10) num = "0"+no;
                    var ridx = Math.floor(Math.random() * arrlNames.length);
                    
                    stmt.run(base+no, arrfNames[i] + " " + arrlNames[ridx], "010-3456-82"+num, "서울시", "" + (no+1) + ".jpg");
                    no++;
                }
                stmt.finalize();
            });
        }
    });
}

initializeDB();

//true이면 인젝션 문자열을 포함하고 있으므로 실행을 거부함.
var  injectionfilter = function(val){
    var str="select,insert,update,delete,merge,commit,rollback,create,alter,drop,truncate,grant,revoke,union,alter,and,or,--,'";
    var str = str.split(",");
    
    val = val.toLowerCase(); 
    
    for(var i=0; i<str.length; i++)
    {
        if(val.indexOf(str[i],0)>-1) {
            return true;
            break;
        }
    }
    return false;
}

module.exports = {
    insertContact : function(name,tel,address) {
         return new Promise(function(resolve, reject) {
             if (name && tel && name!="" && tel!="") {
                var nextno = (new Date()).getTime();
                db.run("INSERT INTO contacts VALUES (?,?,?,?,?)",[nextno,name,tel,address,'noimage.jpg'], function(err) {
                    if (err) {
                        resolve({ status:'fail', message:'연락처 추가 실패 : ' +err });
                    } else {
                        resolve({ status:'success', message:'No(' + this.lastID + ') 데이터 추가 성공!!', no:this.lastID });
                    }
                })
             } else {
                resolve({ status:'fail', message:'이름과 전화번호는 반드시 입력해야 합니다.' });
             }
         });
    },
    updateContact : function(no,name,tel,address) {
         return new Promise(function(resolve, reject) {
             if (no && name && tel && name!="" && tel!="") {
                db.run("UPDATE contacts SET name=?, tel=?, address=? WHERE no=?", [name,tel,address,no], function(err) {
                    if (err) {
                        resolve({ status:'fail', message:'연락처 변경 실패 : ' + err });
                    } else {
                        resolve({ status:'success', message:'No(' + no + ') 데이터 변경 성공!!', no:no });
                    }
                })
             } else {
                 resolve({ status:'fail', message:'일련번호, 이름, 전화번호는 반드시 입력해야 합니다.' });
             }
         });
    },
    deleteContact : function(no) {
         return new Promise(function(resolve, reject) {
             db.run("DELETE FROM contacts WHERE no=?", no, function(err) {
                 if (err) {
                     resolve({ status:'fail', message:'삭제 실패 : ' +err });
                 } else {
                     resolve({ status:'success', message:'No(' + no + ') 데이터 삭제 성공!!', no:no });
                 }
             })
         });
    },
    getContactList : function(photoUrl, pageno, pagesize) {
        var sql = "SELECT no, name,tel,address,photo FROM contacts ORDER BY no DESC";
        if (pageno !== 0) {
            sql += " LIMIT " + ((pageno-1)*pagesize) + ", " + pagesize;
        }
        var sqlcnt = "SELECT count(*) FROM contacts";

        var p1 =  new Promise(function(resolve, reject) {
            db.all(sql, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    var data = [];
                    rows.forEach(function (row) {
                        data.push({no:row.no, name:row.name, tel:row.tel, address:row.address, photo:photoUrl + row.photo });
                    });
                    resolve(data);
                }
            });
        });

        var p2 = new Promise(function(resolve, reject) {
            db.each("SELECT count(*) as cnt  FROM contacts", function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row.cnt);
                }
            });
        })

        return Promise.all([p1,p2]);

    },
    getContact : function(photoUrl, no) {
        return new Promise(function(resolve, reject) {
            db.get("SELECT no,name,tel,address,photo FROM contacts WHERE no=?", no, function(err, row) {
                if (err) {
                    reject({ message : err });
                } else {
                    var data = {};
                    if (row) {
                        data.no = row.no;
                        data.name = row.name;
                        data.tel = row.tel;
                        data.address = row.address;
                        data.photo = photoUrl + row.photo;
                    }
                    resolve(data);
                }
            });
        });
    },
    searchContact : function(photoUrl, name) {
        return new Promise(function(resolve, reject) {
            var injResult = injectionfilter(name);
            if (injResult == true) {
                resolve({ status:'fail', message:"이름에 인젝션 문자열을 포함하고 있으므로 실행하지 않습니다."});
            }
            if (name.length < 2) {
                resolve({ status:'fail', message:"2글자 이상만 검색이 가능합니다."});
            }
            var sql = "SELECT no,name,tel,address,photo FROM contacts WHERE name LIKE '%" + name + "%' ORDER BY name ASC"
            db.all(sql, function(err, rows) {
                if (err) {
                    reject({ message : err });
                } else {
                    var data = [];
                    rows.forEach(function (row) {
                        data.push({no:row.no, name:row.name, tel:row.tel, address:row.address, photo:photoUrl + row.photo });
                    });
                    resolve(data);
                }
            });
        });
    },
    batchInsert : function(arr) {
        return new Promise(function(resolve, reject) {
            var no = (new Date()).getTime();
            var insertedRows = [];
            db.serialize(function() {
                try {
                    var stmt = db.prepare("INSERT INTO contacts VALUES (?,?,?,?,?)");
                    for (var i = 0; i < arr.length; i++) {
                        stmt.run(++no, arr[i].name, arr[i].tel, arr[i].address, 'noimage.jpg');
                        insertedRows.push(no);
                    }
                    stmt.finalize();
                    resolve({ status:'success', message: i+'건 데이터 추가 성공!!', no : insertedRows });
                } catch(e) {
                    resolve({ status:'fail', message:'배치 추가 작업 실패 : ' + e });
                }
            });
        });
    },
    updatePhoto : function(no, photo) {
         return new Promise(function(resolve, reject) {
             db.get("SELECT no FROM contacts WHERE no=?", no, function(err, row) {
                 if (row) {
                    db.run("UPDATE contacts SET photo=? WHERE no=?", [photo, no], function(err) {
                        if (err) {
                            resolve({ status:'fail', message:'사진 변경 실패 : '+err });
                        } else {
                            resolve({ status:'success', message:'No(' + no + ') 사진 변경 성공!!', no:no });
                        }
                    })
                 } else {
                     resolve({ status:'fail', message:"no에 해당하는 연락처 정보 없음" })
                 }
             })

         });
    },
    close : function() {
        db.close();
    }
}
