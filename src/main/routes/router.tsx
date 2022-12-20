import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { AccountContext } from '@/presentation/contexts';
import { setCurrentAccountAdapter } from '../adapter/current-account';

const Router: React.FC = () => {
	return (
		<AccountContext.Provider
			value={{
				setCurrentAccount: setCurrentAccountAdapter
			}}
		>
			<BrowserRouter>
				<Switch>
					{/* Path correct is '/login' */}
					<Route path='/' exact component={makeLogin} />
				</Switch>
			</BrowserRouter>
		</AccountContext.Provider>
	);
};

export default Router;
