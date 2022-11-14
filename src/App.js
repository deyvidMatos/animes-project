
import './App.css';
import SearchInput from './components/SearchInput';
import { useEffect, useState } from 'react';
import Pagination from './components/pagination';
import qs from 'qs'

function App() {
  const [text, setText] = useState('')
  const [info, setInfo] = useState({})
  const [offset, setOffset] = useState(0)

  const LIMIT = 12

  const api = 'https://kitsu.io/api/edge/'

  useEffect(()=>{
    
      setInfo({})

      const query = {
        page:{
          limit: LIMIT,
          offset,
        }
      }

      if(text){
        query.filter = {
          text,
        };
      }

      fetch(`${api}anime?${qs.stringify(query)}`)
      .then((response)=> response.json())
      .then((response)=>{
        setInfo(response);
      })
    
  },[ text, offset ])

  return (
    <div>
      <h1>Animes:</h1>
      <SearchInput value={text} onChange={(srt) => setText(srt)}/>
      {text && !info.data && <span>Carregando...</span>}
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
      { info.meta && (
        <Pagination limit={LIMIT} 
        total={info.meta.count} 
        offset={offset}  
        setOffset={setOffset}/>
      )}
      
    </div>
  );
}

export default App;
