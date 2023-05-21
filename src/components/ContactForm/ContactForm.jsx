import { Component } from "react";
import PropTypes from 'prop-types';
import css from 'components/ContactForm/ContactForm.module.css';

export class ContactForm extends Component {
   state = {
      name: '',
      number: '',
   };

   handleInputChange = (e) => {
      const { name, value } = e.currentTarget;
      this.setState({ [name]: value })
   };

   handleFormSubmit = (e) => {
      e.preventDefault();
      this.props.onSubmitData(this.state);
      this.setState({
         name: '',
         number: '',
      });
   };

   render() {
      const { number, name } = this.state;
      return (
         <form
            className={css.fhonebForm}
            onSubmit={this.handleFormSubmit}>
               <label className={css.fhonebFormLabel}>Name 
               <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleInputChange}
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
            onChange={this.handleInputChange}
            className={css.fhonebFormInpt}
               />
               </label>
               <button type="submit" className={css.fhonebFormBtn}>Add contact</button>
            </form>)
   }

}
   
   ContactForm.propTypes = {
    onSubmitData: PropTypes.func.isRequired,
};
