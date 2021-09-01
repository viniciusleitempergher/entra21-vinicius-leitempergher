export function SearchBar(props) {

    const [setInStockOnly, setFilterText] = props.filterMethods;
    const inStockOnly = props.inStockOnly;

    return (
        <form>
            <input type="text" placeholder="Search..." onChange={e => { setFilterText(e.target.value) }} />
            <p>
                <input type="checkbox" onChange={e => { setInStockOnly(!inStockOnly) }} />
                {' '}
            Only show products in stock
          </p>
        </form>
    );
}