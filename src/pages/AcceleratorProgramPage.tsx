import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RootState } from '../reducers/index'

interface AcceleratorProgramProps {
}

class AcceleratorProgramPage extends React.Component<AcceleratorProgramProps, {}> {
	
	public render() {
		return (
			<div className="accelerator-program">
				<Helmet>
					<title>Get our APP | Hubbers - Hub of Makers</title>
				</Helmet>
				<div className="container">
					<div className="accelerator_banner_section">
						
						<div className="accelerator_heading">
							<h2>Accelerator Program</h2>
							<h3>The hubbers’ accelerator is a step
								by step program to launch new products in the market.
							</h3>
							{/* <h5>Hubbers give you access to:</h5> */}
							<ul>
								<li>- Investor to fund innovative project,</li>
								<li>- The online platform to streamline projects</li>
								<li>- A super expert to ensure the well <br></br> development of the product.</li>
							</ul>
							<small>The accelerator program requires the creator to share
								the benefice of the product at 12 % for Hubbers, 3%
								for the super expert and give the exploitation license
								to Hubbers for 3 years.
							</small>
						</div>
						
						<div className="accelerator_banner_section_image">
							<img src="/images/accelerator_image.png"/>
						</div>
					</div>
					
					<div className="accelerator_banner_section_start_button">
						<button type="button">Start Hubbers Accelerator</button>
						<h2>See the accelerator FAQ</h2>
					</div>
					
					<div className="third__section__hubber">
						<h2>How does the Hubbers Accelerator work?</h2>
					</div>
					
					<div className="accelerator-work clearfix">
						{/* Left Col 1 */}
						<div className="accelerator-work__item accelerator-work__item--left">
							<div className="accelerator-work__item-right">
								<h2>Assessment</h2>
								<p>Hubbers need to evaluate new project prior to be accepted in the accelerator program. Upon
									filling the initial 5 modules you will get an assessment and be part of the accelerator program. </p>
							</div>
							<div className="accelerator-work__item-left">
								<img src="/images/time/1.png" className="set_iamge_first"/>
							</div>
						</div>
						{/* Right Col 2 */}
						<div className="accelerator-work__item accelerator-work__item--right">
							<div className="accelerator-work__item-left">
								<img src="/images/time/2.png"/>
							</div>
							<div className="accelerator-work__item-right">
								<h2>Super Expert</h2>
								<p>Choose your project manager from a pool of professionals with the expertise in the required
									field.</p>
							</div>
						</div>
						{/* Left Col 3 */}
						<div className="accelerator-work__item accelerator-work__item--left">
							<div className="accelerator-work__item-right">
								<h2>Work Plan</h2>
								<p>Create a detailed plan to ensure all the necessary steps of the product development cycle are
									executed according to standards, expectations, and requirements. </p>
							</div>
							<div className="accelerator-work__item-left">
								<img src="/images/time/3.png"/>
							</div>
						</div>
						{/* Right Col 4 */}
						<div className="accelerator-work__item accelerator-work__item--right">
							<div className="accelerator-work__item-left">
								<img src="/images/time/4.png"/>
							</div>
							<div className="accelerator-work__item-right">
								<h2>Hire Experts</h2>
								<p>Find and hire the expert you need to complete your project well. The Hubbers platform provides the
									opportunity to connect with people and organizations from around the world.</p>
							</div>
						</div>
						{/* Left Col 5 */}
						<div className="accelerator-work__item accelerator-work__item--left">
							<div className="accelerator-work__item-right">
								<h2>Complete your Business Plan</h2>
								<p>Test the feasibility of your business idea. Make business planning effective, secure funding, and
									create an opportunity for your business to succeed.</p>
							</div>
							<div className="accelerator-work__item-left">
								<img src="/images/time/5.png"/>
							</div>
						</div>
						{/* Right Col 6 */}
						<div className="accelerator-work__item accelerator-work__item--right">
							<div className="accelerator-work__item-left">
								<img src="/images/time/6.png"/>
							</div>
							<div className="accelerator-work__item-right">
								<h2>Product Development</h2>
								<p>Once your product idea reaches the required score on the Product Launcher, get support from a
									specialized team of experts/super experts to create your product and deliver it to market. (6-12
									months)</p>
							</div>
						</div>
						{/* Left Col 7 */}
						<div className="accelerator-work__item accelerator-work__item--left">
							<div className="accelerator-work__item-right">
								<h2>Product to Market</h2>
								<p>Connect with the right market, build relationship with suitable distributors, and get access to
									established networks to sell and promote your product</p>
							</div>
							<div className="accelerator-work__item-left">
								<img src="/images/time/7.png"/>
							</div>
						</div>
					</div>
				</div>
				<div className="accelerator_banner_section_start_button">
					<button type="button">Start Hubbers Accelerator</button>
					<h2>See the accelerator FAQ</h2>
				</div>
				
				<div className="plateform_bg">
					<div className="container plateform_form_section">
						<div className="form_content">
							<div className="plateform_form_heading">
								<h2>Access to our Platform</h2>
							</div>
							<div className="form_subheading"><h2>Our platform is limited to our priority members.</h2></div>
							<div className="form_paragraph"><p>In the meantime enter your information below and we will
								contact you as soon as the next batch's registrations begin:</p></div>
							<div className="plateform_form">
								<input type="text" name="firstname" value="" placeholder=" Name"/>
								<br/> <br/>
								<input type="text" name="company name" value="" placeholder="Company name"/>
								<br/><br/>
								<select name="country" placeholder="country">
									<option value="">Country</option>
									<option value="">india</option>
									<option value=""></option>
									<option value=""></option>
								</select> <br/> <br/>
								<input type="email" name="emailaddress" placeholder="Email"/><br/><br/>
								<input type="submit" value="Register Now" className="btn_submit"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({})

export default connect(mapStateToProps, {})(AcceleratorProgramPage)