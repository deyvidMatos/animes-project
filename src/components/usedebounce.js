import { useRef } from "react"

export default function useDebounce(fn, delay){
    const timeoutRef = useRef(null)
    
    function debounceFn(...args){
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(()=>{
            fn(...args)
        }, delay)
    }
    return debounceFn
}