import * as React from 'react'
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
import { BusinessNeedsRecord } from '../constants/models'
import Icon from './Icon'

const expertiseItems = require('../data/expertiseItems.json').items

export interface BusinessNeedsDetailProps extends BusinessNeedsRecord {
	onDelete: any
}

export interface BusinessNeedsDetailState {
	isRender: boolean
}

export default class BusinessNeedsDetail extends React.Component<BusinessNeedsDetailProps, BusinessNeedsDetailState> {
	private moreContextTrigger: any = null
	
	public constructor(props: BusinessNeedsDetailProps) {
		super(props)
		this.state = {
			isRender: null
		}
	}
	
	public toggle() {
		this.setState({
			isRender: !this.state.isRender
		})
	}
	
	public render() {
		const {category, description, tags, bids, onDelete} = this.props
		let expertiseCategory = null
		
		if (category) {
			expertiseCategory = expertiseItems.find((ei: any) => {
				return ei.id === category._id
			})
		}
		
		return (
			<div>
				<div className="need-details-title_row">
					<div className="need-details-title_profile">
						<span>{expertiseCategory && <img src={expertiseCategory.icon}/>}</span>
					</div>
					<div className="need-details-title_name">
						<span>{description}</span>
						<div className="need-details-title_tags">
							{tags.map((tg: any, i: number) => <a key={i} href="">#{tg}</a>)}
						</div>
					</div>
					<div className="need-details-title_bids">
						<span>-</span>
					</div>
					<div className="need-details-title_amount">
						<span>-</span>
					</div>
					<div className="need-details-title_time">
						<span>-</span>
					</div>
					<div className="need-details-title_accord">
						{bids.length > 0 && <span><Icon name={this.state.isRender ? 'chevron-up' : 'chevron-down'}/></span>}
						
						<ContextMenuTrigger id="business-needs-more" ref={(c: any) => this.moreContextTrigger = c}>
							<span onClick={(e: any) => {
								if (this.moreContextTrigger) {
									this.moreContextTrigger.handleContextClick(e)
								}
							}}><Icon name="ellipsis"/></span>
						</ContextMenuTrigger>
						<ContextMenu id="business-needs-more">
							<MenuItem disabled>Promote</MenuItem>
							<MenuItem disabled>Share</MenuItem>
							<MenuItem divider/>
							<MenuItem
								attributes={{className: 'danger'}}
								onClick={() => {
									onDelete()
								}}>Delete</MenuItem>
						</ContextMenu>
					</div>
				</div>
				{/*{*/}
				{/*this.state.isRender === true && */}
				{/*<div className="accordian_box">*/}
				{/*<div className="accordian-white-box">*/}
				{/*<div className="accordian-header_row">*/}
				{/*<div className="accordian-header_profile"/>*/}
				{/*<div className="accordian-header_name">*/}
				{/*<label>NAME</label>*/}
				{/*</div>*/}
				{/*<div className="accordian-header_amount">*/}
				{/*<label>BID AMOUNT</label>*/}
				{/*</div>*/}
				{/*<div className="accordian-header_time">*/}
				{/*<label>DELIVERY TIME</label>						*/}
				{/*</div>*/}
				{/*<div className="accordian-header_button">*/}
				{/*<label></label>						*/}
				{/*</div>*/}
				{/*</div>*/}
				{/*<div className="accordian-title_row">*/}
				{/*<div className="accordian-title_profile">*/}
				{/*<span><img src="/images/expert-3.png"/></span>						*/}
				{/*</div>*/}
				{/*<div className="accordian-title_name">*/}
				{/*<label>Mitchael Watson</label>*/}
				{/*<p>Webdeveloper</p>*/}
				{/*</div>*/}
				{/*<div className="accordian-title_amount">*/}
				{/*<span>$300</span>*/}
				{/*</div>*/}
				{/*<div className="accordian-title_time">*/}
				{/*<span>5 Days</span>										*/}
				{/*</div>*/}
				{/*<div className="accordian-title_button">*/}
				{/*<button className="btn button-select-now">SELECT NOW</button>							*/}
				{/*<button className="btn button-shortlist">SHORTLIST</button>							*/}
				{/*</div>*/}
				{/*</div>*/}
				{/*<div className="accordian-title_row">*/}
				{/*<div className="accordian-title_profile">*/}
				{/*<span><img src="/images/expert-3.png"/></span>						*/}
				{/*</div>*/}
				{/*<div className="accordian-title_name">*/}
				{/*<label>Mitchael Watson</label>*/}
				{/*<p>Webdeveloper</p>*/}
				{/*</div>*/}
				{/*<div className="accordian-title_amount">*/}
				{/*<span>$300</span>*/}
				{/*</div>*/}
				{/*<div className="accordian-title_time">*/}
				{/*<span>5 Days</span>										*/}
				{/*</div>*/}
				{/*<div className="accordian-title_button">*/}
				{/*<button className="btn button-select-now">SELECT NOW</button>							*/}
				{/*<button className="btn button-shortlist">SHORTLIST</button>							*/}
				{/*</div>*/}
				{/*</div>*/}
				{/*<div className="accordian-title_row">*/}
				{/*<div className="accordian-title_profile">*/}
				{/*<span><img src="/images/expert-3.png"/></span>						*/}
				{/*</div>*/}
				{/*<div className="accordian-title_name">*/}
				{/*<label>Mitchael Watson</label>*/}
				{/*<p>Webdeveloper</p>*/}
				{/*</div>*/}
				{/*<div className="accordian-title_amount">*/}
				{/*<span>$300</span>*/}
				{/*</div>*/}
				{/*<div className="accordian-title_time">*/}
				{/*<span>5 Days</span>										*/}
				{/*</div>*/}
				{/*<div className="accordian-title_button">*/}
				{/*<button className="btn button-select-now">SELECT NOW</button>							*/}
				{/*<button className="btn button-shortlist">SHORTLIST</button>							*/}
				{/*</div>*/}
				{/*</div>*/}
				{/*</div>*/}
				{/*</div>*/}
				{/*}*/}
			</div>
		)
	}
}