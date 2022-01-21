import * as React from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'

import ExpertisePackage from '../components/ExpertisePackage'
import ExpertProfile from '../components/ExpertProfile'
import Rating from '../components/Rating'

import { fetchExpertiseOrder } from '../actions/expertise'
import { galleryCarousel } from '../constants/carouselSettings'
import { ExpertiseOrderRecord, ExpertiseRecord, PackageRecord } from '../constants/models'

import { slugify } from '../utils/stringUtils'

export interface ExpertiseModalProps {
	expertise: ExpertiseRecord
	fetchExpertiseOrder: any
}

export interface ExpertiseModalState {
	expertiseOrder: ExpertiseOrderRecord
	activeExpertisePackageId: string
}

class ExpertiseModal extends React.Component<ExpertiseModalProps, ExpertiseModalState> {
	public constructor(props: ExpertiseModalProps) {
		super(props)
		
		this.state = {
			expertiseOrder: null,
			activeExpertisePackageId: (props.expertise && props.expertise.packages.length > 0) ?
				props.expertise.packages[0]._id : ''
		}
	}
	
	public componentDidMount() {
		this.getOrder(this.props.expertise._id)
	}
	
	public componentWillReceiveProps(nextProps: ExpertiseModalProps) {
		this.getOrder(nextProps.expertise._id)
		
		if (this.state.activeExpertisePackageId !== '' && (nextProps.expertise && nextProps.expertise.packages.length > 0)) {
			this.setState({activeExpertisePackageId: nextProps.expertise.packages[0]._id})
		}
	}
	
	public render() {
		const {activeExpertisePackageId, expertiseOrder} = this.state
		const expertise: ExpertiseRecord = this.props.expertise
		
		return (
			<div id="expertise-modal" className="expertise-modal" onClick={this.handleRootClick}>
				<div className="expertise-modal__body">
					<div className="expertise-detail">
						<div className="expertise-detail__content">
							<div className="expertise-detail__content__overview">
								<div className="expertise-detail__content__overview__meta">
									<h2 className="expertise-detail__content__overview__name">{expertise.name}</h2>
									
									<div className="expertise-detail__content__overview__rating">
										<Rating value={expertise.rating}/>
										<span className="rating">{expertise.rating}</span>
										<span className="reviews">(0)</span>
									</div>
									
									<div className="expertise-detail__content__overview__gallery">
										<Slider {...galleryCarousel}>
											<img src={expertise.featuredImageUrl}/>
										</Slider>
									</div>
								</div>
								
								<ExpertProfile {...expertise.expert}/>
								
								<div className="expertise-detail__content__overview__about">
									<h3 className="expertise-detail__content__overview__title">
										About this task
									</h3>
									<div
										className="expertise-detail__content__overview__content"
										dangerouslySetInnerHTML={{__html: expertise.about}}/>
								</div>
							</div>
							<div className="expertise-detail__content__packages">
								{
									expertise.packages.map((ep: PackageRecord) => (
										<ExpertisePackage
											key={ep.name}
											{...ep}
											isOpen={activeExpertisePackageId === ep._id}
											isPurchased={this.state.expertiseOrder != null &&
											this.state.expertiseOrder.selectedPackage === ep._id}
											isHidden={this.state.expertiseOrder !== null}
											onOpen={() => {
												this.handlePackageClick(ep)
											}}
											onOrder={() => {
												window.open('/expertise/' + expertise.shortId + '/' + slugify(expertise.name),
													'_blank')
											}}/>
									))
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private handleRootClick(e: any) {
		const isRoot = e.target.className.indexOf('expertise-modal') !== -1
		
		if (isRoot) {
			document.body.classList.remove('show-expertise-modal')
		}
	}
	
	private handlePackageClick(ep: PackageRecord) {
		this.setState({activeExpertisePackageId: ep._id})
	}
	
	private getOrder(id: string) {
		this.setState({expertiseOrder: null})
		this.props.fetchExpertiseOrder(id)
			.then((response: any) => response.payload)
			.then((expertiseOrder: any) => {
				if (!(expertiseOrder instanceof Error)) {
					this.setState({expertiseOrder, activeExpertisePackageId: expertiseOrder.selectedPackage})
				}
			})
	}
}

export default connect(null, {
	fetchExpertiseOrder
})(ExpertiseModal)