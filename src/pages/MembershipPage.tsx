import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RootState } from '../reducers/index'
import LineTo from 'react-lineto';
import {Container, Row, Col, Image, Table} from 'react-bootstrap';

const mindsets = [
    { 'title': 'Creative mindset', 'text': 'You like progress in tech and want to accompany it by bringing your knowledge and ideas on what.' },
    { 'title': 'Collaborative mindset', 'text': 'If you can earn money while having fun with greart people it is even better.' },
    { 'title': 'Positivce mindset', 'text': 'If you can earn money while having fun with greart people it is even better.' }
]

const glanceScores = [
	{ 'score': '5400', 'label': 'creators' },
	{ 'score': '1500', 'label': 'experts' },
	{ 'score': '1600', 'label': 'contributors' },
	{ 'score': '48', 'label': 'lifetime members and investors' },
	{ 'score': '15', 'label': 'hubs having activities' }
]

class MembershipPage extends React.Component {
    state = {
		membershipItems: [
			{ option: 'Community City', freeCase: '2 cities', lifetimeCase: '8 cities' },
			{ option: 'Invitations', freeCase: 'Free or paid', lifetimeCase: 'Free & priority booking' },
			{ option: 'Webinars', freeCase: 'Free or paid', lifetimeCase: 'all recording webinars for free' },
			{ option: 'Token holder badge', freeCase: 'No', lifetimeCase: 'Yes' },
			{ option: 'Observers/investor newslette', freeCase: '', lifetimeCase: '' },
			{ option: 'HBB loyalty program', freeCase: 'Get started loyalty points', lifetimeCase: 'Redeem 1.5 times more points' },
			{ option: 'Expert market placer', freeCase: '', lifetimeCase: '' },
			{ option: 'Freelancer side', freeCase: 'Standart listing', lifetimeCase: 'Priority listing as expers' },
			{ option: 'Employer side', freeCase: 'Standart commission', lifetimeCase: 'Employers discount' },
			{ option: 'Projects', freeCase: '', lifetimeCase: '' },
			{ option: 'Project Investments', freeCase: 'Access new projects', lifetimeCase: 'Priority on new projects' },
			{ option: 'Hubbers Goverance', freeCase: '', lifetimeCase: '' },
			{ option: 'HBS token', freeCase: '', lifetimeCase: '1000 HBS converted at exchange listing time' },
			{ option: 'Hubbers monthly workshop', freeCase: 'No', lifetimeCase: 'can be part 2' },
			{ option: 'Observers', freeCase: 'No', lifetimeCase: 'Yes' },
			{ option: 'Content', freeCase: 'No', lifetimeCase: 'from our marketing team' }
		],

		goodReasonTexts: [
			{ text: 'Lifetime members brainstorm on Hubbers stratefy implementation' },
			{ text: 'Lifetime members give your thoughts on what is coming next in Hubbers?' },
			{ text: 'Lifetime members participate in great discussion in implementing community and tools' },
			{ text: 'Lifetime members are with like-minded extrapreneurs and networks from our marketing team' },
			{ text: 'Life time members increase the value of their future tokens.' }
		]
	}

    public componentDidMount() {	
		document.body.classList.add('is-homepage')
	}
	
	public componentWillUnmount() {
		document.body.classList.remove('is-homepage')
    }
    
    render() {
        return (
            <React.Fragment>
                <Helmet>
					<title>Membership - Hub of Makers</title>
				</Helmet>
				<Container className = "m-top-container" fluid>
					<Row className="justify-content-center">
						<Col lg="4" md="6" sm="12">
							<div className = "m-top-content">
								<h2>Individual Membership</h2>
								<p>Hubbers community members</p>
								<div className = "m-top-btn-wrap">
									<button className = "btn m-top-btn rounded-pill">Apply Now</button>
								</div>
							</div>
						</Col>
						<Col lg="5" md="6" sm="12">
							<div className = "m-top-banner">
							</div>
						</Col>
					</Row>
				</Container>

                <div className = "m-lifetime-container">
					<div className = "m-lifetime-header">
						<div className = "title-wrap">
							<div className = "title">Hubbers lifetime membership</div>
						</div>
					</div>
					<Container fluid>
						<Row className="justify-content-center">
							<Col lg = "5" className = "text-center">
								<Image src = "/images/membership-page-images/lifetime-img.png" fluid/>
							</Col>
							<Col lg = "6">
								<div className = "m-lifetime-content">
									<p>If you are creators, experts and investors in product development, you can signup members for FREE members of Hubbers and have access to a  lot of free resources, tutorials and expand your network in the global product development acosystems.</p>
									<p>If you want to upgrade to a Lifetime Hubbers Members and become a stakeholder of Hubbers and grow with the community, feel free to join us.</p>
									<h3>Apply if you match</h3>
								</div>
							</Col>
						</Row>
					</Container>
					<div className="m-mindset-icon-gallery">
						{
							mindsets.map((mindset, index) => (
								<div className="m-mindset-icon">
									<img src={"/images/membership-page-images/mindset-icon-" + (index + 1) + ".png"} alt="" />
									<div className="mindset-text-wrap">
									<div>
										<h3>{ mindset.title }</h3>
										<p>{ mindset.text }</p>
										</div>
									</div>
								</div>
							))
						}
					</div>
					<div className="m-experience">
						<div className="content-wrap">
							<h3>Collaborative spirit and love sharing experiences.</h3>
							<Image src="/images/membership-page-images/blank.png" fluid />
						</div>
					</div>
				</div>
				<div className="m-hubbers-community">
					<Container fluid>
						<div className="m-hubbers-community-title">
							<h2>What is Hubbers community?</h2>
						</div>
						<Row>
							<Col sm="6" xs="12">
								<div className="m-hubbers-community-block-1">
									<img src="/images/membership-page-images/hubber-community-image-1.png" />
									<div className="block-1-content">
										<p>Hubbers offers help to create and launch innovative products on the market; we assist in planning, design, project managment and production through a cloud-based, blockchain-powered online platform and mobile app”.</p>
									</div>
								</div>
							</Col>
							<Col sm="6" xs="12">
								<div className="m-hubbers-community-block-2">
									<img src="/images/membership-page-images/hubber-community-image-2.png" />
									<div className="block-2-content">
										<p>Hubbers,hub of makers is “an online HUB where individuals and companies co-create. It is also an offline community where people meet, share ideas, help and inspire each other. We provide opportunity and rich platform to creative inds to connect and combine valuable skills and resources.</p>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
				
				<div className="m-hubbers-glance">
					<div className = "m-glance-header">
						<div className = "title-wrap">
							<div className = "title">Hubbers at glance?</div>
						</div>
					</div>
					<Container fluid className="m-glance-score-block">
						<Row>
							{
								glanceScores.map((item) => (
									<Col>
										<div className="m-glance-score">
											<h2>{ item.score }</h2>
											<p>{ item.label }</p>
										</div>
									</Col>
								))
							}
						</Row>
					</Container>
					<div className="hubbers-glance-map">
						<img src="/images/membership-page-images/hubber-glance-map.png" />
					</div>
				</div>

				<div className="m-hubbers-benefits">
					<div className="m-hubbers-benefits-title">
						<h2>Benefits of Hubbers individual membership VS Free membership</h2>
						<p>Most of the tools on Hubbers are free to use.</p>
						<p>For members who want to be part of the core engine, you have the possibility to apply.</p>
					</div>
					<div className="m-hubbers-benefits-table">
						<Table responsive>
							<thead>
								<tr>
									<th></th>
									<th>Free membership</th>
									<th>Lifetime membership*</th>
								</tr>
							</thead>
							<tbody>
								{this.state.membershipItems.map((item)=> (
									<tr>
										<td>{item.option}</td>
										<td>{item.freeCase}</td>
										<td>{item.lifetimeCase}</td>
									</tr>
								))}
							</tbody>
							<tfoot>
								<tr>
									<td>Price</td>
									<td>Free</td>
									<td>USD 1000</td>
								</tr>
							</tfoot>
						</Table>
					</div>
					<div className="text-center mt-2" style={{ fontFamily:'Avenir-Black'}}>
						<p>*apply to the first 100. Conditions may change later on after the first 100.</p>
					</div>
				</div>

				<div className="m-good-reason">
					<div className="m-good-reason-title">
						<h2>5 good reasons to become a lifetime members.</h2>
						<p>Hubbers lifetime member are key drivers in what is being built and how we are building it worldwide.</p>
					</div>
					<Container fluid>
						<Row className="justify-content-center">
							<Col md="5">
                                <div className="m-good-reason-img">
                                    <img src="/images/membership-page-images/good-reason-img.png" />
                                </div>
							</Col>
							<Col md="7">
								<div className="m-good-reason-text">
									<ul>
										{ this.state.goodReasonTexts.map((reason, i) => (
											<li><span>{ i+1 }</span><div>{ reason.text }</div></li>
										))}
										<a href="">Know more</a>
									</ul>
								</div>

                            </Col>
						</Row>
					</Container>
				</div>
				<div className="m-hubbers-workshop">
					<div className="m-hubbers-workshop-title">
						<h2>Hubbers workshop lifetime member</h2>
						<p>Can key driver in what is being built </p>
					</div>
					<div  className="m-hubbers-workshop_body">
						<div className="m-hubbers-workshop_body__images">
							<div className="m-hubbers-workshop_body__image__1">
								<div className="text-center m-hubbers-workshop_body__images__text">
									<h4>Hubbers user experience</h4> (next webinars Dec. 26 Jan. 27)
								</div>
							</div>
							<div className="m-hubbers-workshop_body__image__2">
								<div className="text-center m-hubbers-workshop_body__images__text">
									<h4>Hubbers tools & business model</h4> (next webin ars Dec. 26 Jan. 27)
								</div>
							</div>
							<div className="m-hubbers-workshop_body__image__3" style={{zIndex:-100}}>
								<div className="text-center m-hubbers-workshop_body__images__text">
									<h4>Hubbers New Hardware project</h4> (next webin ars Dec. 26 Jan. 27)
								</div>
							</div>
							<div className="m-hubbers-workshop_body__image__4">
								<div className="text-center m-hubbers-workshop_body__images__text">
									<h4>Hubbers Event and community </h4> (next webin ars Dec. 26 Jan. 27)
								</div>
							</div>
							<div className="m-hubbers-workshop_body__image__5">
								<div className="text-center m-hubbers-workshop_body__images__text">
									<h4>Hubbers PR and Social meida</h4> (next webin ars Dec. 26 Jan. 27)
								</div>
							</div>
							<div className="m-hubbers-workshop_body__image__6">
								<div className="text-center m-hubbers-workshop_body__images__text">
									<h4>Hubbers Blockchain  and tokenization</h4> (next webin ars Dec. 26 Jan. 27)
								</div>
							</div>
							<div className="m-hubbers-workshop_body__image__7">
								<div className="text-center m-hubbers-workshop_body__images__text">
									<h4>Hubbers Community Growth</h4> (next webin ars Dec. 26 Jan. 27)
								</div>
							</div>
							<div className="m-hubbers-workshop_body__image__8">
								<div className="text-center m-hubbers-workshop_body__images__text">
									<h4>Hubbers gamification and loyalty program</h4> (next webin are Dec. 26 Jan. 27)
								</div>
							</div>
							<svg height="100px" width="700px" style={{marginTop:'-2650px', marginLeft:'177px'}}>
								<line x1="900" y1="130" x2="300" y2="1" style={{stroke:'rgb(29, 27, 25)',strokeWidth:'3'}} />
							</svg>
							<svg height="160px" width="695px" style={{marginTop:'-2350px', marginLeft:'220px'}}>
								<line x1="0" y1="320" x2="705" y2="0" style={{stroke:'rgb(29, 27, 25)',strokeWidth:'3'}} />
							</svg>
							<svg height="100px" width="680px" style={{marginTop:'-2000px', marginLeft:'263px'}}>
								<line x1="900" y1="120" x2="300" y2="10" style={{stroke:'rgb(29, 27, 25)',strokeWidth:'3'}} />
							</svg>
							<svg height="160px" width="695px" style={{marginTop:'-1680px', marginLeft:'246px'}}>
								<line x1="140" y1="180" x2="705" y2="0" style={{stroke:'rgb(29, 27, 25)',strokeWidth:'3'}} />
							</svg>
							<svg height="100px" width="635px" style={{marginTop:'-1300px', marginLeft:'155px'}}>
								<line x1="660" y1="60" x2="300" y2="10" style={{stroke:'rgb(29, 27, 25)',strokeWidth:'3'}} />
							</svg>
							<svg height="160px" width="500px" style={{marginTop:'-1050px', marginLeft:'320px'}}>
								<line x1="190" y1="190" x2="500" y2="20" style={{stroke:'rgb(29, 27, 25)',strokeWidth:'3'}} />
							</svg>
							<svg height="100px" width="507px" style={{marginTop:'-650px', marginLeft:'454px'}}>
								<line x1="860" y1="150" x2="100" y2="0" style={{stroke:'rgb(29, 27, 25)',strokeWidth:'3'}} />
							</svg>
						</div>
					</div>
					<div className = "m-hubbers-workshop_btn_wrap text-center">
						<button className = "btn apply-btn rounded-pill">Apply Now</button>
					</div>
				</div>
				<div className="m-testimonial">
					<div className = "m-testimonial-header">
						<div className = "title-wrap">
							<div className = "title">Testimonials</div>
						</div>
					</div>
					<Container fluid className="">
						<Row>
							<Col></Col>
							<Col></Col>
						</Row>
					</Container>
				</div>
            </React.Fragment>        
        )
    }
}

const mapStateToProps = (state: RootState) => ({})

export default connect(
  mapStateToProps,
  {}
)(MembershipPage)