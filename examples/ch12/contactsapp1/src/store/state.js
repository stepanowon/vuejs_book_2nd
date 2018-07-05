import CONF from '../Config';

export default {
    contact : { no:0, name:'', tel:'', address:'', photo:'' },
    contactlist : {
        pageno:1, pagesize: CONF.PAGESIZE, totalcount:0, contacts:[]
    }
}