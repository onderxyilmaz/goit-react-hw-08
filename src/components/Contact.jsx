import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, updateContact } from '../redux/contacts/operations';
import styles from './Contact.module.css';

export const Contact = ({ contact }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(contact.name);
    const [number, setNumber] = useState(contact.number);
    const editNameInputRef = useRef(null);

    // Düzenleme modu açıldığında ilk input'a focus ol ve metni seç
    useEffect(() => {
        if (isEditing && editNameInputRef.current) {
            editNameInputRef.current.focus();
            editNameInputRef.current.select(); // Metni seç
        }
    }, [isEditing]);

    // İsim alanı için kontrol
    const handleNameChange = (e) => {
        const value = e.target.value;
        // Sadece harf, boşluk ve Türkçe karakterlere izin ver
        if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]*$/.test(value)) {
            e.target.value = value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, '');
        }
        setName(e.target.value);
    };

    // Numara alanı için kontrol
    const handleNumberChange = (e) => {
        const value = e.target.value;
        // Sadece rakamlara izin ver
        if (!/^\d*$/.test(value)) {
            e.target.value = value.replace(/\D/g, '');
        }
        setNumber(e.target.value);
    };

    const handleUpdate = () => {
        dispatch(updateContact({
            contactId: contact.id,
            name,
            number
        }));
        setIsEditing(false);
        focusOnFormInput();
    };

    const handleCancel = () => {
        setIsEditing(false);
        setName(contact.name); // Değerleri orijinal haline döndür
        setNumber(contact.number);
        focusOnFormInput();
    };

    // Form input'una focus olma fonksiyonu
    const focusOnFormInput = () => {
        const contactFormInput = document.querySelector('form input[name="name"]');
        if (contactFormInput) {
            contactFormInput.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Form submit'i engelle
            handleUpdate();
        }
    };

    return (
        <li className={styles.item}>
            {isEditing ? (
                <div className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            ref={editNameInputRef}
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            onKeyDown={handleKeyDown}
                            className={styles.input}
                            placeholder="Sadece harf giriniz"
                        />
                        <input
                            type="text"
                            value={number}
                            onChange={handleNumberChange}
                            onKeyDown={handleKeyDown}
                            className={styles.input}
                            placeholder="Sadece rakam giriniz"
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className={styles.button}
                        >
                            Kaydet
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className={styles.buttonCancel}
                        >
                            İptal
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <span className={styles.text}>{contact.name}: {contact.number}</span>
                    <div className={styles.buttonGroup}>
                        <button onClick={() => setIsEditing(true)} className={styles.buttonEdit}>
                            Düzenle
                        </button>
                        <button onClick={() => dispatch(deleteContact(contact.id))} className={styles.buttonDelete}>
                            Sil
                        </button>
                    </div>
                </>
            )}
        </li>
    );
}; 