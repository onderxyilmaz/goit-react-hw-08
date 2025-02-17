import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactList } from '../components/ContactList';
import { ContactForm } from '../components/ContactForm';
import { Filter } from '../components/Filter';
import { fetchContacts } from '../redux/contacts/operations';
import { selectIsLoading } from '../redux/contacts/selectors';
import styles from './Contacts.module.css';

export default function Contacts() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Kişi Rehberi</h1>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Yeni Kişi Ekle</h2>
                <ContactForm />
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Kişiler</h2>
                <div className={styles.filterContainer}>
                    <Filter />
                </div>
                {isLoading ? (
                    <p>Yükleniyor...</p>
                ) : (
                    <ContactList />
                )}
            </div>
        </div>
    );
} 