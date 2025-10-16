import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook
import qumailLogo from '../assets/qumail-logo.png';

const QuMailLogin: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [remember, setRemember] = useState<boolean>(false);

    const navigate = useNavigate(); // 2. Initialize the navigate function

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        console.log('Login attempt:', { email, password, remember });
        // alert(`Login functionality would be implemented here!\nEmail: ${email}`); // We replace this alert

        // 3. Redirect to the dashboard page on successful validation
        navigate('/index');
    };

    return (
        <div style={styles.body}>
            <div style={styles.loginContainer}>
                <div style={styles.logoContainer}>
                    <div style={styles.logo}>
                        <img
                            src={qumailLogo}
                            alt="QuMail Logo"
                            style={{ width: '90px', height: '90px' }} // Adjust size as needed
                        />
                    </div>
                    <h1 style={styles.h1}>Welcome to QuMail</h1>
                    <p style={styles.subtitle}>Sign in to access your emails</p>
                </div>

                <div>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.rememberMe}>
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            style={styles.checkbox}
                        />
                        <label htmlFor="remember" style={styles.rememberLabel}>
                            Remember me
                        </label>
                    </div>

                    <button
                        type="button"
                        style={styles.loginBtn}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#2854a0';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(49, 106, 183, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#316AB7';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

// ... (your styles object remains the same)
const styles: { [key: string]: React.CSSProperties } = {
    body: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
        background: 'linear-gradient(135deg, #316AB7 0%, #4A8FD9 100%)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        margin: 0,
    },
    loginContainer: {
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '420px',
        padding: '48px 40px',
    },
    logoContainer: {
        textAlign: 'center',
        marginBottom: '32px',
    },
    logo: {
        width: '80px',
        height: '80px',
        background: '#316AB7',
        borderRadius: '18px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        boxShadow: '0 4px 12px rgba(49, 106, 183, 0.3)',
    },
    logoText: {
        color: 'white',
        fontSize: '42px',
        fontWeight: 700,
        letterSpacing: '-1px',
    },
    h1: {
        color: '#316AB7',
        fontSize: '28px',
        fontWeight: 600,
        marginBottom: '8px',
        margin: 0,
    },
    subtitle: {
        color: '#666',
        fontSize: '15px',
        marginBottom: '32px',
    },
    formGroup: {
        marginBottom: '24px',
    },
    label: {
        display: 'block',
        color: '#333',
        fontSize: '14px',
        fontWeight: 500,
        marginBottom: '8px',
    },
    input: {
        width: '100%',
        padding: '14px 16px',
        border: '2px solid #e0e0e0',
        borderRadius: '10px',
        fontSize: '15px',
        transition: 'all 0.3s ease',
        outline: 'none',
        boxSizing: 'border-box',
    },
    rememberMe: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '16px',
    },
    checkbox: {
        width: 'auto',
        marginRight: '8px',
        cursor: 'pointer',
    },
    rememberLabel: {
        margin: 0,
        fontWeight: 'normal',
        fontSize: '14px',
        cursor: 'pointer',
        color: '#333',
    },
    loginBtn: {
        width: '100%',
        padding: '14px',
        background: '#316AB7',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginTop: '32px',
    },
};


export default QuMailLogin;