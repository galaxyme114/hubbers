import * as React from 'react'

export interface ContestantParticipateModalProps {
	onSubmit: any
}

export interface ContestantParticipateModalState {
	
}

export default class ContestantParticipateModal extends React.Component<ContestantParticipateModalProps, ContestantParticipateModalState> {
	public constructor(props: ContestantParticipateModalProps) {
		super(props)
		
	}
	
	public render() {
		const {onSubmit} = this.props
		
		return (
			<div id="contestant-participate-modal" className="contestant-participate-modal" onClick={this.handleRootClick}>
				<div className="contestant-participate-modal__body">
					<div className="constent_agreement">
						<h2>CONTESTANT USER’S DISCLAIMER OF USE:</h2>
						<hr/>
						<p>You are submitting an entry to a product innovation contest.
							By doing so you might be allowed to use https://hubbers.io website as a “Contestant”.</p>
						
						<p>By clicking “I agree”, you agree to be unconditionally bound to Hubbers’s Innovation
							<a target="_blank" href="https://hubbers.io/contest-policy"> Contest Policy </a>, Hubbers
							<a target="_blank" href="https://hubbers.io/terms-of-use"> Terms of use </a> and Hubbers
							<a target="_blank" href="https://hubbers.io/privacy-policy"> Privacy Policy </a>.</p>
						
						<p>In particular, by clicking “I agree” you agree that :</p>
						
						<ul>
							<li>The contest is subject to hubbers’ Terms of Use.
								If you do not agree with the terms in any way,
								please do not use hubbers's website.
							</li>
							<li>You have carefully read the Contest Rules and the
								<a target="_blank" href="https://hubbers.io/tips-for-contestants"> Tips for contestants </a>.
							</li>
							<li>You might be granting, waiving or releasing important legal rights (as per above documents).
								In particular, you are aware that prizes are granted to the winners on the condition
								that he/she agrees and signs a licence agreement with Hubbers to develop, produce
								and sell the proposed product. Please read Article 3 of Hubbers Contest policy.
							</li>
							<li>Your entry does not infringe any intellectual property rights, or any pre-existing
								licensing or commercial rights. Please read Article 9 of Hubbers Contest policy.
							</li>
						</ul>
						<div className="text-center footer-btn">
							<button className="btn btnagree" type="button" onClick={() => {
								this.handleClose()
								onSubmit()
							}}>I Agree
							</button>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<button className="btn btndecline" type="button" onClick={() => {
								this.handleClose()
							}}> Decline
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private handleRootClick(e: any) {
		const isRoot = e.target.className === 'contestant-participate-modal'
		
		if (isRoot) {
			document.body.classList.remove('show-contestant-participate-modal')
		}
	}
	
	private handleClose() {
		document.body.classList.remove('show-contestant-participate-modal')
	}
}