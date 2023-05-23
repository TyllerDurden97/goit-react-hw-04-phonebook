import { React, useState } from "react";
import PropTypes from 'prop-types';
import css from 'components/ContactForm/ContactForm.module.css';

export const ContactForm = ({ onSubmitData }) => {
   const [name, setName] = useState('');
   const [number, setNumber] = useState('');

   const handleInputChange = (e) => {
      const { name, value } = e.currentTarget;
      switch (name) {
         case 'name':
            setName(value)
            break;
         case 'number':
            setNumber(value)
            break;
         default:
            return;
      };
   };
   
   const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmitData( name, number );
      setName('');
      setNumber('');
   };

   return (
         <form
            className={css.fhonebForm}
            onSubmit={handleFormSubmit}>
               <label className={css.fhonebFormLabel}>Name 
               <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleInputChange}
            className={css.fhonebFormInpt}
               />
               </label>
                <label className={css.fhonebFormLabel}>Number 
               <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleInputChange}
            className={css.fhonebFormInpt}
               />
               </label>
               <button type="submit" className={css.fhonebFormBtn}>Add contact</button>
      </form>)   
}
   
   ContactForm.propTypes = {
    onSubmitData: PropTypes.func.isRequired,
};
