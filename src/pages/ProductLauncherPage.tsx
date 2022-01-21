import * as React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import HeroBanner from '../components/HeroBanner'
import ProductLauncher from '../containers/ProductLauncher'
import { RootState } from '../reducers/index'
import SmoothScroll from '../utils/smoothScroll'
import Testimonials from '../containers/Testimonials'

interface ProductLauncherPageProps {
}

class ProductLauncherPage extends React.Component<ProductLauncherPageProps, {}> {
	public render() {
		// Banner Data
		const initialCount: number = 30
		const referenceTime = 1520401336047
		const nowTime = new Date().getTime()
		const difference = Math.ceil((nowTime - referenceTime) / (3600000 * 2))
		
		return (
			<div>
				<Helmet>
					<title>Product Launcher | Hubbers - Hub of Makers</title>
				</Helmet>
				<HeroBanner
					bannerImage="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/pldt/hero-bg.jpg"
					title={'PRODUCT LAUNCHER QUIZ'}
					caption={(difference + initialCount) + ' product creators have tried it'}
					description={'Welcome to Hubbers Product Launch Assessment Tool! Fulfill 70% of the quiz and ' +
					'get closer to a great launch.'}
					cta="Get Started"
					onClick={() => new SmoothScroll(500).scrollTo('questionnaire', 60)}/>
				<ProductLauncher/>
				
				<div className="testimonials">
					<div className="container">
						<div className="testimonials__head">
							<h2 className="testimonials__title">TESTIMONIALS</h2>
							<h3 className="testimonials__subtitle">Users using the product launcher tools say</h3>
						</div>
						<Testimonials/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({})
export default connect(mapStateToProps, {})(ProductLauncherPage)