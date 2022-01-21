import * as React from 'react'

import { Sticky, StickyContainer } from 'react-sticky'
import { CategoryRecord, QuestionRecord, VideoRecord } from '../constants/models'
import Icon from './Icon'
import Question from './Question'
import QuestionnaireHelper from './QuestionnaireHelper'

interface QuestionnaireProps extends CategoryRecord {
	onAnswer: any,
	onPrevious: any,
	onNext: any,
	isFirst: boolean,
	isLast: boolean
}

interface QuestionnaireState {
	lastInteractedQuestionId: number,
	questionnaireHelperTitle: string,
	questionnaireHelperVideo: VideoRecord,
	questionnaireHelperExplanation: [string],
	questionnaireHelperImage: string,
	questionnaireHelperLinks: [string],
	questionnaireFrameActiveLink: string
}

export default class Questionnaire extends React.Component<QuestionnaireProps, QuestionnaireState> {
	constructor(props: QuestionnaireProps) {
		super(props)
		
		this.state = {
			lastInteractedQuestionId: null,
			questionnaireHelperTitle: '',
			questionnaireHelperVideo: null,
			questionnaireHelperExplanation: null,
			questionnaireHelperImage: null,
			questionnaireHelperLinks: null,
			questionnaireFrameActiveLink: null
		}
	}
	
	public componentDidMount() {
		if (this.props.questions.length > 0) {
			this.onQuestionHelper(this.props.questions[0])
		}
	}
	
	public componentWillReceiveProps(nextProps: QuestionnaireProps) {
		if (nextProps.questions.length > 0 && (this.props.questions[0].id !== nextProps.questions[0].id)) {
			this.onQuestionHelper(nextProps.questions[0])
		}
	}
	
	public render() {
		const {title, questions, onAnswer, onPrevious, onNext, isFirst, isLast} = this.props
		const {
			lastInteractedQuestionId, questionnaireHelperTitle, questionnaireHelperExplanation,
			questionnaireHelperImage, questionnaireHelperLinks, questionnaireFrameActiveLink
		} = this.state
		
		const pendingQuestions = questions.filter(q => q.value === null)
		
		return (
			<div id="questionnaire" className="questionnaire">
				<div className="container">
					<h2 className="questionnaire__title">{title}</h2>
					<StickyContainer>
						<div className="questions-wrap">
							{
								questions && (
									<div className="questions">
										{
											questions.length > 0 && questions.map((q: QuestionRecord) =>
												<Question
													key={q.id} {...q}
													onAnswer={(id: number, value: any) => {
														this.setState({lastInteractedQuestionId: id})
														onAnswer(id, value)
													}}
													onHover={() => {
														this.onQuestionHelper(q)
													}}
													isActive={questionnaireHelperTitle === q.category}
													isInteracted={q.id === lastInteractedQuestionId}
												/>
											)
										}
										{
											questions.length === 0 &&
											<div className="questions-empty">No Questions!</div>
										}
										<div className="questions-submit">
											<button
												className="btn btn-large btn-outline btn-rounded questions-submit__previous"
												disabled={isFirst}
												onClick={() => {
													onPrevious()
												}}>
												<Icon name="chevron-left"/> Previous
											</button>
											
											<div className="questions-submit__progress">
												{questions.length - pendingQuestions.length} of {questions.length}
												<span> questions completed</span>
											</div>
											
											<button
												className="btn btn-large btn-outline btn-rounded questions-submit__next"
												onClick={() => {
													onNext()
												}}>
												{isLast ? 'Submit' : 'Next'} <Icon name="chevron-right"/>
											</button>
										</div>
									</div>
								)
							}
							{
								questionnaireHelperExplanation && (
									<Sticky topOffset={-200}>
										{
											({style, distanceFromBottom}: any) => (
												<div
													className={'questionnaire-helper__sticky ' +
													(((parseInt((distanceFromBottom), 10) - 200) <= 0) ? 'bottom' : 'not-bottom')}
													style={style}>
													<QuestionnaireHelper
														title={questionnaireHelperTitle}
														video={null}
														explanation={questionnaireHelperExplanation}
														image={questionnaireHelperImage}
														links={questionnaireHelperLinks}
														onClick={(link: any) => {
															this.openLinkFrame(link)
														}}/>
												</div>
											)
										}
									</Sticky>
								)
							}
						</div>
					</StickyContainer>
				</div>
				
				<div className="questionnaire-helper-frame" onClick={(e: any) => {
					this.handleFrameRootClick(e)
				}}>
					<div className="questionnaire-helper-frame__inner">
						{
							questionnaireFrameActiveLink && <iframe src={questionnaireFrameActiveLink}/>
						}
					</div>
				</div>
			</div>
		)
	}
	
	private onQuestionHelper(question: QuestionRecord) {
		this.setState({
			questionnaireHelperTitle: question.category,
			questionnaireHelperVideo: null,
			questionnaireHelperExplanation: question.tutorial,
			questionnaireHelperImage: question.tutorialImage,
			questionnaireHelperLinks: question.tutorialLinks
		})
	}
	
	private openLinkFrame(link: string) {
		this.setState({questionnaireFrameActiveLink: 'https://api.hubbers.io/v2/proxy?url=' + link})
		document.body.classList.add('show-questionnaire-frame')
	}
	
	private handleFrameRootClick(e: any) {
		const isRoot = e.target.className.indexOf('questionnaire-helper-frame') !== -1
		
		if (isRoot) {
			document.body.classList.remove('show-questionnaire-frame')
			this.setState({questionnaireFrameActiveLink: ''})
		}
	}
}