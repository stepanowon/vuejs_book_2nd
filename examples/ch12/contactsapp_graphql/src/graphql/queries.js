import gql from 'graphql-tag';

export const FETCH_CONTACTS = gql`
    query contactsAllQuery($pageno:Int!, $pagesize:Int!){
        contactsAll(pageno:$pageno, pagesize:$pagesize) {
            pageno pagesize totalcount contacts {
                _id name tel address photo
            }
        }
    }
`;

export const INSERT_CONTACT = gql`
    mutation insertContactMutation($name:String!, $tel:String!, $address:String!) {
        insertContact(name:$name, tel:$tel, address:$address) {
            status message _id
        }
    }
`;

export const DELETE_CONTACT = gql`
    mutation deleteContactMutation($_id:String!) {
        deleteContact(_id:$_id) {
            status message _id
        }
    }
`;

export const FETCH_CONTACT_ONE = gql`
    query contactOneMutation($_id:String!) {
        contactOne(_id:$_id) {
            _id name tel address photo
        }
    }
`;

export const UPDATE_CONTACT = gql`
    mutation updateContactMutation($_id:String!, $name:String!, $tel:String!, $address:String!){
        updateContact(_id:$_id, name:$name, tel:$tel, address:$address) {
            status message _id
        }
    }
`;

export const CHANGE_PHOTO = gql`
    mutation changePhotoMutation($_id:String!, $file:Upload!) {
        changePhoto(_id:$_id, file:$file) {
            status message _id
        }
    }
`;

