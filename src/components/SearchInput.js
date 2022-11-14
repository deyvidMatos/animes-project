import { useState } from "react"
import useDebounce from "./usedebounce"
import './searchInput.css'

const SearchInput = ({ value, onChange }) =>{

    const [ displayValue, setDisplayValue ] = useState(value)
    const debouncedChange = useDebounce(onChange, 500)

    function handleChange(ev){
        setDisplayValue(ev.target.value)
        debouncedChange(ev.target.value)
    }

    return(
        <input type='search' value={displayValue} onChange={handleChange} />
    )
}

export default SearchInput