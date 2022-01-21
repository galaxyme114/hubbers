import * as React from 'react'
import Registration from '../containers/Registration'
import SuggestedExpertise from '../containers/SuggestedExpertise'
import Icon from './Icon'
import RegistrationCreateProject from './RegistrationCreateProject'

export interface ResultModalProps {
	score: number
	isLoggedIn: boolean
}

export interface ResultModalState {
	
}

export default class ResultModal extends React.Component<ResultModalProps, ResultModalState> {
	public constructor(props: ResultModalProps) {
		super(props)
		
		this.state = {}
	}
	
	public render() {
		const {score, isLoggedIn} = this.props
		const scorePercentage = Math.ceil(score * 100)
		
		return (
			<div id="result-modal" className="result-modal" onClick={this.handleRootClick}>
				<div className="result-modal__body">
					<div className="result-modal__header">
						{
							scorePercentage < 70 && (
								<div>
									<div className="result-modal__header__title">
										<Icon name="result-progress"/>
										&nbsp; {scorePercentage}% ... Great start!
									</div>
									<div className="result-modal__header__content">
										Try to reach 7O% <br/> it's a good sign of your product launch readiness.
									</div>
								</div>
							)
						}
						{
							scorePercentage >= 70 && (
								<div>
									<div className="result-modal__header__title">
										<Icon name="stars-lg"/> Congratulations! <Icon name="stars-sm"/>
									</div>
									<div className="result-modal__header__content">
										Looks like your product launch is seriously prepared.
										<strong>{scorePercentage}%</strong>
									</div>
								</div>
							)
						}
					</div>
					
					<div className="result-modal__registration">
						{
							!isLoggedIn && <Registration/>
						}
						{
							isLoggedIn && <RegistrationCreateProject/>
						}
					</div>
					
					<div className="result-modal__body__inner">
						<div className="result-modal__message__wrap">
							<div className="result-modal__message">
								{
									scorePercentage < 70 && (
										<p>
											Experts on hubbers market place can help you
											<strong>improve your product launch preparation.</strong>
											<br/>
											It gives you the possibility to enter our product development module to have
											<strong>access to our pool of super-experts and distributors.</strong>
										</p>
									)
								}
								{
									scorePercentage >= 70 && (
										<p>Experts on hubbers market place are here to help you improve your preparation on following
											fields.</p>
									)
								}
							</div>
						</div>
						<div className="result-modal__expertise">
							<SuggestedExpertise expertiseTags={['branding']}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private handleRootClick(e: any) {
		const isRoot = e.target.className === 'result-modal'
		
		if (isRoot) {
			document.body.classList.remove('show-result-modal')
		}
	}
}