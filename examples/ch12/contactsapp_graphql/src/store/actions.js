import Constant from '../Constant';
import apolloClient from '../graphql/apolloClient';
import uploadClient from '../graphql/uploadClient';
import * as queries from '../graphql/queries';


export default {
    [Constant.FETCH_CONTACTS] : (store, payload) => {
        var pageno;
        if (typeof payload ==="undefined" || typeof payload.pageno ==="undefined")
            pageno = 1;
        else 
            pageno = payload.pageno;
        var pagesize = store.state.contactlist.pagesize;
        store.commit(Constant.CHANGE_IS_LOADING, { isloading: true });
        apolloClient.query({
            query : queries.FETCH_CONTACTS, 
            variables : { pageno, pagesize }
        }).then((response)=> {
            store.commit(Constant.FETCH_CONTACTS, { contactlist: response.data.contactsAll });
            store.commit(Constant.CHANGE_IS_LOADING, { isloading: false});
        })
    },
    [Constant.ADD_CONTACT] : (store) => {
        const contact = store.state.contact;
        store.commit(Constant.CHANGE_IS_LOADING, { isloading: true});
        apolloClient.mutate({
            mutation : queries.INSERT_CONTACT,
            variables : {
                name:contact.name,
                tel:contact.tel,
                address:contact.address
            }
        }).then((response)=> {
            store.commit(Constant.CHANGE_IS_LOADING, { isloading: false});
            const res = response.data.insertContact;
            if (res.status == "ok") {
                store.dispatch(Constant.FETCH_CONTACTS, { pageno: 1});                
            } else {
                console.log("연락처 추가 실패 : ", res);
            }
        })
    },
    [Constant.UPDATE_CONTACT] : (store) => {
        let currentPageNo = store.state.contactlist.pageno;
        let contact = store.state.contact;
        store.commit(Constant.CHANGE_IS_LOADING, { isloading: true });
        apolloClient.mutate({
            mutation : queries.UPDATE_CONTACT,
            variables : {
                _id: contact._id,
                name : contact.name,
                tel : contact.tel,
                address : contact.address
            }
        }).then((response)=>{
            store.commit(Constant.CHANGE_IS_LOADING, { isloading: false});
            let res = response.data.updateContact;
            if (res.status == "ok") {
                store.dispatch(Constant.FETCH_CONTACTS, { pageno: currentPageNo });
            } else {
                console.log("연락처 변경 실패 : ", res)
            }
        })
    },
    [Constant.UPDATE_PHOTO] : (store, payload) => {
        let currentPageNo = store.state.contactlist.pageno;
        store.commit(Constant.CHANGE_IS_LOADING, { isloading: true });
        uploadClient.mutate({
            mutation : queries.CHANGE_PHOTO,
            variables : {
                _id : payload._id,
                file : payload.file
            }
        }).then((response)=> {
            store.commit(Constant.CHANGE_IS_LOADING, { isloading: false});
            store.dispatch(Constant.FETCH_CONTACTS, { pageno: currentPageNo });
        })

        // var currentPageNo = store.state.contactlist.pageno;
        // var data = new FormData();
        // data.append('photo', payload.file);
        // axios.post(CONF.UPDATE_PHOTO.replace("${no}", payload.no), data)
        // .then(()=> {
        //     store.dispatch(Constant.FETCH_CONTACTS, { pageno: currentPageNo });
        // })
    },
    [Constant.DELETE_CONTACT] : (store, payload)=> {
        let currentPageNo = store.state.contactlist.pageno;
        store.commit(Constant.CHANGE_IS_LOADING, { isloading: true });
        apolloClient.mutate({
            mutation: queries.DELETE_CONTACT,
            variables : {
                _id: payload._id
            }
        }).then((response)=> {
            store.commit(Constant.CHANGE_IS_LOADING, { isloading: false});
            const res = response.data.deleteContact;
            if (res.status == "ok") {
                store.dispatch(Constant.FETCH_CONTACTS, { pageno: currentPageNo });              
            } else {
                console.log("연락처 삭제 실패 : ", res);
            }
        })
    },
    [Constant.FETCH_CONTACT_ONE] : (store, payload) => {
        let c = store.state.contactlist.contacts.find((c)=>c._id === payload._id);
        if (c) {
            store.commit(Constant.FETCH_CONTACT_ONE, { contact : { ...c }})
        }
        //store.commit(Constant.CHANGE_IS_LOADING, { isloading: true });
        // apolloClient.query({
        //     query : queries.FETCH_CONTACT_ONE,
        //     variables : { _id : payload._id }
        // }).then(response=> {
        //     store.commit(Constant.CHANGE_IS_LOADING, { isloading: false});
        //     let res = response.data.contactOne;
        //     store.commit(Constant.FETCH_CONTACT_ONE, { contact:res });
        // })
    },
    [Constant.INITIALIZE_CONTACT_ONE] : (store) => {
        store.commit(Constant.INITIALIZE_CONTACT_ONE);
    }
}