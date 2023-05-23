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

   useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts))
   }, [contacts]);

   const formSubmitData = (name, number) => {
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

