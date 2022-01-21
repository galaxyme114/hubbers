import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import HeroBanner from '../components/HeroBanner'

import { RootState } from '../reducers/index'

interface ExpertLandingProps extends RouteComponentProps<any> {
}

class ExpertLanding extends React.Component<ExpertLandingProps, {}> {
	public render() {
		return (
			<div className="page-expert-landing">
				<Helmet>
					<title>Become an Expert | Hubbers - Hub of Makers</title>
				</Helmet>
				<HeroBanner
					bannerImage="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/hero-banner-expert.jpg"
					title="EXPERTS"
					caption=""
					description={'Enjoy being involved in product development? <br/> ' +
					'Excited about seeing new products reaching consumers? <br/> ' +
					'Are you an expert in your field?'}
					cta={null}
					overlay={true}/>
				
				{/* Perks */}
				<div className="points-list">
					<div className="container">
						<div className="points-list__title">FOUR REASONS TO BECOME A HUBBERS EXPERT</div>
						<div className="points-list__items">
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-14.png"/>
								<div className="points-list__item__title">EARN MONEY</div>
								<div className="points-list__item__description">By offering advice and work on approved projects</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-15.png"/>
								<div className="points-list__item__title">VISIBILITY</div>
								<div className="points-list__item__description">Gain recognition and build your profile</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-16.png"/>
								<div className="points-list__item__title">JOIN A COMMUNITY</div>
								<div className="points-list__item__description">
									Mingle with like-minded people and find work opportunities
								</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-17.png"/>
								<div className="points-list__item__title">JOIN AS A JUDGE</div>
								<div className="points-list__item__description">Become a judge, benefit from your expertise</div>
							</div>
						</div>
					</div>
				</div>
				
				{/* HUBBERS Intro */}
				<div className="creative-hub">
					<div className="container">
						<div className="creative-hub__title">EXPERT TYPES</div>
						<div className="creative-hub__items">
							<div className="creative-hub__item">
								<div
									className="creative-hub__item__image"
									style={{
										backgroundImage: 'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/' +
											'tiles/become-a-creator.png)'
									}}/>
								<div className="creative-hub__item__caption">CONSULTANTS</div>
							</div>
							<div className="creative-hub__item">
								<div
									className="creative-hub__item__image"
									style={{
										backgroundImage: 'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/' +
											'tiles/become-an-expert.png)'
									}}/>
								<div className="creative-hub__item__caption">FREELANCERS</div>
							</div>
							<div className="creative-hub__item">
								<div
									className="creative-hub__item__image"
									style={{
										backgroundImage: 'url(https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/' +
											'tiles/become-an-investor.png)'
									}}/>
								<div className="creative-hub__item__caption">CORPORATE</div>
							</div>
						</div>
					</div>
				</div>
				
				{/* Expertise Fields */}
				<div id="expert-steps" className="points-list">
					<div className="container">
						<div className="points-list__title">
							JOIN HUNDREDS OF EXPERTS <br/> AND START WORKING ON VARIOUS PROJECTS!
						</div>
						<div className="points-list__items">
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-18.png"/>
								<div className="points-list__item__title points-list__item__title--sm">
									FIND PROJECTS OR TASKS YOU LIKE
								</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-19.png"/>
								<div className="points-list__item__title points-list__item__title--sm">
									FIND PROJECTS OR TASKS YOU LIKE
								</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-20.png"/>
								<div className="points-list__item__title points-list__item__title--sm">
									BID ON PROJECTS AND WIN
								</div>
							</div>
							<div className="points-list__item">
								<img
									className="points-list__item__image"
									src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/landing/perk-item-21.png"/>
								<div className="points-list__item__title points-list__item__title--sm">
									START WORKING AND START EARNING
								</div>
							</div>
						</div>
					</div>
				</div>
				
				{/* Become an Expert */}
				<HeroBanner
					bannerImage="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/home/banners/hero-image-expert.jpg"
					title="<small>BECOME AN EXPERT</small>"
					caption=""
					description=""
					onClick={() => {
						this.props.history.push('/signup/expert')
					}}
					cta="Sign up Now"
					overlay={true}/>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({})

export default connect(mapStateToProps, {})(ExpertLanding)