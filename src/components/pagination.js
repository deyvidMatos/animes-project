
const MAX_ITEMS = 9;
const ITENS_LEFT = ( MAX_ITEMS - 1 ) / 2;

const Pagination = ({ limit, total, offset, setOffset }) =>{

    const currentPage = offset ? ( offset / limit ) + 1 : 1;
    const pages = Math.ceil( total / limit );
    const maxFirst = Math.max( pages - ( MAX_ITEMS - 1 ), 1 );
    const first = Math.min( Math.max(currentPage - ITENS_LEFT, 1), maxFirst );

    const onPageChange = ( page ) => {
        setOffset(( page - 1 ) + limit )
    }

    return(
        <ul>
            <li>
                <button onClick={() => onPageChange( currentPage - 1 )} 
                disabled={ currentPage === 1 }>Anterior</button>
            </li>
            {Array.from({ length: Math.min( MAX_ITEMS, pages ) })
            .map(( _, index )=> index + first )
            .map((page) => (
                <li key={page} >
                    <button onClick={ () => onPageChange( page ) } 
                    className={ page === currentPage ? 'pageBtnActive' : 'pageBtn' } >{page}
                    </button>
                </li>
            ))}
            <li>
                <button onClick={() => onPageChange( currentPage + 1 )}
                disabled={ currentPage === pages } >Proximo</button>
            </li>
        </ul>
    )
};

export default Pagination;