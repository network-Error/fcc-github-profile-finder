import { useEffect, useState } from "react"
import User from "./User";
import './styles.css'

const GithubProfileFinder = () => {
  const [userName, setUserName] = useState('rolling-scopes-school');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleSubmit() {
    fetchGithubUserData();
  }

  async function fetchGithubUserData() {
    setLoading(true);
    const res = await fetch(`https://api.github.com/users/${userName}`);

    const data = await res.json();
    if (data) {
      setUserData(data);
      setLoading(false);
      setUserName('');
    }
  }

  useEffect(() => {
    fetchGithubUserData()
  }, []);

  if (loading) {
    return <h1>Loading data</h1>
  }

  return (
    <div className="github-profile-container">
      <div className="input-wrapper">
        <input name="search-by-username" type="text" placeholder="Search Github Username..." value={userName} onChange={(event) => setUserName(event.target.value)} />
        <button onClick={handleSubmit}>Search</button>
      </div>
      {
        userData !== null ? <User user={userData} /> : null
      }
    </div>
  )
}

export default GithubProfileFinder