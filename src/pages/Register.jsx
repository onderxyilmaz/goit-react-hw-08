import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/auth/operations';
import { selectError } from '../redux/auth/selectors';
import styles from './Register.module.css';

export default function Register() {
    const dispatch = useDispatch();
    const error = useSelector(selectError);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        dispatch(
            register({
                name: form.elements.name.value,
                email: form.elements.email.value,
                password: form.elements.password.value,
            })
        );
        // Hata durumunda formu sıfırlamıyoruz
        // form.reset();
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Kayıt Ol</h2>
            <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
                <label className={styles.label}>
                    Kullanıcı Adı
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        required
                        autoFocus
                    />
                </label>
                <label className={styles.label}>
                    Email
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        required
                    />
                </label>
                <label className={styles.label}>
                    Şifre
                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        required
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
                <button className={styles.button} type="submit">Kayıt Ol</button>
            </form>
        </div>
    );
} 