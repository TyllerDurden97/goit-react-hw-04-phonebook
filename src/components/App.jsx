import { React, useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import css from 'components/App.module.css';



export const App = () => {

   const [contacts, setContacts] = useState(() =>
      JSON.parse(localStorage.getItem('contacts')) ?? []);
   const [filter, setFilter] = useState('');

   // state = {
   //    contacts: [
   //       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
   //       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
   //       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
   //       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
   //    ],
   //    filter: '',
   // };

   // useEffect(() => { 
   // localStorage.setItem('contacts', JSON.stringify(contacts))

   // }, [])


   useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts))
   }, [contacts]);

   // componentDidUpdate(prevProps, prevState) {
   //    if (this.state.contacts !== prevState.contacts) {
   //       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
   //    }      
   // };

   // componentDidMount() {
   //    if (localStorage.contacts) {
   //       const storedContacts = localStorage.getItem('contacts');
   //       const parsedContacts = JSON.parse(storedContacts);
   //       // console.log(localStorage);
   //       this.setState({ contacts: parsedContacts })
   //    };
   // }

   const formSubmitData = (name, number) => {
      // console.log(name, number)
      // const {contacts} = this.state
      const newContact = {
         name,
         number,
         id: nanoid(),
      };
      const filteredContact = contacts.filter(contact =>
         contact.name.toLowerCase() === newContact.name.toLowerCase()).length;
    
      if (filteredContact) {
         return Notify.info(`${name} is already in Contacts`)
      } else {
         setContacts((prevContacts) => (
            [newContact, ...prevContacts]
         ));
      };
   };
   
      const handleFilterChange = (e) => {
        setFilter(e.currentTarget.value)
      };      

      const deleteContact = contactId => {
         setContacts(prevContacts => (
            prevContacts.filter(contact => contact.id !== contactId)
      ));
   };
   const filteredNames = contacts.filter(contact =>
         contact.name.toLowerCase().includes(filter.toLowerCase()));
   
   return (
      <div className={css.pageWrap}>
         <h1 className={css.pageTitle}>Phonebook</h1>
         <ContactForm
            onSubmitData={formSubmitData}
         />
         <h2 className={css.title}>Contacts</h2>
         <div className={css.contactsArea}>
            <Filter value={filter} onChange={handleFilterChange} />
            <ContactList filteredNames={filteredNames} filter={filter} contacts={contacts} onDeleteContact={deleteContact} />
         </div>
      </div>
   );      
     
   };

