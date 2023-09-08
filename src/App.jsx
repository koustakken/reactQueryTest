import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { CoinTable } from './components/CoinTable/CoinTable';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import { useQuery } from 'react-query';

async function fetchCoins(skip = 0) {
	const { data } = await axios.get(`https://api.coinstats.app/public/v1/coins?skip=${skip}&limit=10`);
	return data.coins;
}

function App() {
	const [page, setPage] = React.useState(0);
	const { data, isLoading, isError } = useQuery(['coins', page], () => 
		fetchCoins(page),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);

	if (isLoading) {
		return <h3>Loading...</h3>
	}

	if (isError) {
		return <h3>Error fetch</h3>
	}

	if(!data) {
		return <h3>Not data</h3>
	}

	return (
		<Container>
			<CoinTable data={data} />
			<Button onClick={() => setPage((p) => p - 10)} disabled={!page}>Prev</Button>
			<Button onClick={() => setPage((p) => p + 10)}>Next</Button>
		</Container>
	)
}  

export default App