import React, { useState } from 'react'
import * as ReactDOM from 'react-dom'
import MainPage from './pages/MainPage'

function App() {
	// Todo: make data persistable within the app
	const [persistData, setPersistData] = useState(false)


	return (
		<>
			{/* <LoadingScreen completed={6} skus={data} /> */}
			{/* {cards.length !== data.length ? (
			) : (
				<MainPage
					event={clickHandler}
					loading={loading}
					data={itemCard}
					gotError={err}
				/>
			)} */}
			{/* <LoadingScreen completed={data.length} skus={data} /> */}
			<MainPage />
		</>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
