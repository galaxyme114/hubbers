import bugsnag from '@bugsnag/js'
import bugsnagReact from '@bugsnag/plugin-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './containers/Root'

const bugsnagClient = bugsnag('950df956e9143d0a33fe3f6b2c5d22f4')
bugsnagClient.use(bugsnagReact, React)

const ErrorBoundary = bugsnagClient.getPlugin('react')

const rootEl = document.getElementById('root')
ReactDOM.render(
	<AppContainer>
		<ErrorBoundary>
			<Root/>
		</ErrorBoundary>
	</AppContainer>,
	rootEl
)

// Load Intercom
declare global {
	interface Window {
		Intercom: any
	}
}
window.Intercom('boot', {app_id: 'md0k5jcj'})

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./containers/Root', () => {
		const NextApp = require<{ default: typeof Root }>('./containers/Root').default
		ReactDOM.render(
			<AppContainer>
				<ErrorBoundary>
					<NextApp/>
				</ErrorBoundary>
			</AppContainer>,
			rootEl
		)
	})
}
