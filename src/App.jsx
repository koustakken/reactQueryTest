import React from 'react';
import Container from 'react-bootstrap/Container';
import { CoinTable } from './components/CoinTable/CoinTable';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import { useQuery } from 'react-query';

async function fetchCoins() {
	const { data } = await axios.get(`https://api.coinstats.app/public/v1/coins?limit=20`);
	return data.coins;
}

function App() {
	const { data, isLoading, isError } = useQuery('coins', fetchCoins);

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
		</Container>
	)
}  

export default App