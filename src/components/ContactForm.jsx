import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../redux/contacts/operations';
import { selectContacts } from '../redux/contacts/selectors';
import styles from './ContactForm.module.css';
import { useState, useRef } from 'react';

export const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    const [error, setError] = useState(null);
    const nameInputRef = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        setError(null); // Her denemede hata mesajını temizle

        const form = e.currentTarget;
        const name = form.elements.name.value;
        const number = form.elements.number.value;

        const isDuplicate = contacts.some(
            contact =>
                contact.name.toLowerCase() === name.toLowerCase() ||
                contact.number === number
        );

        if (isDuplicate) {
            setError('Bu isim veya numara zaten kayıtlı!');
            return;
        }

        dispatch(addContact({ name, number }));
        form.reset();
        // Form resetlendikten sonra isim alanına focus ol
        nameInputRef.current.focus();
    };

    // İsim alanı için kontrol
    const handleNameChange = (e) => {
        const value = e.target.value;
        // Sadece harf, boşluk ve Türkçe karakterlere izin ver
        if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]*$/.test(value)) {
            e.target.value = value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, '');
        }
    };

    // Numara alanı için kontrol
    const handleNumberChange = (e) => {
        const value = e.target.value;
        // Sadece rakamlara izin ver
        if (!/^\d*$/.test(value)) {
            e.target.value = value.replace(/\D/g, '');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
                İsim
                <input
                    ref={nameInputRef}
                    type="text"
                    name="name"
                    className={styles.input}
                    required
                    autoFocus
                    onChange={handleNameChange}
                    placeholder="Sadece harf giriniz"
                />
            </label>
            <label className={styles.label}>
                Numara
                <input
                    type="text"
                    name="number"
                    className={styles.input}
                    required
                    onChange={handleNumberChange}
                    placeholder="Sadece rakam giriniz"
                />
            </label>
            {error && (
                <div className={styles.errorContainer}>
                    <p className={styles.error}>
                        <span className={styles.errorIcon}>⚠️</span>
                        {error}
                    </p>
                </div>
            )}
            <button type="submit" className={styles.button}>Kişi Ekle</button>
        </form>
    );
}; 