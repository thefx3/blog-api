//HomePage.jsx

import '@shared/index.css'


export default function Home() {
    const token = localStorage.getItem("token");
    useEffect(() => {
        fetch("http://localhost:3000/api/auth/me", {
            headers: { Authorization: "Bearer " + token }
        })
        .then(res => res.json())
        .then(data => console.log("User profile :", data));
    }, []);

    return(
        <div className='home-page'>

            <h1>Home page</h1>

        </div>
    );
}