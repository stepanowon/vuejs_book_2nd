<template>
  <div id="container">
      <div class="page-header">
         <h1 class="text-center">연락처 관리 애플리케이션</h1>
         <p>(Dynamic Component + EventBus + Axios) </p>
      </div>
      <component :is="currentView" :contact="contact"></component>
      <contactList :contactlist="contactlist"></contactList>
  </div>
</template>

<script>
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import UpdateContact from './components/UpdateContact';
import UpdatePhoto from './components/UpdatePhoto';
import CONF from './Config.js';
import eventBus from './EventBus.js';

export default {    
    name: 'app',
    components : { ContactList, AddContact, UpdateContact, UpdatePhoto },
    data: function() {
        return { 
            currentView : null, 
            contact : { no:0, name:'', tel:'', address:'', photo:'' },
            contactlist : {
                pageno:1, pagesize: CONF.PAGESIZE, totalcount:0, contacts:[]
            }
        }
    },
    mounted : function() {
      this.fetchContacts();
      eventBus.$on("cancel", () => {
          this.currentView = null;
      });
      eventBus.$on("addSubmit", (contact) => {
          this.currentView = null;
          this.addContact(contact);
      });
      eventBus.$on("updateSubmit", (contact) => {
          this.currentView = null;
          this.updateContact(contact);
      });
      eventBus.$on("addContactForm", () => {
          this.currentView = 'addContact';
      });
      eventBus.$on("editContactForm", (no) => {
          this.fetchContactOne(no)
          this.currentView = 'updateContact';
      });
      eventBus.$on("deleteContact", (no) => {
          this.deleteContact(no);
      });
      eventBus.$on("editPhoto", (no) => {
          this.fetchContactOne(no)
          this.currentView = 'updatePhoto';
      });
      eventBus.$on("updatePhoto", (no, file) => {
          if (typeof file !=='undefined') {
              this.updatePhoto(no, file);
          }
          this.currentView = null;
      });
      eventBus.$on("pageChanged", (page)=> {
        this.pageChanged(page);
      })      
    },
    methods : {
      pageChanged : function(page) {
          this.contactlist.pageno = page;
          this.fetchContacts();
      },
      fetchContacts : function() {
          this.$axios.get(CONF.FETCH, {
              params : { 
                  pageno:this.contactlist.pageno, 
                  pagesize:this.contactlist.pagesize 
              } 
          })
          .then((response) => {
              this.contactlist = response.data;
          })
          .catch((ex)=> {
              console.log('fetchContacts failed', ex);
              this.contactlist.contacts = [];
          })
      },
      addContact : function(contact) {
        console.log("add!!")
          this.$axios.post(CONF.ADD,  contact)
          .then((response) => {
            if (response.data.status === "success") {
              this.contactlist.pageno = 1;
              this.fetchContacts();
            } else {
              console.log('연락처 추가 실패 : ' + response.data.message);
            }
          })
          .catch((ex)=> {
              console.log('addContact failed : ', ex);
          })
      },
      updateContact : function(contact) {
          this.$axios.put(CONF.UPDATE.replace("${no}", contact.no), contact)
          .then((response) => {
            if (response.data.status === "success") {
              this.fetchContacts();
            } else {
              console.log('연락처 변경 실패 : ' + response.data.message);
            }
          })
          .catch((ex) => {
              console.log('updateContact failed : ', ex);
          })
      },
      fetchContactOne : function(no) {
          this.$axios.get(CONF.FETCH_ONE.replace("${no}", no))
          .then((response) => {
              this.contact = response.data;
          })
          .catch((ex)=> {
              console.log('fetchContactOne failed', ex);
          })
      },
      deleteContact : function(no) {
          this.$axios.delete(CONF.DELETE.replace("${no}", no))
          .then((response) => {
            if (response.data.status === "success") {
              this.fetchContacts();
            } else {
              console.log('연락처 삭제 실패 : ' + response.data.message);
            }
          })
          .catch((ex) => {
              console.log('delete failed', ex);
          })
      },
      updatePhoto : function(no, file) {
          var data = new FormData();
          data.append('photo', file);
          this.$axios.post(CONF.UPDATE_PHOTO.replace("${no}", no), data)
          .then((response) => {
            if (response.data.status === "success") {
              this.fetchContacts();
            } else {
              console.log('연락처 사진 변경 실패 : ' + response.data.message);
            }
          })
          .catch((ex) => {
              console.log('updatePhoto failed', ex);
          });
      }
    }
}
</script>

<style scoped>
#container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>