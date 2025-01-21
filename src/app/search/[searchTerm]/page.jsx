'use client';

import { useEffect, useState } from "react";
import { use } from "react"; // Import React.use()
import { fetchSearch } from "../../../../Service/imdbAPI";

function SearchPage({ paramsPromise }) {
    const params = use(paramsPromise); // ใช้ React.use() แกะ Promise ของ params
    const { searchTerm } = params;

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await fetchSearch('movie', searchTerm);
                setSearchResults(results);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchData();
    }, [searchTerm]);

console.log(searchResults);


    return (
        <div>
            <h1>Search Results for: {searchTerm}</h1>
        </div>
    );
}

export default function Page({ params }) {
    return <SearchPage paramsPromise={params} />;
}
