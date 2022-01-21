import Sliders from 'rc-slider'
import * as React from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'

import { fetchEntryDetail, saveEntryRating } from '../actions/entry'
import { UserActivityModalCarousel } from '../constants/carouselSettings'
import { ContestEntryRatingRecord, ContestEntryRecord } from '../constants/models'

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import ContestAttachments from '../components/ContestAttachments'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { InputType } from '../constants/enums'
import { RootState } from '../reducers'
import { State as ContestDetailDataState } from '../reducers/contestDetail'
import { State as EntryDetailState } from '../reducers/entryDetail'
import { momentDaysToGo } from '../utils/dates'

export interface EntryModalProps {
	entry: ContestEntryRecord
	contestDetailState: ContestDetailDataState
	state: EntryDetailState
	fetchEntryDetail: any
	saveEntryRating: any
	onClose: any
	onUpdate: any
}

export interface EntryModalState {
	entryRating: ContestEntryRatingRecord,
	isOpenMarks: boolean
}

class EntryModal extends React.Component<EntryModalProps, EntryModalState> {
	public constructor(props: EntryModalProps) {
		super(props)
		
		this.state = {
			entryRating: {
				design: 0,
				designComment: '',
				functionality: 0,
				functionalityComment: '',
				usability: 0,
				usabilityComment: '',
				marketPotential: 0,
				marketPotentialComment: ''
			},
			isOpenMarks: false
		}
	}
	
	public componentDidMount() {
		this.props.fetchEntryDetail(this.props.entry._id)
	}
	
	public componentWillReceiveProps(nextProps: EntryModalProps) {
		if (nextProps.state.entry && nextProps.state.entry.myRating
			&& nextProps.state.entry.myRating !== this.state.entryRating) {
			this.setState({entryRating: nextProps.state.entry.myRating})
		}
	}
	
	public openMarks() {
		this.setState({
			isOpenMarks: true
		})
	}
	
	public closeMarks() {
		this.setState({
			isOpenMarks: false
		})
	}
	
	public render() {
		const { contestDetailState, state } = this.props
		const { isOpenMarks }  = this.state
		
		return (
			<div
				id="user_activity_detail-modal"
				className="user_activity_detail-modal"
				onClick={(e: any) => {
					this.handleRootClick(e)
				}}>
				<div className="user_activity_detail-modal__body">
					<div className="user_activity_items">
						<Slider {...UserActivityModalCarousel}>
							{
								contestDetailState.myEntries.map((entry: ContestEntryRecord) => (
									<div
										key={entry._id}
										className={
											'user_activity_item' +
											((state.entry && state.entry._id === entry._id) ? ' selected' : '') +
											(!entry.myRating ? ' active' : '')}
										onClick={() => {
											this.selectEntry(entry)
										}}>
										<div className="item_img">
											<img src={entry.contestant.thumbnailImageUrl}/>
											<span className="item_img__avg-mark">
												{entry.rating.average ? entry.rating.average.toFixed(2) : 'N/A'}</span>
										</div>
										<p className="item_name">{entry.contestant.fullName}</p>
										<p className="item_avg_mark">{momentDaysToGo(entry.updatedAt)}</p>
										{/*<p className="item_avg_mark">Average:&nbsp;*/}
										{/*{entry.rating.average ? entry.rating.average.toFixed(2) : 'N/A'}</p>*/}
										{/*<p className="item_avg_mark">My Rating:&nbsp;*/}
										{/*{entry.myRating ? entry.myRating.average.toFixed(2) : 'N/A'}</p>*/}
									</div>
								))
							}
						</Slider>
					</div>
					<div className="user_activity_detail">
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
							(state.status !== ActionTypeStates.INPROGRESS && state.entry) && (
								<div className="user_activity_detail_row">
									<div className="user_activity_detail_left">
										{
											state.entry.attachments && <ContestAttachments attachments={state.entry.attachments}/>
										}
									</div>
									<div className="user_activity_detail_right">
										{
											isOpenMarks === false &&
											<div className="comment_tab">
												<div className="comment_tab_inner">
													{
														state.entry.contestant && (
															<div className="user_section">
																<img src={state.entry.contestant.thumbnailImageUrl}/>
																<div className="user_entries">
																	<p className="name">{state.entry.contestant.fullName}</p>
																	<p className="marks">
																		Average Rating: <b>{state.entry.rating.average ?
																		state.entry.rating.average.toFixed(2) : '-'}</b>
																	</p>
																	{
																		state.entry.myRating && (
																			<p className="marks">
																				My Rating: <b>{state.entry.myRating ?
																				state.entry.myRating.average.toFixed(2) : '-'}</b>
																			</p>
																		)
																	}
																</div>
															</div>
														)
													}
													<div className="comment_list">
														<div className="comment_list_item">
															<p className="comment_list_item_title">Description</p>
															<p
																className="comment_list_item_desc"
																dangerouslySetInnerHTML={{__html: state.entry.title}}/>
														</div>
														{
															state.entry.descriptionDesign !== '' && (
																<div className="comment_list_item">
																	<p className="comment_list_item_title">Design</p>
																	<p
																		className="comment_list_item_desc"
																		dangerouslySetInnerHTML={{__html: state.entry.descriptionDesign}}/>
																</div>
															)
														}
														{
															state.entry.descriptionFunctionality !== '' && (
																<div className="comment_list_item">
																	<p className="comment_list_item_title">Functionality</p>
																	<p
																		className="comment_list_item_desc"
																		dangerouslySetInnerHTML={{__html: state.entry.descriptionFunctionality}}/>
																</div>
															)
														}
														{
															state.entry.descriptionUsability !== '' && (
																<div className="comment_list_item">
																	<p className="comment_list_item_title">Manufacturability</p>
																	<p
																		className="comment_list_item_desc"
																		dangerouslySetInnerHTML={{__html: state.entry.descriptionUsability}}/>
																</div>
															)
														}
														{
															state.entry.descriptionMarketPotential !== '' && (
																<div className="comment_list_item">
																	<p className="comment_list_item_title">Market Potential</p>
																	<p
																		className="comment_list_item_desc"
																		dangerouslySetInnerHTML={{__html: state.entry.descriptionMarketPotential}}/>
																</div>
															)
														}
													</div>
													<div className="submit_mark_bottom">
														<button className="btn" onClick={() => { this.openMarks() }}>
															{ this.state.entryRating._id ? 'Update Marks' : 'Submit Marks' }
														</button>
													</div>
												</div>
											</div>
										}
										{
											isOpenMarks === true &&
											<div className="submit_marks_section">
												{/*<div className="submit_marks_header">*/}
												{/*<p>Submit Marks</p>*/}
												{/*<span className="closeMark" onClick={() => this.closeMarks()}><Icon name="close"/></span>*/}
												{/*</div>*/}
												<Tabs>
													<TabList>
														<Tab>Comment</Tab>
														<Tab>Feedback</Tab>
													</TabList>
													<TabPanel>
														<div className="submit_marks_items">
															<div className="submit_marks_item">
																<p className="submit_marks_item_title">Design</p>
																<p className="submit_marks_item_caption">
																	Is it innovative? Is it beautiful and interesting?
																</p>
																<Sliders
																	min={0}
																	max={10}
																	step={0.1}
																	value={this.state.entryRating.design}
																	onChange={(design: any) => {
																		this.updateEntryRating({design})
																	}}/>
																<span>{this.state.entryRating.design}</span>
															</div>
															<div className="submit_marks_item">
																<p className="submit_marks_item_title">Functionality</p>
																<p className="submit_marks_item_caption">
																	Is it functional? Are all critical components in place?
																</p>
																<Sliders
																	min={0}
																	max={10}
																	step={0.1}
																	value={this.state.entryRating.functionality}
																	onChange={(functionality: any) => {
																		this.updateEntryRating({functionality})
																	}}
																/>
																<span>{this.state.entryRating.functionality}</span>
															</div>
															<div className="submit_marks_item">
																<p className="submit_marks_item_title">Manufacturability</p>
																<p className="submit_marks_item_caption">
																	Is this product easy and feasible to manufacture?
																</p>
																<Sliders
																	min={0}
																	max={10}
																	step={0.1}
																	value={this.state.entryRating.usability}
																	onChange={(usability: any) => {
																		this.updateEntryRating({usability})
																	}}
																/>
																<span>{this.state.entryRating.usability}</span>
															</div>
															<div className="submit_marks_item">
																<p className="submit_marks_item_title">Market Potential</p>
																<p className="submit_marks_item_caption">
																	Do you see a potential for selling it on a specific market?
																</p>
																<Sliders
																	min={0}
																	max={10}
																	step={0.1}
																	value={this.state.entryRating.marketPotential}
																	onChange={(marketPotential: any) => {
																		this.updateEntryRating({marketPotential})
																	}}
																/>
																<span>{this.state.entryRating.marketPotential}</span>
															</div>
														</div>
													</TabPanel>
													<TabPanel>
														<div className="submit_marks_items submit_marks_item_descriptions">
															<div className="submit_marks_item">
																<p className="submit_marks_item_title">Design</p>
																<Input
																	name="designComment"
																	type={InputType.TEXTAREA}
																	placeholder="Is it innovative? Is it beautiful and interesting?"
																	value={this.state.entryRating.designComment}
																	onChange={(designComment: string) => {
																		this.updateEntryRating({designComment})
																	}}/>
															</div>
															<div className="submit_marks_item">
																<p className="submit_marks_item_title">Functionality</p>
																<Input
																	name="functionalityComment"
																	type={InputType.TEXTAREA}
																	placeholder="Is it functional? Are all critical components in place?"
																	value={this.state.entryRating.functionalityComment}
																	onChange={(functionalityComment: string) => {
																		this.updateEntryRating({functionalityComment})
																	}}/>
															</div>
															<div className="submit_marks_item">
																<p className="submit_marks_item_title">Manufacturability</p>
																<Input
																	name="usabilityComment"
																	type={InputType.TEXTAREA}
																	placeholder="Is this product easy and feasible to manufacture?"
																	value={this.state.entryRating.usabilityComment}
																	onChange={(usabilityComment: string) => {
																		this.updateEntryRating({usabilityComment})
																	}}/>
															</div>
															<div className="submit_marks_item">
																<p className="submit_marks_item_title">Market Potential</p>
																<Input
																	name="marketPotentialComment"
																	type={InputType.TEXTAREA}
																	placeholder="Do you see a potential for selling it on a specific market?"
																	value={this.state.entryRating.marketPotentialComment}
																	onChange={(marketPotentialComment: string) => {
																		this.updateEntryRating({marketPotentialComment})
																	}}/>
															</div>
														</div>
													</TabPanel>
												</Tabs>
												<div className="submit_mark_bottom">
													<button className="btn" onClick={() => {
														this.submitEntryRating()
													}}>Save Mark
													</button>
												</div>
											</div>
										}
									</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		)
	}
	
	private handleRootClick(e: any) {
		const isRoot = e.target.className === 'user_activity_detail-modal'
		if (isRoot) {
			this.handleClose()
		}
	}
	
	private handleClose() {
		document.body.classList.remove('show-user_activity_detail-modal')
		this.props.onClose()
	}
	
	private updateEntryRating(updatedState: any) {
		this.setState({entryRating: {...this.state.entryRating, ...updatedState}})
	}
	
	private selectEntry(entry: ContestEntryRecord) {
		this.props.fetchEntryDetail(entry._id)
		this.setState({ isOpenMarks: false, entryRating: {
			design: 0, designComment: '', functionality: 0, functionalityComment: '',
				usability: 0, usabilityComment: '', marketPotential: 0, marketPotentialComment: ''
			}
		})
	}
	
	private submitEntryRating() {
		const {state} = this.props
		
		this.props.saveEntryRating(state.entry.contest, state.entry._id, this.state.entryRating)
		this.setState({isOpenMarks: false})
		setTimeout(() => {
			this.props.onUpdate()
		}, 300)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.entryDetail,
	contestDetailState: state.contestDetail
})

export default connect(mapStateToProps, {
	fetchEntryDetail,
	saveEntryRating
})(EntryModal)