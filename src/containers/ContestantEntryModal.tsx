import * as React from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import * as ReactTooltip from 'react-tooltip'

import { fetchEntryDetail } from '../actions/entry'
import { UserActivityCarousel } from '../constants/carouselSettings'
import { ContestEntryRatingRecord, ContestEntryRecord } from '../constants/models'

import ContestAttachments from '../components/ContestAttachments'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { RootState } from '../reducers'
import { State as EntryDetailState } from '../reducers/entryDetail'

export interface ContestantEntryModalProps {
	entry: ContestEntryRecord
	state: EntryDetailState
	fetchEntryDetail: any
	onClose: any
}

export interface ContestantEntryModalState {
	selectedEntryRating: ContestEntryRatingRecord,
}

class ContestantEntryModal extends React.Component<ContestantEntryModalProps, ContestantEntryModalState> {
	public constructor(props: ContestantEntryModalProps) {
		super(props)
		
		this.state = {
			selectedEntryRating: null
		}
	}
	
	public componentDidMount() {
		this.props.fetchEntryDetail(this.props.entry._id)
	}
	
	public componentWillReceiveProps(nextProps: ContestantEntryModalProps) {
		if (nextProps.state.entry && nextProps.state.entry.ratings.length > 0) {
			this.setState({selectedEntryRating: nextProps.state.entry.ratings[0]})
		}
	}
	
	public render() {
		const {state} = this.props
		const {selectedEntryRating} = this.state
		
		return (
			<div
				id="user_activity_detail-modal"
				className="user_activity_detail-modal"
				onClick={(e: any) => {
					this.handleRootClick(e)
				}}>
				<div className="user_activity_detail-modal__body">
					{
						(state.entry && state.entry.ratings.length > 0) && (
							<div className="user_activity_items">
								<Slider {...UserActivityCarousel}>
									{
										state.entry && state.entry.ratings.map((rating: ContestEntryRatingRecord, i: number) => (
											<div
												key={i}
												className={'user_activity_item ' +
												((selectedEntryRating && selectedEntryRating._id === rating._id) ? 'selected' : '')}
												onClick={() => {
													this.selectEntryRating(rating)
												}}>
												<div className="item_img">
													<img src={rating.judge.thumbnailImageUrl}/>
													<span className="item_img__avg-mark">
														{rating.average ? rating.average.toFixed(2) : 'N/A'}</span>
												</div>
												<p className="item_name">{rating.judge.fullName}</p>
												{/*<p className="item_avg_mark">{momentDaysToGo(rating.updatedAt)}</p>*/}
												{/*<p className="item_avg_mark">Average Rating: {rating.average}</p>*/}
											</div>
										))
									}
								</Slider>
							</div>
						)
					}
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
										<ContestAttachments attachments={state.entry.attachments}/>
									</div>
									<div className="user_activity_detail_right">
										<div className="comment_tab">
											<div className="comment_tab_inner">
												{
													selectedEntryRating && (
														<div className="user_section">
															<img src={selectedEntryRating.judge.thumbnailImageUrl}/>
															<div className="user_entries">
																<p className="name">{selectedEntryRating.judge.fullName}</p>
																<p className="marks">
																	Average Rating: <b>{selectedEntryRating.average ?
																	selectedEntryRating.average.toFixed(2) : '-'}</b>
																</p>
															</div>
														</div>
													)
												}
												<div className="comment_list">
													<div className="comment_list_item">
														<p className="comment_list_item_title">Description</p>
														<p className="comment_list_item_desc">{state.entry.title}</p>
													</div>
													{
														state.entry.descriptionDesign !== '' && (
															<div className="comment_list_item">
																<p className="comment_list_item_title">
																	Design
																	{(selectedEntryRating && selectedEntryRating.designComment) &&
																	<span className="badge icon icon-ellipsis" data-tip={selectedEntryRating.designComment}/>}
																	{selectedEntryRating && <span className="badge">{selectedEntryRating.design}</span>}
																</p>
																<p
																	className="comment_list_item_desc"
																	dangerouslySetInnerHTML={{__html: state.entry.descriptionDesign}}/>
															</div>
														)
													}
													{
														state.entry.descriptionFunctionality !== '' && (
															<div className="comment_list_item">
																<p className="comment_list_item_title">
																	Functionality
																	{ (selectedEntryRating && selectedEntryRating.functionalityComment) &&
																	<span className="badge icon icon-ellipsis" data-tip={selectedEntryRating.functionalityComment}/> }
																	{ selectedEntryRating && <span className="badge">{selectedEntryRating.functionality}</span> }
																</p>
																<p
																	className="comment_list_item_desc"
																	dangerouslySetInnerHTML={{__html: state.entry.descriptionFunctionality}}/>
															</div>
														)
													}
													{
														state.entry.descriptionUsability !== '' && (
															<div className="comment_list_item">
																<p className="comment_list_item_title">
																	Manufacturability
																	{ (selectedEntryRating && selectedEntryRating.usabilityComment) &&
																	<span className="badge icon icon-ellipsis" data-tip={selectedEntryRating.usabilityComment}/>}
																	{ selectedEntryRating && <span className="badge">{selectedEntryRating.usability}</span> }
																</p>
																<p
																	className="comment_list_item_desc"
																	dangerouslySetInnerHTML={{__html: state.entry.descriptionUsability}}/>
															</div>
														)
													}
													{
														state.entry.descriptionMarketPotential !== '' && (
															<div className="comment_list_item">
																<p className="comment_list_item_title">
																	Market Potential
																	{ (selectedEntryRating && selectedEntryRating.marketPotentialComment) &&
																	<span className="badge icon icon-ellipsis" data-tip={selectedEntryRating.marketPotentialComment}/> }
																	{ selectedEntryRating && <span className="badge">{selectedEntryRating.marketPotential}</span> }
																</p>
																<p
																	className="comment_list_item_desc"
																	dangerouslySetInnerHTML={{__html: state.entry.descriptionMarketPotential}}/>
															</div>
														)
													}
													<ReactTooltip effect="solid"/>
												</div>
											</div>
										</div>
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
	
	private selectEntryRating(rating: ContestEntryRatingRecord) {
		this.setState({selectedEntryRating: rating})
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.entryDetail
})

export default connect(mapStateToProps, {
	fetchEntryDetail
})(ContestantEntryModal)