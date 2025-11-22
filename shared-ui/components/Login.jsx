
import '@shared/components/Login.css'

export default function Login() {
    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Welcome back 👋</h1>
                <p className="subtitle">Please log in to continue</p>

                <form action="/login" method="POST" className="login-form">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don’t have an account?</p>
                        <a href="/register">Create one</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
