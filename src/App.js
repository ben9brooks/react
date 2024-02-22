import './App.css';
import { useState, useEffect } from 'react';

function GitHubUser( {name, public_repos, avatar} ){
  return(
    <div>
      <h1>{name}</h1>
      <p>Repos: {public_repos}</p>
      <img src={avatar} height={50} alt="pfp"/>
    </div>
  )
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/ben9brooks`)
    .then(response => response.json())
    .then(setData)
    .then(() => setLoading(false))
    .catch(setError);
  }, []);

  if(loading) return <h1>Loading...</h1>
  if(error) return <pre>{JSON.stringify(error)}</pre>
  if(!data) return null;

   return (
    <GitHubUser name={data.name} public_repos={data.public_repos} avatar={data.avatar_url} />
  );
}

export default App;
