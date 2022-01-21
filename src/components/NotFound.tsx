import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

class NotFound extends React.Component<{}, {}> {
	public render() {
		return (
			<div className="page-not-found">
				<Helmet>
					<title>Hubbers - Hub of Makers</title>
				</Helmet>
				<div className="container">
					<div className="not-found__title">Oops!</div>
					<div className="not-found__subtitle">
						The page you are looking for was reinvented, innovated, and marketed, or yet to exist.<br/>
						Try our <Link to={'/'}>homepage</Link> instead!
					</div>
					<div className="not-found__graphic">
						<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/misc/not-found-2.png" alt="Not Found"/>
					</div>
				</div>
			</div>
		)
	}
}

export default NotFound