import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import { ThemeProvider } from './services/Themes/Theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';
import { AuthProvider } from './services/Auth/Auth';

const queryClient = new QueryClient({});
axios.defaults.baseURL = 'http://127.0.0.1:8090/api/';
ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<Suspense fallback={<div>Loading... </div>}>
						<App />
					</Suspense>
				</AuthProvider>
			</QueryClientProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
