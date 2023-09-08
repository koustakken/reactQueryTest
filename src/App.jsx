import React from 'react';
import Container from 'react-bootstrap/Container';
import { CoinTable } from './components/CoinTable/CoinTable';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

function App() {
	const [coins, setCoins] = React.useState();
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(false);

	async function fetchCoins() {
		try {
			const { data } = await axios.get(`https://api.coinstats.app/public/v1/coins?limit=20`);
			setCoins(data.coins);
			console.log(data.coins);
		} catch (error) {
			console.error(error.message);
			setError(true);
		} finally {
			setLoading(false);
		}
	}

	React.useEffect(() => {
		fetchCoins();
	}, []);

	if (loading) {
		return <h3>Loading...</h3>
	}

	if (error) {
		return <h3>Error fetch</h3>
	}

	if(!coins) {
		return <h3>Not data</h3>
	}

	

	return (
		<Container>
			<CoinTable data={coins} />
		</Container>
	)
}  

export default App