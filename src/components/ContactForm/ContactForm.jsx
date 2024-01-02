import { useDispatch, useSelector } from 'react-redux';
import {
  StyledForm,
  StyledListItem,
  StyledLabel,
  StyledInput,
  StyledButton,
} from './ContactForm.styled';
import { addContactsThunk } from '../../redux/operations';
import { selectContacts } from '../../redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);

  const createContact = e => {
    e.preventDefault();

    const newContact = {
      name: e.target.elements.name.value,
      phone: e.target.elements.number.value,
    };

    if (
      contacts.find(
        item =>
          item.name.toLowerCase() === e.target.elements.name.value.toLowerCase()
      )
    ) {
      alert(`${e.target.elements.name.value} is already in contacts.`);
      e.currentTarget.reset();
      return;
    }

    dispatch(addContactsThunk(newContact));
    e.currentTarget.reset();
  };

  return (
    <StyledForm onSubmit={createContact}>
      <ul>
        <StyledListItem>
          <StyledLabel htmlFor="name">Name </StyledLabel>
          <StyledInput
            type="text"
            name="name"
            id="name"
            required
            value={contacts.name}
          />
        </StyledListItem>
        <StyledListItem>
          <StyledLabel htmlFor="number">Number </StyledLabel>
          <StyledInput
            type="tel"
            name="number"
            id="number"
            required
            value={contacts.phone}
          />
        </StyledListItem>
      </ul>
      <StyledButton type="submit">Add contact</StyledButton>
    </StyledForm>
  );
};
