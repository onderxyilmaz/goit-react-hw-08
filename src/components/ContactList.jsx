import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../redux/contacts/selectors';
import { Contact } from './Contact';

export const ContactList = () => {
    const contacts = useSelector(selectFilteredContacts);

    return (
        <ul>
            {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
            ))}
        </ul>
    );
}; 