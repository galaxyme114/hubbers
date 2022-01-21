import * as React from 'react'
import { Helmet } from 'react-helmet'

const LinkedInLoginPlaceholder: React.StatelessComponent<{}> = () => {
	if (window.opener) {
		window.opener.postMessage({ type: 'Linkedin Login', url: window.location.href }, 'https://hubbers.io')
	}
	
	return (
		<div className="linkedin-login-placeholder">
			<Helmet>
				<title>LinkedIn | Hubbers - Hub of Makers</title>
			</Helmet>
			<div className="container">
				<div className="linkedin-login-placeholder__title">Signing in ...</div>
				<div className="linkedin-login-placeholder__subtitle">
					Please wait patiently while we sign you in.
				</div>
			</div>
		</div>
	)
}

export default LinkedInLoginPlaceholder