//HomePage.jsx

import { useContext } from 'react';
import { AuthContext } from '@shared/contexts/AuthContext.jsx';
import '@shared/index.css';
import './HomePage.css';

export default function HomePage() {
    const { user, token } = useContext(AuthContext);

    return(
        <div className='home-page'>
            <section className="hero-card">
                <p className="eyebrow">Blog API</p>
                <h1>Build, test and share your posts here.</h1>
                <p className="lede">
                    A nice and optimized platform to write, publish and explore content from the community.
                </p>

                <div className="hero-actions">
                    <a className="button primary" href="/posts">See the posts</a>
                    <a className="button ghost" href="/profile">My profile</a>
                </div>

                {token && !user && <p className="meta muted">Loading your profile...</p>}
                {!token && <p className="meta muted">You are browsing as a guest.</p>}
                {user && (
                    <p className="meta success">
                        Connected as <strong>{user.email || user.username || 'utilisateur'}</strong>
                    </p>
                )}
            </section>
        </div>
    );
}
