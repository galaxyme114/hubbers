import * as React from 'react'

export interface JudgeParticipateModalProps {
	onSubmit: any
}

export interface JudgeParticipateModalState {
}

export default class JudgeParticipateModal extends React.Component<JudgeParticipateModalProps, JudgeParticipateModalState> {
	public constructor(props: JudgeParticipateModalProps) {
		super(props)
		
	}
	
	public render() {
		const {onSubmit} = this.props
		
		return (
			<div id="judge-participate-modal" className="judge-participate-modal" onClick={this.handleRootClick}>
				<div className="judge-participate-modal__body">
					<div className="judge_agreement">
						<h2>Awards Judge’s disclaimer of Use.</h2>
						<hr/>
						<p>You are submitting an application to assess and judge product innovation contest entries.
							By doing so you might be allowed to use https://hubbers.io website as an “Award Judge”.</p>
						
						<p>By clicking “I agree”, you agree to be unconditionally bound to Hubbers’s Innovation
							<a target="_blank" href="https://hubbers.io/contest-policy"> Contest Policy </a>, Hubbers
							<a target="_blank" href="https://hubbers.io/terms-of-use"> Terms of use </a> and Hubbers
							<a target="_blank" href="https://hubbers.io/privacy-policy"> Privacy Policy </a>.</p>
						
						<p>In particular, by clicking “I agree” you agree that:</p>
						
						<ul>
							<li>The contest is subject to Hubbers Terms of Use. If you do not agree with the terms
								in any way, please do not use https://hubbers.io website.
							</li>
							<li>You have carefully read the Contest Rules and the
								<a target="_blank" href="https://hubbers.io/tips-awards-judge"> Tips for Awards Judge </a>,
								and you are aware of all rules and good practices applying.
							</li>
							<li>You might be granting, waiving or releasing important legal rights (as per above documents).
							</li>
							<li>You will assess each entry fairly and in an impartial manner according to Hubbers’s
								entry assessment principles. You agree to uphold co-creation spirit by protecting
								Creators’ ideas, to help contestant improve his/her entry to the best of your ability,
								and not to use Contestant’s ideas in any way without their knowledge.
							</li>
							<li>You are 19 years of age or older, and you agree to provide enough information on
								your personal and professional background to be asssessed and trusted by Hubbers users
								in the role of Awards Judge in a product innovation contest.
							</li>
						</ul>
						<div className="text-center footer-btn">
							<button className="btn btnagree" type="button"
							        onClick={() => {
								        this.handleClose()
								        onSubmit()
							        }}>I Agree
							</button>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<button className="btn btndecline" type="button"
							        onClick={() => {
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
		const isRoot = e.target.className === 'judge-participate-modal'
		
		if (isRoot) {
			document.body.classList.remove('show-judge-participate-modal')
		}
	}
	
	private handleClose() {
		document.body.classList.remove('show-judge-participate-modal')
	}
}