
import './App.css';
import SearchInput from './components/SearchInput';
import { useEffect, useState } from 'react';
import Pagination from './components/pagination';
import qs from 'qs'
import Loading from './components/loading';
import HomeModal from './components/toHome';

function App() {
  const [text, setText] = useState('')
  const [info, setInfo] = useState({})
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const LIMIT = 12;

  const api = 'https://kitsu.io/api/edge/'

  useEffect(() => {
    setInfo({})
    setIsLoading(true)

    const query = {
      page: {
        limit: LIMIT,
        offset
      }
    }

    if (text) {
      query.filter = {
        text
      };
    }

    fetch(`${api}anime?${qs.stringify(query)}`)
      .then((response) => response.json())
      .then((response) => {
        setInfo(response);
        setIsLoading(false);
      })

  }, [text, offset])

  return (
    <div className='mainContainer'>
      <nav className='nav'>
        <h1>Pesquise um Anime:</h1>
        <SearchInput value={text} onChange={(srt) => setText(srt)} />
      </nav>
      {isLoading && <Loading/>}
      {info.data && (
        <ul className='animeList'>
          {info.data.map((anime) => (
            <li key={anime.id} className='animeCard'>
              <img alt={anime.attributes.canonicalTitle} src={anime.attributes.posterImage.small} />
              <h3>{anime.attributes.canonicalTitle}</h3>
            </li>
          ))}
        </ul>
      )}
      {info.meta && (
        <Pagination limit={LIMIT}
          total={info.meta.count}
          offset={offset}
          setOffset={setOffset} />
      )}
      <HomeModal/>
    </div>
  );
}

export default App;
