import * as React from 'react'
import Dropzone from 'react-dropzone'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import { doUploadMedia } from '../actions/media'
import Input from '../components/Input'
import { availabilityScopeOptions } from '../constants/selectOptions'

import { Currency, InputType } from '../constants/enums'
import { State as ExpertiseDetailDataState } from '../reducers/expertiseDetail'
import { RootState } from '../reducers/index'

import { doGetExpertiseCategory } from '../actions/categories'
import { fetchExpertiseDetail, updateExpertise } from '../actions/expertise'
import Icon from '../components/Icon'
import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { FAQRecord, PackageRecord } from '../constants/models'
import { cleanObject, slugify } from '../utils/stringUtils'

interface CreateExpertiseMatchParams {
	shortId: string
}

interface CreateExpertiseProps extends Partial<RouteComponentProps<CreateExpertiseMatchParams>> {
	state: ExpertiseDetailDataState
	fetchExpertiseDetail: any
	updateExpertise: any
}

interface CreateExpertiseState {
	name: string
	slug: string
	about: string
	category: string
	tags: string[]
	gallery: string[]
	
	packages: PackageRecord[]
	faq: FAQRecord[]
	isDraft: boolean
	
	isUploading: boolean
	uploadableFiles: any[]
	
	tabIndex: number
}

class CreateExpertise extends React.Component<CreateExpertiseProps, CreateExpertiseState> {
	public constructor(props: CreateExpertiseProps) {
		super(props)
		
		this.state = {
			name: '',
			slug: '',
			about: '',
			category: '',
			tags: [],
			
			gallery: [],
			
			packages: [{
				name: '',
				price: 0,
				currency: Currency.USD,
				description: '',
				availability: '',
				delivery: 0
			}],
			faq: [{title: '', answer: ''}],
			isDraft: true,
			
			isUploading: false,
			uploadableFiles: [],
			
			tabIndex: 0
		}
	}
	
	public componentDidMount() {
		const expertiseShortId = this.props.match.params.shortId
		this.props.fetchExpertiseDetail(expertiseShortId, true)
	}
	
	public componentWillReceiveProps(nextProps: CreateExpertiseProps) {
		if (nextProps.state.expertise && (nextProps.state.expertise !== this.props.state.expertise)) {
			const {name, slug, about, category, tags, gallery, isDraft} = nextProps.state.expertise
			let {packages, faq} = nextProps.state.expertise
			
			if (packages.length === 0) {
				packages = [{
					name: 'Basic',
					price: 0,
					currency: Currency.USD,
					description: '',
					availability: '',
					delivery: 0
				}, {
					name: 'Standard',
					price: 0,
					currency: Currency.USD,
					description: '',
					availability: '',
					delivery: 0
				}, {
					name: 'Advanced',
					price: 0,
					currency: Currency.USD,
					description: '',
					availability: '',
					delivery: 0
				}]
			}
			
			if (faq.length === 0) {
				faq = [{title: '', answer: ''}]
			}
			
			this.setState({...cleanObject({name, slug, about, category, tags, packages, gallery, faq}), isDraft})
		}
	}
	
	public render() {
		const {state} = this.props
		
		return (
			<div>
				<Helmet>
					<title>Expertise | Hubbers - Hub of Makers</title>
				</Helmet>
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
					state.status === ActionTypeStates.FAILED && (
						<div className="page-loading">
							<div>
								<em>Unable to edit this expertise</em>
							</div>
						</div>
					)
				}
				{
					state.expertise && state.status === ActionTypeStates.SUCCESS && (
						<div>
							<div className="expertise-page-heading">
								{/*<div className="container">*/}
								{/*<h1 className="expertise-page-heading__title">Create a new Expertise</h1>*/}
								{/*</div>*/}
							</div>
							
							<div className="expertise-wrap">
								<div className="expertise-container">
									<div className="expertise-section">
										<div className="expertise-section__tabs">
											{state.expertise.isDraft && <div className="badge">DRAFT</div>}
											<Tabs
												selectedIndex={this.state.tabIndex}
												onSelect={(tabIndex: number) => {
													this.setState({tabIndex})
												}}>
												<TabList>
													<Tab>
														<div className="expertise-section__tabmenu">
															<span className="countnumber">1</span>Overview
														</div>
													</Tab>
													<Tab>
														<div className="expertise-section__tabmenu">
															<span className="countnumber">2</span>Pricing
														</div>
													</Tab>
													<Tab>
														<div className="expertise-section__tabmenu">
															<span className="countnumber">3</span>FAQ
														</div>
													</Tab>
													<Tab>
														<div className="expertise-section__tabmenu">
															<span className="countnumber">4</span>Gallery
														</div>
													</Tab>
													{
														this.state.isDraft && (
															<Tab>
																<div className="expertise-section__tabmenu">
																	<span className="countnumber">5</span>Publish
																</div>
															</Tab>
														)
													}
												</TabList>
												<TabPanel>
													<div className="expertise-section__overview_detial__body">
														<div className="expertise-section__overview_detial__row">
															<div className="expertise-section__overview_detial__labelbox">
																<label>Title</label>
															</div>
															<div className="expertise-section__overview_detial__describefeild">
																<Input
																	name="title"
																	placeholder="Define your expertise"
																	value={this.state.name}
																	type={InputType.TEXTAREA}
																	onChange={(name: string) => {
																		if (name.length <= 120) {
																			if ((this.state.slug === '' || slugify(this.state.name) === this.state.slug)
																				&& this.state.slug.length <= 40) {
																				this.setState({name, slug: slugify(name)})
																			} else {
																				this.setState({name})
																			}
																		}
																	}}/>
																<div className="max_min_value">
																	<span>{this.state.name.length} / 120 max</span>
																</div>
															</div>
														</div>
														<div className="expertise-section__overview_detial__row">
															<div className="expertise-section__overview_detial__labelbox">
																<label>Slug</label>
															</div>
															<div className="expertise-section__overview_detial__describefeild">
																<Input
																	name="slug"
																	placeholder=""
																	value={this.state.slug}
																	type={InputType.TEXT}
																	onChange={(slug: string) => {
																		if (slugify(slug).length <= 40) {
																			this.setState({slug: slugify(slug)})
																		}
																	}}/>
															</div>
														</div>
														<div className="expertise-section__overview_detial__row">
															<div className="expertise-section__overview_detial__labelbox">
																<label>Description</label>
															</div>
															<div className="expertise-section__overview_detial__describefeild long">
																<Input
																	name="about"
																	placeholder="Describe your expertise"
																	value={this.state.about}
																	type={InputType.TEXTAREA}
																	onChange={(about: string) => {
																		if (about.length <= 1200) {
																			this.setState({about})
																		}
																	}}/>
																<div className="max_min_value">
																	<span>{this.state.about.length} / 1200 max</span>
																</div>
															</div>
														</div>
														<div className="expertise-section__overview_detial__row_category">
															<div className="expertise-section__overview_detial__labelbox">
																<label>Category</label>
															</div>
															<div className="expertise-section__overview_detial__inputfeilds">
																<div className="expertise-section__overview_detial__inputfeilds__row">
																	<Input
																		name="category"
																		placeholder="Select a Category"
																		value={this.state.category}
																		multi={false}
																		type={InputType.ASYNC_SELECT}
																		options={doGetExpertiseCategory}
																		simpleValue={true}
																		onChange={(category: string) => {
																			this.setState({category})
																		}}/>
																</div>
															</div>
														</div>
														<div className="expertise-section__overview_detial__row_category">
															<div className="expertise-section__overview_detial__labelbox">
																<label>Tags</label>
															</div>
															<div className="expertise-section__overview_detial__inputfeilds">
																<div className="expertise-section__overview_detial__inputfeilds__row">
																	<Input
																		name="tags"
																		placeholder="Enter up to 5 tags"
																		value={this.state.tags}
																		type={InputType.TAGS}
																		onChange={(tags: any) => {
																			this.setState({tags})
																		}}/>
																</div>
															</div>
														</div>
													</div>
													<div className="expertise-section__row_back-continue">
														<div className="expertise-section__back-continue_inner">
															<button
																disabled={!this.isValid(0)}
																className="btn btn-medium btn-cta continuebtn"
																onClick={() => {
																	this.saveAndProceed(1)
																}}>
																{this.state.isDraft ? 'Continue' : 'Save'}
															</button>
														</div>
													</div>
												</TabPanel>
												<TabPanel>
													{/*<div className="expertise-section__pricing_detial__heading">*/}
													{/*<p>Scope and Pricing</p>*/}
													{/*</div>*/}
													<div className="expertise-section__pricing_detial__subheading">
														<p>Packages</p>
														<button
															disabled={this.state.packages.length >= 3}
															onClick={() => {
																this.addPackage()
															}}
															className="btn btn-outline">Add Package
														</button>
													</div>
													<div className="expertise-section__pricing_detial__body">
														<div className="expertise-section__pricing_detial__inner_row_first">
															<div className="expertise-section__pricing_detial__inner_left">
																<div className="expertise-section__pricing_detial__inner_row">
																	<div className="expertise-section__pricing_basic_section_row">
																		<div className="expertise-section__pricing_basic_section_left"/>
																		{
																			this.state.packages.map((p: PackageRecord, i: number) => (
																				<div className="expertise-section__pricing_basic_section_right" key={i}>
																					<div className="expertise-section__pricing_basic_section_right_package1-box">
																						<div
																							className="expertise-section__pricing_basic_section_right_package1-title">
																							<Input
																								name="name"
																								placeholder="Enter package name"
																								value={p.name}
																								type={InputType.TEXT}
																								onChange={(name: string) => {
																									this.updatePackage(i, {name})
																								}}/>
																							{
																								this.state.packages.length > 1 && (
																									<div
																										onClick={() => {
																											this.removePackage(i)
																										}}
																										className="expertise-section__pricing_basic_section_right_package1-delete">
																										<Icon name="close"/>
																									</div>
																								)
																							}
																						</div>
																					</div>
																					<div
																						className="expertise-section__pricing_basic_section_right_testsomething-box">
																						<div
																							className="expertise-section__pricing_basic_section_right_testsomething-title">
																							<Input
																								name="description"
																								placeholder="Enter package description"
																								value={p.description}
																								type={InputType.TEXTAREA}
																								onChange={(description: string) => {
																									this.updatePackage(i, {description})
																								}}/>
																						</div>
																					</div>
																					<div className="expertise-section__pricing_basic_section_right_deliveryday">
																						<Input
																							name="availability"
																							placeholder="Select your availability"
																							value={p.availability}
																							multi={false}
																							type={InputType.SELECT}
																							options={availabilityScopeOptions}
																							simpleValue={true}
																							onChange={(availability: string) => {
																								this.updatePackage(i, {availability})
																							}}/>
																					</div>
																				</div>
																			))
																		}
																	</div>
																	<div className="expertise-section__pricing_pages-screenrecord_row">
																		<div className="expertise-section__pricing_pages-screenrecord_left">
																			<p>Delivery (days)</p>
																		</div>
																		{
																			this.state.packages.map((p: PackageRecord, i: number) => (
																				<div className="expertise-section__pricing_pages-screenrecord_right" key={i}>
																					<div className="expertise-section__pricing_pages-screenrecord_right_inner">
																						<Input
																							name="delivery"
																							placeholder="Enter delivery days"
																							value={p.delivery}
																							type={InputType.NUMBER}
																							onChange={(delivery: number) => {
																								this.updatePackage(i, {delivery})
																							}}/>
																					</div>
																				</div>
																			))
																		}
																	</div>
																	<div className="expertise-section__pricing_pages-screenrecord_row">
																		<div className="expertise-section__pricing_pages-screenrecord_left">
																			<p>Price (USD)</p>
																		</div>
																		{
																			this.state.packages.map((p: PackageRecord, i: number) => (
																				<div className="expertise-section__pricing_pages-screenrecord_right" key={i}>
																					<div className="expertise-section__pricing_pages-screenrecord_right_inner">
																						<Input
																							name="price"
																							placeholder="Enter price in USD"
																							value={p.price}
																							type={InputType.NUMBER}
																							onChange={(price: number) => {
																								this.updatePackage(i, {price})
																							}}/>
																					</div>
																				</div>
																			))
																		}
																	</div>
																</div>
															</div>
															{/*<div className="expertise-section__pricing_detial__inner_right">*/}
															{/*<div className="expertise-section__pricing_detial__inner_right_potential_box">*/}
															{/*<p>Unlock your potential revenue with all 3 Packages</p>*/}
															{/*<div className="trynowbtn_box">*/}
															{/*<button className="btn">Try Now</button>*/}
															{/*</div>*/}
															{/*<button className="btn btn-medium btn-cta learnmorebtn">Learn More</button>*/}
															{/*</div>*/}
															{/*</div>*/}
														</div>
													</div>
													<div className="expertise-section__row_back-continue no-border">
														<div className="expertise-section__back-continue_inner">
															<button
																className="btn btn-medium btn-cta backbtn"
																onClick={() => {
																	this.setState({tabIndex: 0})
																}}><Icon name="chevron-left"/>Back
															</button>
															<button
																disabled={!this.isValid(1)}
																className="btn btn-medium btn-cta continuebtn"
																onClick={() => {
																	this.saveAndProceed(2)
																}}>
																{this.state.isDraft ? 'Continue' : 'Save'}
															</button>
														</div>
													</div>
												</TabPanel>
												<TabPanel>
													<div className="expertise-section__gallary_detial__body">
														<div className="expertise-section__gallary_detial__heading">
															<div className="expertise-section__gallary__heading">
																<p>Frequently asked questions</p>
															</div>
															<div className="expertise-section__gallary__caption">
																<p>Add questions and answers for your buyers</p>
															</div>
														</div>
														<div className="expertise-section__faq__row">
															{
																this.state.faq.map((faq: FAQRecord, i: number) => (
																	<div className="expertise-section__faq__item" key={i}>
																		<div className="expertise-section__faq__item__label">
																			<label>FAQ {i + 1}</label>
																		</div>
																		<div className="expertise-section__faq__item__field">
																			<div>
																				<Input
																					name="faqTitle"
																					placeholder="Question"
																					value={faq.title}
																					type={InputType.TEXT}
																					onChange={(title: string) => {
																						this.updateFaq(i, {title})
																					}}/>
																			</div>
																			<div>
																				<Input
																					name="faqAnswer"
																					placeholder="Answer"
																					value={faq.answer}
																					type={InputType.TEXTAREA}
																					onChange={(answer: string) => {
																						this.updateFaq(i, {answer})
																					}}/>
																			</div>
																		</div>
																	</div>
																))
															}
															<div className="expertise-section__faq__add">
																<button
																	className="btn btn-medium btn-cta"
																	disabled={
																		this.state.faq[this.state.faq.length - 1].title === ''
																		|| this.state.faq[this.state.faq.length - 1].answer === ''
																	}
																	onClick={() => {
																		this.addFaq()
																	}}>Add FAQ
																</button>
															</div>
														</div>
													</div>
													<div className="expertise-section__row_back-continue">
														<div className="expertise-section__back-continue_inner">
															<button
																className="btn btn-medium btn-cta backbtn"
																onClick={() => {
																	this.setState({tabIndex: 1})
																}}><Icon name="chevron-left"/>Back
															</button>
															<button
																disabled={!this.isValid(2)}
																className="btn btn-medium btn-cta continuebtn"
																onClick={() => {
																	this.saveAndProceed(3)
																}}>
																{this.state.isDraft ? 'Continue' : 'Save'}
															</button>
														</div>
													</div>
												</TabPanel>
												<TabPanel>
													<div className="expertise-section__gallary_detial__body">
														<div className="expertise-section__gallary_detial__heading">
															<div className="expertise-section__gallary__heading">
																<p>Build your gallery</p>
															</div>
															<div className="expertise-section__gallary__caption">
																<p>Add amazing content to your gallery to set you apart from your competitors</p>
															</div>
														</div>
														<div className="expertise-section__gallary_detial__headingtext">
															<p className="uploadheading_title">Upload photos that describe your expertise</p>
															<p className="uploadheading_count">{this.state.gallery.length}/6</p>
														</div>
														{
															this.state.gallery.length > 0 && (
																<div className="expertise-section__gallary_detial__row">
																	{
																		this.state.gallery.map((g: string, i: number) => (
																			<div className="expertise-section__gallary_detial__uploadimg" key={i}>
																				<div className="upload_dummy_img" style={{backgroundImage: 'url(' + g + ')'}}/>
																				<span
																					onClick={() => {
																						this.removeGalleryItem(i)
																					}}
																					className="expertise-section__gallary_detial__uploadimg__remove">
																					<Icon name="close"/>
																				</span>
																			</div>
																		))
																	}
																</div>
															)
														}
														{
															this.state.gallery.length < 6 && (
																<div className="expertise-section__gallary_detial__row">
																	<div className="expertise-section__gallary_detial__dropzone">
																		<Dropzone onDrop={this.onDrop.bind(this)}>
																			{
																				(this.state.uploadableFiles.length === 0 && !this.state.isUploading) && (
																					<div className="dropzone-placeholder">
																						<span className="icon icon-camera"/>
																						<p className="drag-label">Drag photo or</p>
																						<span className="browse-label">Browse...</span>
																					</div>
																				)
																			}
																		</Dropzone>
																		{
																			this.state.uploadableFiles.map((f: any, i: number) => (
																				<div className="expertise-section__gallary_detial__uploadimg" key={i}>
																					<div
																						className="upload_dummy_img"
																						style={{backgroundImage: 'url(' + f.preview + ')'}}/>
																				</div>
																			))
																		}
																	</div>
																</div>
															)
														}
														{
															(this.state.uploadableFiles.length > 0 && !this.state.isUploading) && (
																<div className="expertise-section__gallary_detial__controls">
																	<button
																		className="btn btn-outline btn-danger"
																		onClick={() => {
																			this.cancelUpload()
																		}}>Cancel
																	</button>
																	<button
																		className="btn"
																		onClick={() => {
																			this.doUpload()
																		}}>Upload
																	</button>
																</div>
															)
														}
														<div className="expertise-section__row_back-continue">
															<div className="expertise-section__back-continue_inner">
																<button
																	className="btn btn-medium btn-cta backbtn"
																	onClick={() => {
																		this.setState({tabIndex: 2})
																	}}>
																	<Icon name="chevron-left"/>Back
																</button>
																<button
																	disabled={!this.isValid(3)}
																	className="btn btn-medium btn-cta continuebtn"
																	onClick={() => {
																		this.saveAndProceed(4)
																	}}>
																	{this.state.isDraft ? 'Continue' : 'Save'}
																</button>
															</div>
														</div>
													</div>
												</TabPanel>
												{
													this.state.isDraft && (
														<TabPanel>
															<div className="expertise-section__publish_detial__body">
																<div className="expertise-section__publish_detial__inner">
																	<div className="expertise-section__publish_heading">
																		<p>You are almost done!</p>
																	</div>
																	<div className="expertise-section__publish_desc">
																		<p>
																			You have created a new expertise under your profile. <br/>
																			Once it's published, it will be immediately available on the Marketplace.
																		</p>
																	</div>
																</div>
															</div>
															<div className="expertise-section__row_back-continue">
																<div className="expertise-section__back-continue_inner">
																	<button
																		className="btn btn-medium btn-cta backbtn"
																		onClick={() => {
																			this.setState({tabIndex: 3})
																		}}>
																		<Icon name="chevron-left"/>Back
																	</button>
																	<button
																		disabled={!this.isValid()}
																		className="btn btn-medium btn-cta continuebtn"
																		onClick={() => {
																			this.doSave()
																		}}>Publish
																	</button>
																</div>
															</div>
														</TabPanel>
													)
												}
											</Tabs>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				}
			</div>
		)
	}
	
	private updatePackage(index: number, updatedPackageObject: Partial<PackageRecord>) {
		const packages = this.state.packages
		packages[index] = {...packages[index], ...updatedPackageObject}
		
		this.setState({packages})
	}
	
	private addPackage() {
		const newPackage = {
			name: '',
			price: 0,
			currency: Currency.USD,
			description: '',
			availability: '',
			delivery: 0
		}
		
		this.setState({packages: [...this.state.packages, newPackage]})
	}
	
	private removePackage(index: number) {
		const packages = [...this.state.packages]
		packages.splice(index, 1)
		
		this.setState({packages})
	}
	
	private updateFaq(index: number, updatedFaq: Partial<FAQRecord>) {
		const faq = this.state.faq
		faq[index] = {...faq[index], ...updatedFaq}
		
		this.setState({faq})
	}
	
	private addFaq() {
		this.setState({faq: [...this.state.faq, {title: '', answer: ''}]})
	}
	
	private removeGalleryItem(index: number) {
		const gallery = this.state.gallery
		gallery.splice(index, 1)
		
		this.setState({gallery})
	}
	
	private saveAndProceed(tabIndex: number) {
		const {state} = this.props
		const {name, slug, about, category, tags, packages, gallery, faq} = this.state
		
		if (state.expertise) {
			this.props.updateExpertise(state.expertise._id,
				cleanObject({name, slug, about, tags, category, packages, gallery, faq}))
			
			if (this.state.isDraft) {
				this.setState({tabIndex})
			}
		}
	}
	
	private doSave() {
		const {state} = this.props
		const {name, slug, about, category, tags, packages, gallery, faq} = this.state
		
		if (state.expertise) {
			this.props.updateExpertise(state.expertise._id,
				{...cleanObject({name, slug, about, tags, category, packages, gallery, faq}), isDraft: true})
				.then(() => {
					this.props.history.push(`/expertise/${state.expertise.shortId}/${state.expertise.slug}`)
				})
		}
	}
	
	private onDrop(uploadableFiles: any[]) {
		console.log(uploadableFiles)
		this.setState({uploadableFiles: uploadableFiles.slice(0, (6 - this.state.gallery.length))})
	}
	
	private doUpload() {
		this.setState({isUploading: true})
		
		return Promise.all(this.state.uploadableFiles.map(async (uf: any) => {
			try {
				return await doUploadMedia(uf, {dimensions: {width: 720, height: 480, crop: true}})
			} catch (error) {
				console.log('error', error)
			}
		})).then((response: any) => {
			const uploadedFiles = response.map((r: any[]) => r[0].url)
			this.setState({gallery: [...this.state.gallery, ...uploadedFiles], isUploading: false, uploadableFiles: []})
		})
	}
	
	private cancelUpload() {
		this.setState({isUploading: false, uploadableFiles: []})
	}
	
	private isValid(step?: number) {
		const {name, slug, about, category, tags, gallery, faq, packages} = this.state
		let isValid = name && slug && about && category && tags.length > 0 && faq.length > 0 && gallery.length > 0
		
		if (typeof (step) !== 'undefined') {
			switch (step) {
				case 0:
					isValid = name && slug && about && category && tags.length > 0
					break
				case 1:
					isValid = true
					packages.map((p: PackageRecord) => {
						isValid = (p.name.length > 0 && p.price > 0 && p.description.length > 0
							&& p.delivery > 0 && p.availability.length > 0)
					})
					break
				case 2:
					isValid = faq.length > 0
					break
				case 3:
					isValid = gallery.length > 0
					break
			}
		}
		
		return isValid
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.expertiseDetail
})

export default connect(mapStateToProps, {
	fetchExpertiseDetail,
	updateExpertise
})(CreateExpertise)