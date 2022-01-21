import * as React from 'react'

import { LINKEDIN_API_KEY, LINKEDIN_API_REDIRECT } from '../constants/api'
import { openPopupCenter } from '../utils/window'
import Icon from './Icon'

import { parse as parseQueryString } from 'querystring'

export interface LinkedinLoginProps {
	text: string
	onLogin?: any
}

export default class LinkedinLogin extends React.Component<LinkedinLoginProps, {}> {
	public render() {
		const {text} = this.props
		
		return (
			<div
				onClick={() => {
					this.handleClick()
				}}
				className="signin-section__fields__social-button signin-section__fields__social-button--linkedin">
				<Icon name="linkedin"/><span className="label">{text}</span>
			</div>
		)
	}
	
	private handleClick() {
		openPopupCenter(`
      https://www.linkedin.com/oauth/v2/authorization?response_type=code` +
			`&client_id=${LINKEDIN_API_KEY}&redirect_uri=${LINKEDIN_API_REDIRECT}` +
			`&state=${Math.floor(Math.random() * 90000) + 10000}` +
			'&scope=r_liteprofile,r_emailaddress', 'Linkedin Authentication', 600, 600, LINKEDIN_API_REDIRECT)
			.then((token: string) => {
				
				if (token) { this.props.onLogin(token) }
			})
	}
}