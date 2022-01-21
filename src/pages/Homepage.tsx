import * as moment from 'moment'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import RazyLoad from 'react-lazyload'
import { fetchEvents } from '../actions/events'
import { fetchContests } from '../actions/homepage'
import ContestTile from '../components/ContestTile'
import { eventCarousel, ourPartnerCarousel, bannerSlideCarousel, expertiesCarousel } from '../constants/carouselSettings'
import { ContestRecord } from '../constants/models'

import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { RootState } from '../reducers'
import { State as EventsListState } from '../reducers/eventsList'
import { State as HomeContestListState } from '../reducers/homeContestsList'
import PublicProfileComponent from '../components/PublicProfileComponent'
import { fetchProfile } from '../actions/profile'
import { State as ProfileDataState } from '../reducers/profile'
import LazyLoad from 'react-lazyload'
const expertiseItems = require('../data/expertiseItems.json').items
let memberList = [{
	'thumbnailImageUrl': 'https://hubbers-api.s3-ap-northeast-1.amazonaws.com/RrK4ZU1rP.jpg',
	'fullName': 'Sedat Ozer',
	'address': '',
	'createdAt': 'November 14,2019',
	'_id': '5dcd49cc21285b00114d28d1'
},
{
	'thumbnailImageUrl': 'https://hubbers-us.oss-us-west-1.aliyuncs.com/H1jGGJHIS.jpg',
	'fullName': 'Marco Roversi',
	'address': '',
	'createdAt': 'November 3,2019',
	'_id': "5dbed784383e6800117d575f"
},
{
	'thumbnailImageUrl': 'https://hubbers-us.oss-us-west-1.aliyuncs.com/ByImpiMur.jpeg',
	'fullName': 'Shawn Xie',
	'address': 'China',
	'createdAt': 'November 3,2019',
	'_id': "5dbed784383e6800117d5772"
},
{
	'thumbnailImageUrl': 'https://hubbers-us.oss-us-west-1.aliyuncs.com/HkaMyRxLV.jpg',
	'fullName': 'Manfred Hall',
	'address': 'China',
	'createdAt': 'November 3,2019',
	'_id': "5dbed783383e6800117d56ca"
},
{
	'thumbnailImageUrl': 'https://hubbers-us.oss-us-west-1.aliyuncs.com/HyO9NEMOr.jpg',
	'fullName': 'N S Sunil Kumar',
	'address': 'India',
	'createdAt': 'November 3,2019',
	'_id': "5dbed782383e6800117d5694"
},
{
	'thumbnailImageUrl': 'https://hubbers-us.oss-us-west-1.aliyuncs.com/SkfQzb1Mr.jpg',
	'fullName': 'Mariano Viti',
	'address': '',
	'createdAt': 'November 3,2019',
	'_id': "5dbed782383e6800117d5681"
}]
interface HomepageProps extends RouteComponentProps<any> {
	stateContests: HomeContestListState
	fetchContests: any
	stateEvents: EventsListState
	fetchEvents: any
	stateProfile: ProfileDataState
	fetchProfile: any
}

interface HomepageState {
	work: string
	showPopover: boolean
	openedPopoverId: string
}

class Homepage extends React.Component<HomepageProps, HomepageState> {
	private eventsSlider: Slider
	private mainSlider: Slider
	private ourPartnerSlider: Slider
	private expertiesSlider: Slider
	
	public constructor(props: HomepageProps) {
		super(props)
		this.state = {
			work: '',
			showPopover: false,
			openedPopoverId: ''
		}
	}

	public componentDidMount() {
		this.props.fetchContests()
		this.props.fetchEvents()
		
		document.body.classList.add('is-homepage')
	}
	
	public componentWillUnmount() {
		document.body.classList.remove('is-homepage')
	}
	
	public render() {
		const {stateContests, stateEvents, stateProfile} = this.props
		const contestListData = []
		if (stateContests.contestsList.length >= 2) {
			for (let i = 0; i < 2; i++) {
				contestListData.push(
					stateContests.contestsList[i]
				)
			}
		} else {
			for (let i = 0; i < stateContests.contestsList.length; i++) {
				contestListData.push(
					stateContests.contestsList[i]
				)
			}
		}
		const eventListData = []
		if (stateEvents.eventsList) {
			if (stateEvents.eventsList.length >= 6) {
				for (let i = 0; i < 6; i++) {
					eventListData.push(
						stateEvents.eventsList[i]
					)
				}
			} else {
				for (let i = 0; i < stateEvents.eventsList.length; i++) {
					eventListData.push(
						stateEvents.eventsList[i]
					)
				}
			}
		}
		const expertiseData = []
		if (expertiseItems) {
			for (let i = 0; i < 8; i++) {
				expertiseData.push(
					expertiseItems[i]
				)
			}
		}
		const expertiseDataAgain = []
		if (expertiseItems) {
			for (let i = 8; i < 16; i++) {
				expertiseDataAgain.push(
					expertiseItems[i]
				)
			}
		}
		return (
			<div>
				<Helmet>
					<title>Hubbers - Hub of Makers</title>
				</Helmet>
				<div className = "top-slider-homepage">
					<Slider ref={element => this.mainSlider = element} {...bannerSlideCarousel}>
						<div className="top-section_best_ideas clearfix">
							<div className="container">
								<div className="top-section_best_ideas__inner">
									<div className="top-section_best_ideas__inner__left">
										<h2>Community-powered Hub to launch innovative products</h2>
										<p>Bridging the gap between product creators, experts and resources</p>
										<div className="type-of-work__field">
											<div className="type-of-work__field_label">Enter your email to stay updated</div>
											<div className="type-of-work__field_inner">
												<Input
													name="name"
													placeholder="Enter your email to get started ..."
													value={this.state.work}
													type={InputType.TEXT}
													onChange={(work: string) => {
														// this.setState({work})
													}}
												/>
												<button className="btn get-started-btn"> Submit</button>
											</div>
										</div>
									</div>
									<div className="top-section_best_ideas__inner__image">
									</div>
								</div>
							</div>
						</div>
						<div className="top-section_best_ideas clearfix">
							<div className="container">
								<div className="top-section_best_ideas__inner">
									<div className="top-section_best_ideas__inner__left">
										<h2>Access the right tools to launch your product</h2>
										<p>Bridging the gap between product creators, experts and resources</p>
										<div className="type-of-work__field">
											<div className="type-of-work__field_label">Enter your email to stay updated</div>
											<div className="type-of-work__field_inner">
												<Input
													name="name"
													placeholder="Enter your email to get started ..."
													value={this.state.work}
													type={InputType.TEXT}
													onChange={(work: string) => {
														// this.setState({work})
													}}
												/>
												<button className="btn get-started-btn"> Submit</button>
											</div>
										</div>
									</div>
									<div className="top-section_best_ideas__inner__image">
									</div>
								</div>
							</div>
						</div>
						<div className="top-section_best_ideas clearfix">
							<div className="container">
								<div className="top-section_best_ideas__inner">
									<div className="top-section_best_ideas__inner__left">
										<h2>Access the right tools to launch your product</h2>
										<p>Bridging the gap between product creators, experts and resources</p>
										<div className="type-of-work__field">
											<div className="type-of-work__field_label">Enter your email to stay updated</div>
											<div className="type-of-work__field_inner">
												<Input
													name="name"
													placeholder="Enter your email to get started ..."
													value={this.state.work}
													type={InputType.TEXT}
													onChange={(work: string) => {
														// this.setState({work})
													}}
												/>
												<button className="btn get-started-btn"> Submit</button>
											</div>
										</div>
									</div>
									<div className="top-section_best_ideas__inner__image">
									</div>
								</div>
							</div>
						</div>
						<div className="top-section_best_ideas clearfix">
							<div className="container">
								<div className="top-section_best_ideas__inner">
									<div className="top-section_best_ideas__inner__left">
										<h2>Access the right tools to launch your product</h2>
										<p>Bridging the gap between product creators, experts and resources</p>
										<div className="type-of-work__field">
											<div className="type-of-work__field_label">Enter your email to stay updated</div>
											<div className="type-of-work__field_inner">
												<Input
													name="name"
													placeholder="Enter your email to get started ..."
													value={this.state.work}
													type={InputType.TEXT}
													onChange={(work: string) => {
														// this.setState({work})
													}}
												/>
												<button className="btn get-started-btn"> Submit</button>
											</div>
										</div>
									</div>
									<div className="top-section_best_ideas__inner__image">
									</div>
								</div>
							</div>
						</div>
						<div className="top-section_best_ideas clearfix">
							<div className="container">
								<div className="top-section_best_ideas__inner">
									<div className="top-section_best_ideas__inner__left">
										<h2>Access the right tools to launch your product</h2>
										<p>Bridging the gap between product creators, experts and resources</p>
										<div className="type-of-work__field">
											<div className="type-of-work__field_label">Enter your email to stay updated</div>
											<div className="type-of-work__field_inner">
												<Input
													name="name"
													placeholder="Enter your email to get started ..."
													value={this.state.work}
													type={InputType.TEXT}
													onChange={(work: string) => {
														// this.setState({work})
													}}
												/>
												<button className="btn get-started-btn"> Submit</button>
											</div>
										</div>
									</div>
									<div className="top-section_best_ideas__inner__image">
										{/* <img src="/images/home-page-images/banner-img.png" alt="" /> */}
									</div>
								</div>
							</div>
						</div>
					</Slider>
				</div>
				<div className="creator_section">
					<div className="container">
						<div className="creator_section__inner">
							<div className = "first__section_heading_main">
								<h2 className = "title">You have an innovative product ready to be launched?</h2>
								<p className = "caption">Get Hubbers community of creators, experts and contributors to help you design it, prototype it and launch it</p>
							</div>
							<div className="first__section">
								<img srcSet="/images/webp/index_first_image.webp" src="/images/index_first_image.png"/>
								
								<div className="first__section__inner left">
									<h2>Individual Creator?</h2>
									<h4>Find mentoring, experts and financial resources for your product lounch </h4>
									<div className="platform_btns">
										<Link to="/accelerator-program">
											<button type="button">Enter the accelerator program</button>
										</Link>
									</div>
									{/* <h5>Joining the Hubbers Accelerator program providers the following benefits to our creators:</h5> */}
								</div>
								<ul className="list_item">
									<li> Access to all of the product development modules</li>
									<li> Onboard a “Super Expert” as your mentor as well as your project manager to lead and support your
										creator journey from ideation to launching your product/ business.
									</li>
									<li> Get the opportunity to connect with investors and find the financial resources that you need to
										complete your project.
									</li>
									<li> Gain access to the worldwide Hubbers community; hire experts from all over the world in the area
										of expertise you need.
									</li>
									<li> Create in an efficient, collaborative, and resourceful space.</li>
									<li className="work__fast__list"> Work fast, lean and crowd source your project.</li>
								</ul>
							</div>
							<div className="first__section">
								<img className="second_item" srcSet="/images/webp/index_second_image.webp" src="/images/index_second_image.png"/>
								<div className="first__section__inner">
									<h2>Business or Creator Looking For Expertise?</h2>
									<h4>Find experts and get acces to our collaborative tools</h4>
									<div className="platform_btns">
										<Link to="/my-desk">
											<button className="access_hub_platform_btn">Access to Hubbers platform</button>
										</Link>
									</div>
									{/* <h5>Benefits of joining the Hubbers platform:</h5> */}
								</div>
								<ul className="list_item">
									<li> Work though a wide range of modules especially designed to cover all aspects of the product
										development and creator journey
									</li>
									<li> Work in an efficient, collaborative, and resourceful space.</li>
									<li> Gain access to the worldwide Hubbers community and find the experts your project needs.</li>
									<li> Connect with rising stars, find new product ideas, and meet talented creators from all over the
										world.
									</li>
									<li> Keep up with international market and benefit from the wide variety of resources.</li>
									<li> Work and create fast, lean, and efficiently.</li>
								</ul>
							</div>
						</div>
						{/* <div className="row__type">
							<div className="first__section">
								<img src="/images/index_first_image.png" />

								<div className="first__section__inner">
									<h2>Are you a Creator?</h2>
									<h4>Are you looking for financial resources for your product launch?</h4>

									<button type="button">Enter accelerator program</button>
									<h5>Joining the Hubbers Accelerator program providers the following benefits to our creators:</h5>
								</div>
								<ul className="list_item">
									<li> Access to all of the product development modules</li>
									<li> Onboard a “Super Expert” as your mentor as well as your project manager to lead and support your creator journey from ideation to launching your product/ business.</li>
									<li> Get the opportunity to connect with investors and find the financial resources that you need to complete your project.</li>
									<li> Gain access to the worldwide Hubbers community; hire experts from all over the world in the area of expertise you need.</li>
									<li> Create in an efficient, collaborative, and resourceful space.</li>
									<li className="work__fast__list"> Work fast, lean and crowd source your project.</li>
								</ul>
							</div>
							<div className="first__section">
								<img className="second_item" src="/images/index_second_image.png" />
								<div className="first__section__inner">
									<h2>Business or Creator Looking For Expertise?</h2>
									<button className="second__button__right" type="button">Access to Hubbers platform</button>
									<h5>Benefits of joining the Hubbers platform:</h5>
								</div>
								<ul className="list_item">
									<li> Work though a wide range of modules especially designed to cover all aspects of the product development and creator journey</li>
									<li> Work in an efficient, collaborative, and resourceful space.</li>
									<li> Gain access to the worldwide Hubbers community and find the experts your project needs.</li>
									<li> Connect with rising stars, find new product ideas, and meet talented creators from all over the world.</li>
									<li> Keep up with international market and benefit from the wide variety of resources.</li>
									<li> Work and create fast, lean, and efficiently.</li>
								</ul>
							</div>
						</div> */}
						{/* <div className="row__type">
						  <div className="first__section">
								<img className="second_item" src="/images/index_second_image.png" />
								<div className="first__section__inner">
									<h2>Business or Creator Looking For Expertise?</h2>
									<button className="second__button__right" type="button">Access to Hubbers platform</button>
									<h5>Benefits of joining the Hubbers platform:</h5>
								</div>
								<ul className="list_item">
									<li> Work though a wide range of modules especially designed to cover all aspects of the product development and creator journey</li>
									<li> Work in an efficient, collaborative, and resourceful space.</li>
									<li> Gain access to the worldwide Hubbers community and find the experts your project needs.</li>
									<li> Connect with rising stars, find new product ideas, and meet talented creators from all over the world.</li>
									<li> Keep up with international market and benefit from the wide variety of resources.</li>
									<li> Work and create fast, lean, and efficiently.</li>
								</ul>
							</div>
						</div> */}
					</div>
				</div>
				<div className="co-create-hubbers-community">
					<div className="co-create-hubbers-community-header">
						<div className="container">
							<div className="co-create-hubbers-community-header-back">
								<div className="co-create-hubbers-community-header_content">
									<div className="title">Co-create with Hubbers community</div>
								</div>
							</div>
						</div>
					</div>
					<div className="co-create-hubbers-community-content">
						<div className="container">
							<div className="co-create-hubbers-community-content__inner">
								<div className="co-create-hubbers-community_ideate">
									<div className="co-create-hubbers-community_ideate_item">
										{/* <img srcSet="/images/home-page-images/webp/ideate_icon_img.webp" src="/images/home-page-images/ideate_icon_img.png" /> */}
										<div className="co-create-hubbers-community_ideate_item_icon_1"></div>
										<div className="title">Ideate</div>
									</div>
									<div className="co-create-hubbers-community_ideate_item">
										{/* <img srcSet="/images/home-page-images/webp/design_icon_img.webp" src="/images/home-page-images/design_icon_img.png" /> */}
										<div className="co-create-hubbers-community_ideate_item_icon_2"></div>
										<div className="title">Design</div>
									</div>
									<div className="co-create-hubbers-community_ideate_item">
										{/* <img srcSet="/images/home-page-images/webp/make_icon_img.webp" src="/images/home-page-images/make_icon_img.png" /> */}
										<div className="co-create-hubbers-community_ideate_item_icon_3"></div>
										<div className="title">Make</div>
									</div>
								</div>
								<div className="co-create-hubbers-community_info">
									<div>Co-create with our community of 15000 innovators, industrial designers, makers, inventors and innovation experts from 35 countries.</div>
								</div>
								<div className="co-create-hubbers-community_content">
									<div className="co-create-hubbers-community_content_items">
										<div className="co-create-hubbers-community_content_item">
											
											<img srcSet="/images/home-page-images/webp/create-community_icon_one.webp" src="/images/home-page-images/create-community_icon_one.png" alt="" />
											<div className="right_content">
												<div>
													Get new product ideas, product functionalites and user experience
												</div>
											</div>
										</div>
										<div className="co-create-hubbers-community_content_item">
											
											<img srcSet="/images/home-page-images/webp/create-community_icon_two.webp" src="/images/home-page-images/create-community_icon_two.png" alt="" />
											<div className="right_content">
												<div>
													Crowdsource design through product contest
												</div>
											</div>
										</div>
										<div className="co-create-hubbers-community_content_item">
											
											<img srcSet="/images/home-page-images/webp/create-community_icon_three.webp" src="/images/home-page-images/create-community_icon_three.png" alt="" />
											<div className="right_content">
												<div>
												Prototype and implement with a network of 2000 agile experts in product development
												</div>
											</div>
										</div>
										<div className="co-create-hubbers-community_content_item">
											
											<img srcSet="/images/home-page-images/webp/create-community_icon_four.webp" src="/images/home-page-images/create-community_icon_four.png" alt="" />
											<div className="right_content">
												<div>
													Communicate your innovation value to a powerful community of global designers, creators and influencers
												</div>
											</div>
										</div>
									</div>
									<div className="co-create-hubbers-community_get-in-touch">
										<button className="btn">Get in touch with us</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				
				{/* <div className="angle_images_text clearfix">
					<div className="container">
						<div className="green_angle_hackathon">
							<div className="green_angle_hackathon__inner">
								<h2>Hackathon</h2>
								<p>Boost your Hardware product development with a Hubbers Hackathon!</p>
							</div>
						</div>
						
						<div className="right__text__first__angle">
							<p>Hubbers, the hub of makers, bridges product creators with
								experts and resources, to bring the most innovative products
								to the market through a cloud-based & blockchain- powered platform.</p>
							
							<p>Hubbers Hackathon is a combination of an offline two
								day innovation day followed by an online product competition
								aimed at generating innovative product ideas along with conceptual
								designs from our worldwide design talent pool.</p>
						</div>
					
					</div>
					
					<div className="container">
						<div className="second__angle__item clearfix">
							
							<div className="first__item">
								<div className="first__item__inner">
									<h2>Packages</h2>
									<ul>
										<li>Two-days design thinking session with designers and industry professionals from the extensive
											Hubbers talent pool
										</li>
										<li>A 30-day online product competition on conceptual design from designers worldwide.</li>
									</ul>
								</div>
							</div>
							
							<div className="second__item">
								<div className="second__item__inner">
									<h2>Goals</h2>
									<ul>
										<li>Gain insight and discover fresh design options for your next product launch.</li>
										<li>Grow your network by connecting with top designers and industry professionals.</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div> */}
				
				{/* <div className="community__section  clearfix">
					<div className="container community__section_inner">
						<h2>Community</h2>
						<div className="consultent__section-row">
							<div className="consultent__section">
								<div className="left_img_section">
									<img src="/images/community__first_image.png"/>
									<div className="left_img_section_count">15</div>
								</div>
								
								<p> CONSULTANTS IN INNOVATIONS </p>
							</div>
							
							<div className="consultent__section">
								<div className="left_img_section">
									<img src="/images/community__second_image.png"/>
									<div className="left_img_section_count">1500</div>
								</div>
								<p>INDUSTRIAL DESIGNERS</p>
							</div>
							
							<div className="consultent__section">
								<div className="left_img_section">
									<img src="/images/community__third_image.png"/>
									<div className="left_img_section_count">1500</div>
								</div>
								<p>EXPERTS IN PRODUCT DEVELOPEMENT</p>
							</div>
							
							<div className="consultent__section">
								<div className="left_img_section">
									<img src="/images/community__four_image.png"/>
									<div className="left_img_section_count">15</div>
								</div>
								<p>CITIES WORLDWIDE</p>
							</div>
						</div>
					</div>
				</div> */}
				
				{/* <div className="price__section">
					
					<div className="container">
						<div className="price">
							<h2>Cost <img src="/images/right__arrow__dot.png"/></h2>
						</div>
						
						<div className="price">
							<div className="title">Hackathon</div>
							<p>Start form</p>
							<h3>$ 5,000</h3>
						</div>
						
						<div className="price">
							<div className="title">Hackathon + Product</div>
							<p>Start form</p>
							<h3>$ 10,000</h3>
						</div>
					</div>
				
				</div> */}
				{/* <div className = "contant-thumps-up">
					<div className= "container">
						<div className = "contant-thumps-up__inner">
							<div className = "image-thumps-up">
								<img src="/images/thumb-up-bg.png" />
							</div>
							<div className = "second-section">
								<p>bsdhvdhsadjh</p>
							</div>
						</div>
					</div>

				</div> */}
				
				<div className="hubbers-community">
					<div className="container">
						<div className="hubbers-community__inner">
							<div className="hubbers-community__inner_header">
								<div className="title">Hubber Community</div>
								<div className="caption">1200 product creators helped by 1300 experts and 135 contributors to
									launch new products. Be part of your Hubbers community.</div>
							</div>
							<div className="hubbers-community__inner_feature">
								<div className="hubbers-community__inner_feature_title">Community Features List</div>
								<div className="hubbers-community__inner_feature_items">
									<div className="hubbers-community__inner_feature_items_item">
										<img srcSet="/images/home-page-images/webp/community_feature_icon_one.webp" src="/images/home-page-images/community_feature_icon_one.png" alt=""/>
										<div className="right_content">
											<div>
												Share your knowledge on product creation product development
											</div>
										</div>
									</div>
									<div className="hubbers-community__inner_feature_items_item">
										<img srcSet="/images/home-page-images/webp/community_feature_icon_two.webp" src="/images/home-page-images/community_feature_icon_two.png" alt=""/>
										<div className="right_content">
											<div>
											Learn from others through events, Webinars and products development.
											</div>
										</div>
									</div>
									<div className="hubbers-community__inner_feature_items_item">
										<img srcSet="/images/home-page-images/webp/community_feature_icon_three.webp" src="/images/home-page-images/community_feature_icon_three.png" alt=""/>
										<div className="right_content">
											<div>
											Mingle with people that have common interest in making projects come to the market
											</div>
										</div>
									</div>
									<div className="hubbers-community__inner_feature_items_item">
										<img srcSet="/images/home-page-images/webp/community_feature_icon_four.webp" src="/images/home-page-images/community_feature_icon_four.png" alt=""/>
										<div className="right_content">
											<div>
												Be rewarded as an active member of Hubbers with <span> HBB comunity points.</span>
											</div>
										</div>
									</div>
								</div>
								<div className="hubbers_com_locations">
									<img srcSet="/images/home-page-images/webp/hubber-comunities.webp" src="/images/home-page-images/hubber-comunities.png" alt=""/>
									<div className="hubbers_com_addesses">
										Find your Hubbers community in
										Shanghai, Singapore, Paris,
										Berlin, Seoul and many other Cities.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<LazyLoad once>
					<div className="thumbup-section">
						<div className="thumbup-section-header">
							<div className="container">
								<div className="thumbup-section-header-back">
									<div className="thumbup-section-header_content">
										<div className="title">Thumb up!...</div>
										<div className="caption">They just joined us.</div>
									</div>
								</div>
							</div>
						</div>
						<div className="container">
							<div className="thumbup-section__inner">
								<div className="thumbup-section__inner_items">
									{
										memberList.map((op: any, i: number) => (
											<div className="thumbup-section__inner_item" key={i} >
												<div className="thumbnail-box" onMouseEnter={() => this.toggleHover(op, op._id)}>
													<img src={op.thumbnailImageUrl} alt="" />
												</div>
												<div className="title">{op.fullName}</div>
												<div className="caption">{op.address}</div>
												<div className="date">{op.createdAt}</div>
												{
													(this.state.showPopover) && (this.state.openedPopoverId === op._id) &&
													<div className="profile-popover" onMouseLeave={() => this.handleMouseLeave()}>
														<PublicProfileComponent profileDetail={stateProfile.profile} stateProfile={stateProfile.status}  />
													</div>
												}
											</div>
										))
									}
								</div>
								
								<div className="thumbup-section__inner_bottom">
									<div className="title">Jump in and start participating in</div>
									<div className="title">events, discussion, works.</div>
								</div>
								<div className="thumbup-section__inner_bottom_btn">
									<button className="btn">Jump in</button>
								</div>
							</div>
						</div>
					</div>
				</LazyLoad>
				
				<LazyLoad once>					
					<div className="contest-list">
						<div className="contest-list-header">
							<div className="container">
								<div className="contest-list-header-back">
									<div className="contest-list-header_content">
										<div className="title">Ongoing Product competition</div>
										<div className="caption">put your creativity in motion.Each cash and gain visibilty With our product design competition</div>
									</div>
								</div>
							</div>
							
						</div>
						<div className="container">
							
							{
								stateContests.status === ActionTypeStates.INPROGRESS && (
									<div className="page-loading">
										<div>
											<em>Loading ...</em>
											<Spinner name="three-dots" fadeIn="none"/>
										</div>
									</div>
								)
							}
							{
								stateContests.status !== ActionTypeStates.INPROGRESS && (
									<div>
										
										<div className="contest-list__items">
											{
												contestListData.map((c: ContestRecord) => (
													<ContestTile key={c._id} {...c} />
												))
											}
										</div>
									</div>
								)
							}
							{/* <div className="view__all__ongoing">
								<Link to={'/contests'}>View all ongoing contests</Link>
							
							</div> */}
						</div>
					</div>
				</LazyLoad>
				<div className="marketplace-list">
					<div className="container">
						<div className="marketplace-list__title">Expert Market place</div>
						<div className="marketplace-list__caption">All great project need great experts</div>
						<div className="e_market_list">
							<div className="e_market_list_item">
								<img srcSet="/images/home-page-images/webp/create-community_icon_one.webp" src="/images/home-page-images/create-community_icon_one.png" />
								<div className="txt_expert">
									<p>Find the right vetted</p>
									<p>& tested experts</p>
									<p>to launch your products</p>
								</div>
							</div>
							<div className="e_market_list_item">
								<img srcSet="/images/home-page-images/webp/create-community_icon_two.webp" src="/images/home-page-images/create-community_icon_two.png" />
								<div className="txt_expert">
									<p>Collaborate on great</p>
									<p>products launch</p>
								</div>
							</div>
							<div className="e_market_list_item">
								<img srcSet="/images/home-page-images/webp/create-community_icon_three.webp" src="/images/home-page-images/create-community_icon_three.png" />
								<div className="txt_expert">
									<p>cover all area of your</p>
									<p>product development</p>
								</div>
						
							</div>
						</div>
						<LazyLoad once>
							<div className="marketplace-list__items">
								<Slider ref={element => this.expertiesSlider = element} {...expertiesCarousel}>
									<div>
									{
										expertiseData.map((e: any, i: number) => (
											<div className="marketplace-list__item" key={i}>
												<Link to={'/expert-marketplace/' + e.slug}>
													<div className="marketplace-list__item__icon"><img src={e.icon}/></div>
													<div className="marketplace-list__item__title">{e.name}</div>
													<div className="marketplace-list__item__description">{e.description}</div>
												</Link>
											</div>
										))
									}
									</div>
									<div>
										{
											expertiseDataAgain.map((e: any, i: number) => (
												<div className="marketplace-list__item" key={i}>
													<Link to={'/expert-marketplace/' + e.slug}>
														<div className="marketplace-list__item__icon"><img src={e.icon}/></div>
														<div className="marketplace-list__item__title">{e.name}</div>
														<div className="marketplace-list__item__description">{e.description}</div>
													</Link>
												</div>
											))
										}
									</div>
								</Slider>
							</div>
						</LazyLoad>
						<div className="find-expert-skill">
							<div className="find-expert-skill_items">
								<div className="find-expert-skill_item">
									<img srcSet="/images/home-page-images/webp/find-project_icon.webp" src="/images/home-page-images/find-project_icon.png"/>
									<Link to="/expert-marketplace">
										<button className="btn btn-market-btn">Find an expert for my project</button>
									</Link>
								</div>
								<div className="find-expert-skill_item">
									<img srcSet="/images/home-page-images/webp/find-project_icon1.webp " src="/images/home-page-images/find-project_icon1.png"/>
									<Link to="/become-an-expert">
										<button className="btn btn-market-btn">Put my skills in projects</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<LazyLoad once>
				<div className="event-list">
					<div className="container">
						<div className="event-list__title">All Events</div>
						{
							(stateEvents.status === ActionTypeStates.INPROGRESS) && (
								<div className="page-loading">
									<div>
										<em>Loading ...</em>
										<Spinner name="three-dots" fadeIn="none"/>
									</div>
								</div>
							)
						}
						<div className="event-list__items">
							<Slider ref={element => this.eventsSlider = element} {...eventCarousel}>
								{
									(eventListData.length > 0) && eventListData.map((op: any, i: number) =>
										
										<div className="event-list__item" key={i}>
											<Link to={'/events/' + op.shortId + '/' + op.slug}>
												{/* <img className="event_img" src={op.countryImage} /> */}
												<div className="event_img" style={{backgroundImage: `url(${op.countryImage})`}}></div>
												<div className="event_list_content">
													<div className="event_list_title">{op.name}</div>
													<div className="event_list_date-location">
														<div className="event_list_date">
															<img src="/images/calender_icon.png"/>
															<span>{moment(op.date).format('LL')}</span>
														</div>
														<div className="event_list_date">
															<img src="/icons/map-localization.svg"/>
															<span>{op.country}</span>
														</div>
													</div>
												</div>
											</Link>
										</div>
									)
								}
							
							</Slider>
						</div>
					</div>
				</div>
				</LazyLoad>
				<div className="partner-list">
					<div className="container">
						<div className="partner-list__title">Our Partners</div>
						<div className="partner-list__items">
							<Slider ref={element => this.ourPartnerSlider = element} {...ourPartnerCarousel}>
								
								<div className="partner-list__item">
									<img className="partner_img"  srcSet="/images/our-partners/partner4.webp" src="/images/our-partners/partner4.png"/>
									<div className="partner_img_caption">Komaspec</div>
								</div>
								<div className="partner-list__item">
									<img className="partner_img" srcSet="/images/our-partners/wework-labs-logo.webp" src="/images/our-partners/wework-labs-logo.png"/>
									<div className="partner_img_caption">WeWork Labs</div>
								</div>
								{/*<div className="partner-list__item">*/}
								{/*<img className="partner_img" src="/images/our-partners/partner1.png" />*/}
								{/*<div className="partner_img_caption">Workspace</div>*/}
								{/*</div>*/}
								{/*<div className="partner-list__item">*/}
								{/*<img className="partner_img" src="/images/our-partners/partner2.png" />*/}
								{/*<div className="partner_img_caption">Confluences</div>*/}
								{/*</div>*/}
								{/*<div className="partner-list__item">*/}
								{/*<img className="partner_img" src="/images/our-partners/xavor-logo.png" />*/}
								{/*<div className="partner_img_caption">Xavor</div>*/}
								{/*</div>*/}
							</Slider>
						</div>
					</div>
				</div>
			</div>
		)
	}

	private toggleHover(data: any, popoverId: string) {
		this.setState({
			showPopover: true,
			openedPopoverId: popoverId
		})
		this.props.fetchProfile(data._id)
		// document.body.classList.add(`show-public-profile-modal`)
	}
	private handleMouseLeave() {
		this.setState({
			showPopover: false
		})
	}
}

const mapStateToProps = (state: RootState) => ({
	stateContests: state.homeContestsList,
	stateEvents: state.eventsList,
	stateProfile: state.profile
})

export default connect(mapStateToProps, {
	fetchContests,
	fetchEvents,
	fetchProfile
})(Homepage)