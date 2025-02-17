import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/auth/operations';
import { selectError } from '../redux/auth/selectors';
import styles from './Login.module.css';

export default function Login() {
    const dispatch = useDispatch();
    const error = useSelector(selectError);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        dispatch(
            login({
                email: form.elements.email.value,
                password: form.elements.password.value,
            })
        );
        // form.reset(); // Hata durumunda formu sıfırlamayalım
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Giriş Yap</h2>
            <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
                <label className={styles.label}>
                    Email
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        required
                        autoFocus
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
                <button className={styles.button} type="submit">Giriş Yap</button>
            </form>
        </div>
    );
} 