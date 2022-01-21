import * as React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

export default class Footer extends React.Component<{}, {}> {
	public render() {
		return (
			<div className="footer__inners">
				<div className="footer">
					<div className="container">
						<div className="footer__list__wrap">
							<div className="footer__list">
								<h4 className="footer__list__title">Creators</h4>
								<ul>
									<li><Link to="/become-a-creator">Are you a creator?</Link></li>
									<li><Link to="/product-launcher">Use the product launcher</Link></li>
									<li><Link to="/signup">Sign up</Link></li>
								</ul>
							</div>
							<div className="footer__list">
								<h4 className="footer__list__title">Experts</h4>
								<ul>
									<li><Link to="/expert-marketplace">Marketplace</Link></li>
									<li><Link to="/become-an-expert">Become an expert</Link></li>
									<li><Link to="/signup/expert">Sign up</Link></li>
								</ul>
							</div>
							<div className="footer__list">
								<h4 className="footer__list__title">Competition</h4>
								<ul>
									<li><Link to="/become-a-contestant">How to join</Link></li>
									<li><Link to="/become-a-contestant">Prizes</Link></li>
									<li><Link to="/contests">Product Contest</Link></li>
									<li><Link to="/become-a-judge">Become a judge</Link></li>
								</ul>
							</div>
							<div className="footer__list">
								<h4 className="footer__list__title">Hubbers</h4>
								<ul>
									<li><a href="https://blog.hubbers.io/who-we-are">Who we are</a></li>
									<li><a href="https://blog.hubbers.io/">Blog</a></li>
									<li><a href="https://help.hubbers.io/">FAQ</a></li>
									<li><Link to="/grab-a-share">Grab a share</Link></li>
									<li><Link to="/get-our-app">Get our APP</Link></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="footer-copyright">
					<div className="container">
						<div className="footer-copyright__logo">
							<img srcSet="https://hubbers.io/images/webp/logo_b_w.webp" src="https://hubbers.io/images/logo_b_w.png" alt="Hubbers"/>
							<div className="footer-copyright__copy">
								<a href={'https://hubbers.io/privacy-policy'}>Privacy Policy</a>&nbsp;
								|&nbsp;<a href={'https://hubbers.io/terms-of-use'}>Terms of Service</a> &nbsp; &copy; Hubbers LIMITED.
								2018
								{/*<br/>made with ❤ in Shanghai*/}
							</div>
						</div>
						<div className="footer-copyright__social">
							<a target="_blank" href="https://www.instagram.com/hubbers_the_hub_of_makers/"><Icon name="instagram"/></a>
							<a target="_blank" href="https://www.linkedin.com/company/hubbe.rs/"><Icon name="linkedin"/></a>
							<a target="_blank" href="https://www.facebook.com/hubbers2017/"><Icon name="facebook"/></a>
							<a target="_blank" href="https://twitter.com/hubbershub"><Icon name="twitter"/></a>
						</div>
					</div>
				</div>
				{/*<MessagePopup />*/}
			</div>
		)
	}
}