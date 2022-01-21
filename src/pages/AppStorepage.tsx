import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RootState } from '../reducers/index'

import HeroBanner from '../components/HeroBanner'

interface AppStoreProps {
}

class AppStorePage extends React.Component<AppStoreProps, {}> {
	
	public render() {
		
		return (
			<div className="appstore-page">
				<Helmet>
					<title>Get our APP | Hubbers - Hub of Makers</title>
				</Helmet>
				<HeroBanner
					bannerImage="/images/app_store_banner.png"
					title=""
					caption=""
					description=""
					cta={null}
					overlay={true}/>
				<div className="appstore-section">
					<div className="container">
						<div className="appstore-section-inner">
							<div className="appstore-section-inner-left">
								<div>
									<img src="/images/mobileimg.png"/>
								</div>
							</div>
							<div className="appstore-section-inner-right">
								<div className="inner-heading">
									<p className="inner-title">Great projects await!</p>
									<p className="inner-caption">Take Hubbers with you, wherever you go!
										An app created for inventors, creators,
										freelancers and investors.</p>
								</div>
								<div className="appstore-appimg_row">
									<div>
										<div className="appstore-appimg_item">
											<a
												href="https://itunes.apple.com/gb/app/hubbers-hub-of-makers/id1377168527"
												target="_blank" rel="nofollow"><img src="/images/appstore.png"/></a>
											
											<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/APP/Hubbers%20Get%20Our%20APP%20QR.png"
											     alt=""/>
										</div>
										<div className="appstore-appimg_item">
											<a href="https://play.google.com/store/apps/details?id=io.hubbers.app" target="_blank"
											   rel="nofollow">
												<img src="/images/google_plat_store.png"/>
											</a>
											<a href="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/APP/2.2.0/Hubbers-v2.2.0%2827%29.apk">
												Download APK
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({})

export default connect(mapStateToProps, {})(AppStorePage)