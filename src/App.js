
import './App.css';
import SearchInput from './SearchInput';
import { useEffect, useState } from 'react';

function App() {
  const [text, setText] = useState('')

  const [info, setInfo] = useState({})

  const api = 'https://kitsu.io/api/edge/'

  useEffect(()=>{
    if(text){
      setInfo({})
      fetch(`${api}anime?filter[text]=${text}&page[limit]=12`)
      .then((response)=> response.json())
      .then((response)=>{
        setInfo(response);
        console.log(response)
      })
    }
  },[text])

  return (
    <div>
      <h1>Animes:</h1>
      <SearchInput value={text} onChange={(srt) => setText(srt)}/>
      {text && !info.data && <span>...</span>}
      {info.data && (
        <ul>
          {info.data.map((anime) =>(
            <li key={anime.id}>
              <h3>{anime.attributes.canonicalTitle}</h3>
              <img alt={anime.attributes.canonicalTitle} src={anime.attributes.posterImage.small}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
