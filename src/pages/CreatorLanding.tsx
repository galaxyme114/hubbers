import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import HeroBanner from '../components/HeroBanner'

import { RootState } from '../reducers/index'

import Testimonials from '../containers/Testimonials'

interface CreatorLandingProps extends RouteComponentProps<any> {
}

class CreatorLanding extends React.Component<CreatorLandingProps, {}> {
	public render() {
		return (
			<div className="page-creator-landing">
				<Helmet>
					<title>Become a Creator | Hubbers - Hub of Makers</title>
				</Helmet>
				<HeroBanner
					bannerImage="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/home-banner-1.jpg"
					title="CREATORS"
					caption=""
					description="Got a great product idea? <br/> Or a design that is different from the rest of the market?"
					cta={null}
					overlay={true}/>
				
				{/* HUBBERS Intro */}
				<div className="creative-hub">
					<div className="container">
						<div className="creative-hub__title">HUBBERS</div>
						<div className="creative-hub__subtitle">a hub of makers are calling creators from all over the world.</div>
						<div className="creative-hub__items">
							<div className="creative-hub__item">
								<div
									className="creative-hub__item__image"
									style={{
										backgroundImage: 'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/' +
											'tiles/become-a-creator.png)'
									}}/>
								<div className="creative-hub__item__caption">Designer</div>
							</div>
							<div className="creative-hub__item">
								<div
									className="creative-hub__item__image"
									style={{
										backgroundImage: 'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/' +
											'tiles/become-an-expert.png)'
									}}/>
								<div className="creative-hub__item__caption">Investor</div>
							</div>
							<div className="creative-hub__item">
								<div
									className="creative-hub__item__image"
									style={{
										backgroundImage: 'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/' +
											'tiles/become-an-investor.png)'
									}}/>
								<div className="creative-hub__item__caption">Corporate</div>
							</div>
						</div>
					</div>
				</div>
				
				{/* Hubbers can help you */}
				<div id="hubbers-help" className="points-list">
					<div className="container">
						<div className="points-list__title">Hubbe.rs can help you</div>
						<div className="points-list__items">
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-5.png"/>
								<div className="points-list__item__description">
									Find experts and freelancers to help you create your product
								</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-6.png"/>
								<div className="points-list__item__description">
									Track the progress of your idea or product
								</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-7.png"/>
								<div className="points-list__item__description">
									Get funding and help with the project management
								</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-8.png"/>
								<div className="points-list__item__description">
									Join Hubbe.rs contest to create creative products
								</div>
							</div>
						</div>
					</div>
				</div>
				
				{/* Expert marketplace */}
				<div id="expert-marketplace" className="points-list">
					<div className="container">
						<div className="points-list__title">EXPERT MARKETPLACE</div>
						<div className="points-list__subtitle">
							Access a pool of talented and experienced professionals ready to work on your project.
						</div>
						<div className="points-list__items">
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-9.png"/>
								<div className="points-list__item__description">Browse Expert Marketplace</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-2.png"/>
								<div className="points-list__item__description">Choose experts or projects</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-3.png"/>
								<div className="points-list__item__description">Define the task</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-4.png"/>
								<div className="points-list__item__description">Agree on the price</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-4.png"/>
								<div className="points-list__item__description">Complete the task</div>
							</div>
						</div>
					</div>
				</div>
				
				{/* CTA */}
				<HeroBanner
					bannerImage="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/home-banner-2.jpg"
					title="<small>PRODUCT DEVELOPMENT MODULE</small>"
					caption=""
					description=""
					onClick={() => {
						this.props.history.push('/signup/creator')
					}}
					cta="Register and apply"
					overlay={true}/>
				
				{/* Testimonials */}
				<div className="testimonials-section">
					<div className="container">
						<div className="testimonials-section__title">Testimonials</div>
						<Testimonials/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({})

export default connect(mapStateToProps, {})(CreatorLanding)