import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import ContestTile from '../components/ContestTile'
import HeroBanner from '../components/HeroBanner'

import { fetchContests } from '../actions/homepage'
import { ContestRecord } from '../constants/models'

import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { productCarousel } from '../constants/carouselSettings'
import { State as HomeContestListState } from '../reducers/homeContestsList'
import { RootState } from '../reducers/index'

const expertiseItems = require('../data/expertiseItems.json').items

interface Homepage1Props extends RouteComponentProps<any> {
	
}

class Homepage1 extends React.Component<Homepage1Props, {}> {
	public componentDidMount() {
		
	}

	public render() {

		return (
			<div>
				<Helmet>
					<title>Hubbfdgfdgers - Hub of Makers</title>
				</Helmet>
				<div className="newhomepage">
					<div className="container">
						{/* Start Banner */}
						<div className="banner">
							<div className="banner-inner">
								<img src="/assets/images/home_banner_bg.png" />
								<div className="banner-content">
									<h1>Don’t keep your best ideas for yourself</h1>
									<p>Share it and earn money, HBB token and royalties.</p>
									<div className="fromField" >
										<input type="text" placeholder='What type of work do you want done?' />
										<button type="submit">Get Started</button>
									</div>
									<div className="author">
										<h4>Mark Stuart</h4>
										<p>CEO, Enterprnr</p>
									</div>
								</div>
							</div>
						</div>
						{/* End Banner */}
					</div>

					{/* Start Hubber Community */}
						<div className="hubbers-community-content">
							<div className="hubbers-community-content-inner">
								<h2>Hubbers Community</h2>

								<div className="polygon-content image-content creators-and-designers">
									<img src="/assets/images/creators-and-designers.png" />
									<ul>
										<li>Industrial Designers</li>
										<li>Industrial Design Professors</li>
										<li>SMBs</li>
										<li>Innovation labs from MNC Fablabs &amp;</li>
										<li>Hackerspaces</li>
									</ul>
								</div>
								<div className="polygon-content content-image experts">
									<ul>
										<li>Freelancers</li>
										<li>Consultants</li>
										<li>Manufacturers</li>
										<li>Agencies</li>
									</ul>
									<img src="/assets/images/experts.png" />
								</div>
								<div className="polygon-content image-content contibutors">
									<img src="/assets/images/contributors.png" />
									<ul>
										<li>Product Investors</li>
										<li>Hardware VC/ accelerator</li>
										<li>Sales Channe</li>
									</ul>
								</div>
								<div className="grow-community">
									<div className="grow-community-inner">
										<img src="/assets/images/index-4.png" className="left-image" />
										<div className="grow-community-inner-content">
											<h2>How do we grow our community?</h2>
											<ul>
												<li>Social media marketing</li>
												<li>Hubbers Talks and Events, aimed at mushrooming the community.</li>
												<li>Providing valuable content with or Blog and Medium posts</li>
												<li>Incentivization through or Loyalty Programs</li>
												<li>Referral Programs</li>
												<li>Partnerships with Fablabs and Corporate Innovation Labs</li>
											</ul>
										</div>	
										<img src="/assets/images/index-5.png" className="right-image" />
									</div>
								</div>
							</div>
						</div>
					{/* End Hubber Community  */}

					<div className="subscribe">
						<div className="subscribe-inner">
							<h2>Join the Hubbers community!</h2>
							<h5>Invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua</h5>
							<div className="fromField" >
								<input type="text" placeholder='Enter your email' />
								<button type="submit">Subscribe Now</button>
							</div>
						</div>
					</div>
					
					{/* </div> */}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	
})

export default connect(mapStateToProps, {
	
})(Homepage1)