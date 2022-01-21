import * as React from 'react'
import { connect } from 'react-redux'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import { fetchEntryDetail, saveEntryDetail } from '../actions/entry'
import Input from '../components/Input'
import { InputType } from '../constants/enums'
import { ContestEntryAttachmentRecord, ContestEntryRecord } from '../constants/models'

import AttachmentsUpload from '../components/AttachmentsUpload'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { RootState } from '../reducers'
import { State as EntryDetailState } from '../reducers/entryDetail'

export interface DraftEntryModalProps {
	state: EntryDetailState
	entry: ContestEntryRecord
	fetchEntryDetail: any
	saveEntryDetail: any
	onClose: any
}

export interface DraftEntryModalState {
	entry: ContestEntryRecord
	isStep1Valid: boolean
	isStep2Valid: boolean
	tabIndex: number
}

class DraftEntryModal extends React.Component<DraftEntryModalProps, DraftEntryModalState> {
	public constructor(props: DraftEntryModalProps) {
		super(props)
		
		this.state = {
			entry: null,
			isStep1Valid: false,
			isStep2Valid: false,
			tabIndex: 0
		}
	}
	
	public componentDidMount() {
		this.props.fetchEntryDetail(this.props.entry._id)
	}
	
	public componentWillReceiveProps(nextProps: DraftEntryModalProps) {
		if (nextProps.state.entry && nextProps.state.entry !== this.props.entry) {
			this.validateForm(nextProps.state.entry)
		}
	}
	
	public render() {
		const {state} = this.props
		
		return (
			<div
				id="entrie-modal"
				className="entrie-modal"
				onClick={(e: any) => {
					this.handleRootClick(e)
				}}>
				<div className="entrie-modal__body">
					{
						state.status === ActionTypeStates.INPROGRESS && (
							<div className="page-loading">
								<div>
									<em>Loading ...</em>
									<Spinner name="three-dots" fadeIn="none"/>
								</div>
							</div>
						)
					}
					{
						(state.status !== ActionTypeStates.INPROGRESS && this.state.entry) && (
							<div className="entrie_contents">
								<div>
									<Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({tabIndex})}>
										<TabList>
											<Tab>
												<div className="upload-custom-tab">
													<div>
														<img className="notactive" src="/images/define-icon.png"/>
														<img className="activeimg" src="/images/define-icon-active.png"/>
													</div>
													<p className="tabname">Describe Your Entry</p>
													{/*<p className="tabsubname">Explain your idea in each aspect</p>*/}
												</div>
											</Tab>
											<Tab>
												<div>
													<div>
														<img className="notactive" src="/images/upload-icon.png"/>
														<img className="activeimg" src="/images/upload-icon-active.png"/>
													</div>
													<p className="tabname">Upload</p>
													{/*<p className="tabsubname">Explain your idea in each aspect</p>*/}
												</div>
											</Tab>
											<Tab>
												<div>
													<div>
														<img className="notactive" src="/images/publish-icon.png"/>
														<img className="activeimg" src="/images/publish-icon-active.png"/>
													</div>
													<p className="tabname">Publish</p>
													{/*<p className="tabsubname">Explain your idea in each aspect</p>*/}
												</div>
											</Tab>
										</TabList>
										<TabPanel>
											<div className="define-tab">
												<div className="define-tab__row">
													<div className="define-tab__left">
														<div className="input-feild">
															<label>Describe your entry</label>
															<Input
																name="title"
																placeholder=""
																value={this.state.entry.title}
																type={InputType.TEXTAREA}
																onChange={(title: string) => {
																	this.validateForm({title})
																}}/>
														</div>
														<div className="input-feild-half">
															<div className="input-feild pRight">
																<label>Design</label>
																<Input
																	name="design"
																	placeholder=""
																	value={this.state.entry.descriptionDesign}
																	type={InputType.TEXTAREA}
																	onChange={(descriptionDesign: string) => {
																		this.validateForm({descriptionDesign})
																	}}/>
															</div>
															<div className="input-feild pLeft">
																<label>Functionality</label>
																<Input
																	name="functionality"
																	placeholder=""
																	value={this.state.entry.descriptionFunctionality}
																	type={InputType.TEXTAREA}
																	onChange={(descriptionFunctionality: string) => {
																		this.validateForm({descriptionFunctionality})
																	}}/>
															</div>
														</div>
														<div className="input-feild-half">
															<div className="input-feild pRight">
																<label>Manufacturability</label>
																<Input
																	name="usability"
																	placeholder=""
																	value={this.state.entry.descriptionUsability}
																	type={InputType.TEXTAREA}
																	onChange={(descriptionUsability: string) => {
																		this.validateForm({descriptionUsability})
																	}}/>
															</div>
															<div className="input-feild pLeft">
																<label>Market Potential</label>
																<Input
																	name="marketPotential"
																	placeholder=""
																	value={this.state.entry.descriptionMarketPotential}
																	type={InputType.TEXTAREA}
																	onChange={(descriptionMarketPotential: string) => {
																		this.validateForm({descriptionMarketPotential})
																	}}/>
															</div>
														</div>
														<div className="bottom_buttons">
															<button
																className="btn draftbtn btn-outline"
																onClick={() => {
																	this.saveEntry()
																}}>Save as a Draft
															</button>
															<button
																className="btn continuebtn"
																disabled={!this.state.isStep1Valid}
																onClick={() => {
																	this.validateAndSave(1)
																}}>Save and continue
															</button>
														</div>
													</div>
													<div className="define-tab__right">
														<div className="tips_section">
															<div className="tips_title">
																Tips for contestants
															</div>
															<div className="tips_description">
																Each contest has been designed to respond to an existing market need, and potential
																businesses or investors may have proposed the specific contest topic. Take your time to
																ensure you have understood all the requirements that must be fulfilled, as well as where
																you can add your own creativity.
															</div>
															<div className="tips_description">
																- The most important aspect of a new product is how useful it is. Before thinking about
																solutions, think about an issue to solve: does your product idea answers to an existing
																problem? What is the issue that this new product will address?
															</div>
															<div className="tips_description">Creativity and innovation: Solve an existing issue with
																creativity. But don't forget, there are all kinds of creative tools to help you come up
																with original ideas and originality is not necessarily the best way to win an innovation
																contest.
															</div>
															<div className="tips_description">Prepare your product idea: create a strong proposal. Ask
																yourself what the Awards Judges will expect, and get familiar with Hubbers assessment
																method. You can read here the <a href="https://hubbers.io/tips-awards-judge"
																                                 target="_blank">
																	“Tip for Awards Judges”</a>. Use pictures, drawings to be clear and straightforward.
															</div>
															<div className="tips_description">Fill contest entry completely: Obviously, completeness
																of the proposal is critical. Make sure that you answer each part of the entry form.
															</div>
															<div className="tips_description">As each contestant can submit only one idea, make sure
																you send your best one! You can modify an entry 3 times, hence if you think there is a
																better way to present your submission, go ahead and modify it.
															</div>
															<div className="tips_description">Before you submit your entry, use the checklist below to
																make sure that it is as completed according to the expectations of the Awards Judges and
																Hubbers standards.
															</div>
															<div className="tips_description">
																<a href="https://hubbers.io/tips-for-contestants" target="_blank">
																	https://hubbers.io/tips-for-contestants
																</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</TabPanel>
										<TabPanel>
											<div className="upload-tab">
												<div className="upload-tab__row">
													<div className="upload-tab__left">
														{/* GO HERE */}
														<AttachmentsUpload
															attachments={this.state.entry.attachments}
															autoUpload={true}
															onUpload={(attachments: ContestEntryAttachmentRecord[]) => {
																console.log('attachments', attachments)
																this.validateForm({attachments})
																setTimeout(() => {
																	this.saveEntry()
																}, 100)
															}}/>
														<div className="bottom_buttons">
															<button
																className="btn draftbtn btn-outline"
																onClick={() => {
																	this.saveEntry()
																}}>Save as a Draft
															</button>
															<button
																className="btn continuebtn"
																disabled={!this.state.isStep2Valid}
																onClick={() => {
																	this.validateAndSave(2)
																}}>Save and continue
															</button>
														</div>
													</div>
													<div className="upload-tab__right">
														<div className="tips_section">
															<div className="tips_title">
																Tips for contestants
															</div>
															<div className="tips_description">
																Each contest has been designed to respond to an existing market need, and potential
																businesses or investors may have proposed the specific contest topic. Take your time to
																ensure you have understood all the requirements that must be fulfilled, as well as where
																you can add your own creativity.
															</div>
															<div className="tips_description">
																- The most important aspect of a new product is how useful it is. Before thinking about
																solutions, think about an issue to solve: does your product idea answers to an existing
																problem? What is the issue that this new product will address?
															</div>
															<div className="tips_description">Creativity and innovation: Solve an existing issue with
																creativity. But don't forget, there are all kinds of creative tools to help you come up
																with original ideas and originality is not necessarily the best way to win an innovation
																contest.
															</div>
															<div className="tips_description">Prepare your product idea: create a strong proposal. Ask
																yourself what the Awards Judges will expect, and get familiar with Hubbers assessment
																method. You can read here the <a href="https://hubbers.io/tips-awards-judge"
																                                 target="_blank">
																	“Tip for Awards Judges”</a>. Use pictures, drawings to be clear and straightforward.
															</div>
															<div className="tips_description">Fill contest entry completely: Obviously, completeness
																of the proposal is critical. Make sure that you answer each part of the entry form.
															</div>
															<div className="tips_description">As each contestant can submit only one idea, make sure
																you send your best one! You can modify an entry 3 times, hence if you think there is a
																better way to present your submission, go ahead and modify it.
															</div>
															<div className="tips_description">Before you submit your entry, use the checklist below to
																make sure that it is as completed according to the expectations of the Awards Judges and
																Hubbers standards.
															</div>
															<div className="tips_description">
																<a href="https://hubbers.io/tips-for-contestants" target="_blank">
																	https://hubbers.io/tips-for-contestants
																</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</TabPanel>
										<TabPanel>
											<div className="submit-entry_tab">
												<div className="submit-entry_tab__body">
													<div className="submit-entry_tab__inner">
														<div className="submit-entry_tab__heading">
															<p>Congratulations!</p>
														</div>
														<div className="submit-entry_tab__subheading">
															<p>You are almost there!</p>
														</div>
														<div className="submit-entry_tab__desc">
															<p>Before you submit your entry, use this <a
																href="https://hubbers.io/tips-for-contestants">
																checklist</a> to make sure that it is as completed according to the expectations of the
																Awards Judges and Hubbers standards.</p>
															<p>Once the entry is published, all Award Judges for this contest will be notified.</p>
														</div>
													</div>
													<div className="submit-entry_tab__submit">
														<button
															className="btn"
															disabled={!this.state.isStep1Valid || !this.state.isStep2Valid}
															onClick={() => {
																this.submitEntry()
															}}>Submit
														</button>
													</div>
												</div>
											</div>
										</TabPanel>
									</Tabs>
								</div>
							</div>
						)
					}
				</div>
			</div>
		)
	}
	
	private handleRootClick(e: any) {
		const isRoot = e.target.className === 'entrie-modal'
		
		if (isRoot) {
			this.handleClose()
		}
	}
	
	private handleClose() {
		document.body.classList.remove('show-entrie-modal')
		this.props.onClose()
	}
	
	private validateForm(nextEntry: Partial<ContestEntryRecord>) {
		const entry: ContestEntryRecord = {...this.state.entry, ...nextEntry}
		
		const isStep1Valid = entry.title !== ''
			&& entry.descriptionDesign !== ''
			&& entry.descriptionFunctionality !== ''
			&& entry.descriptionUsability !== ''
			&& entry.descriptionMarketPotential !== ''
		
		const isStep2Valid = entry.attachments && entry.attachments.length > 0
		
		this.setState({entry, isStep1Valid, isStep2Valid})
	}
	
	private saveEntry(forcePublish?: boolean) {
		if (this.state.entry) {
			const {
				title, descriptionDesign, descriptionFunctionality, descriptionUsability,
				descriptionMarketPotential, attachments
			} = this.state.entry
			
			const updatedEntry = {
				title, descriptionDesign, descriptionFunctionality, descriptionUsability,
				descriptionMarketPotential, attachments
			} as Partial<ContestEntryRecord>
			
			if (forcePublish) {
				updatedEntry.isDraft = false
			}
			
			this.props.saveEntryDetail(this.state.entry._id, updatedEntry)
		}
	}
	
	private validateAndSave(step: number) {
		if (step === 1 && this.state.isStep1Valid || step === 2 && this.state.isStep2Valid) {
			this.saveEntry()
			this.setState({tabIndex: step})
		}
	}
	
	private submitEntry() {
		const {isStep1Valid, isStep2Valid} = this.state
		
		if (isStep1Valid && isStep2Valid) {
			this.saveEntry(true)
			this.handleClose()
		}
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.entryDetail
})

export default connect(mapStateToProps, {
	fetchEntryDetail,
	saveEntryDetail
})(DraftEntryModal)