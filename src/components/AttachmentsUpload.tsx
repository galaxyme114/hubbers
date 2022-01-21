import * as React from 'react'
import Dropzone from 'react-dropzone'

import { doUploadMedia } from '../actions/media'
import { InputType } from '../constants/enums'
import { ContestEntryAttachmentRecord } from '../constants/models'
import { getFileExtension } from '../utils/fileUtils'
import Input from './Input'
import Icon from './Icon'

const mime = require('mime-types')

export interface AttachmentsUploadProps {
	attachments: ContestEntryAttachmentRecord[]
	autoUpload?: boolean
	onUpload?: any
}

export interface AttachmentsUploadState {
	isUploading: boolean
	uploadProgress: number
	uploadableFiles: any
	attachments: ContestEntryAttachmentRecord[]
	selectedAttachment: ContestEntryAttachmentRecord
}

export default class AttachmentsUpload extends React.Component<AttachmentsUploadProps, AttachmentsUploadState> {
	public constructor(props: AttachmentsUploadProps) {
		super(props)
		
		this.state = {
			isUploading: false,
			uploadProgress: null,
			uploadableFiles: [],
			attachments: props.attachments || [],
			selectedAttachment: null
		}
	}
	
	public componentWillReceiveProps(nextProps: AttachmentsUploadProps) {
		if (nextProps.attachments !== this.state.attachments) {
			this.setState({attachments: nextProps.attachments})
		}
	}
	
	public render() {
		const {attachments} = this.props
		const {selectedAttachment, uploadableFiles} = this.state
		
		const previews = [...attachments, ...uploadableFiles]
		
		return (
			<div className="attachmentbox">
				<div className="attachmentbox__inner">
					<div className={'attachment__left ' + (selectedAttachment ? 'open' : '')}>
						<Dropzone onDrop={this.onDrop.bind(this)}>
							<div className="attachments-upload__items">
								{previews.map((uf: any, i: number) =>
									<div key={i}>{this.renderItem(uf)}</div>)}
							</div>
							<div className="attachment_choose_file">
								<div className="left">
									<p><b>{this.state.attachments.length}</b> of <b>12</b> attachments uploaded</p>
								</div>
								<div className="right"><p>Choose file...</p></div>
							</div>
						</Dropzone>
					</div>
					{
						selectedAttachment && (
							<div className="attachment__right">
								<div className="attachment__right_top__file">
									<p>Enter a Title and a Caption to describe the attached file to our Awards Judges</p>
									<div className="file_type">
										<Icon name="file"/>
										<span className="file_type_name">File Type: {getFileExtension(selectedAttachment.previewUrl)}</span>
									</div>
								</div>
								<div className="input-feild">
									<label>Title</label>
									<Input
										name="title"
										placeholder="Enter a title ..."
										value={selectedAttachment.title}
										type={InputType.TEXT}
										onChange={(title: string) => {
											this.updateSelectedAttachment({title})
										}}/>
								</div>
								<div className="input-feild">
									<label>Description</label>
									<Input
										name="caption"
										placeholder="Enter a description ..."
										value={selectedAttachment.caption}
										type={InputType.TEXTAREA}
										onChange={(caption: string) => {
											this.updateSelectedAttachment({caption})
										}}/>
								</div>
								<div className="savenowbtn">
									<button
										className="btn btn-outline btn-danger"
										onClick={() => this.removeSelectedAttachment()}>Delete
									</button>
									<button
										className="btn btn-outline"
										onClick={() => this.saveSelectedAttachment()}>Save Now
									</button>
								</div>
							</div>
						)
					}
				</div>
			</div>
		)
	}
	
	private renderItem(attachmentItem: any) {
		const {selectedAttachment} = this.state
		
		const isFile = (attachmentItem && attachmentItem.preview)
		const displayImageUrl = isFile ? attachmentItem.preview : attachmentItem.previewUrl
		const displayExtension = isFile ? '' : getFileExtension(displayImageUrl)
		const fileMimeType = mime.lookup(displayImageUrl)
		const isImage = fileMimeType && fileMimeType.indexOf('image') !== -1
		
		return (
			<div
				className={'upload_image_box ' + (attachmentItem === selectedAttachment ? 'active' : '')}
				onClick={(e: any) => {
					e.stopPropagation()
					this.setState({selectedAttachment: attachmentItem})
				}}>
				{
					isImage && (
						<div
							className="dummyImg"
							style={{backgroundImage: 'url(' + displayImageUrl + ')'}}/>
					)
				}
				{
					!isImage && (
						<div className="dummyImg">
							<div className="file-type__wrap">
								<Icon name="file"/>
								<span className="file-type__extension">{displayExtension}</span>
							</div>
						</div>
					)
				}
				{
					isFile && (
						<div className="attachments-upload__item__progress">
							<progress
								value={attachmentItem.progress && attachmentItem.progress < 100 ? attachmentItem.progress : null}/>
						</div>
					)
				}
			</div>
		)
	}
	
	private onDrop(files: [any]) {
		this.setState({uploadableFiles: [...this.state.uploadableFiles, ...files]})
		
		if (this.props.autoUpload) {
			this.doUpload()
		}
	}
	
	private doUpload() {
		this.setState({isUploading: true})
		
		return Promise.all(this.state.uploadableFiles.map(async (uf: any) => {
			try {
				const uploadedFile = await doUploadMedia(uf, {dimensions: {width: 720, height: 480, crop: true}},
					(uploadProgress: number) => {
						uf.uploadProgress = uploadProgress
						this.setState({})
					})
				
				const uploadableFiles = this.state.uploadableFiles
				uploadableFiles.splice(uploadableFiles.indexOf(uf), 1)
				this.props.onUpload([...this.props.attachments,
					{title: uploadedFile[0].originalName, caption: '', previewUrl: uploadedFile[0].url}])
				this.setState({uploadableFiles})
				
				return uploadedFile
			} catch (error) {
				console.log('attachments upload error', error)
			}
		})).then(() => {
			this.setState({isUploading: false, uploadableFiles: []})
		})
	}
	
	private updateSelectedAttachment(updatedState: Partial<ContestEntryAttachmentRecord>) {
		const selectedAttachment = {...this.state.selectedAttachment, ...updatedState}
		
		this.setState({selectedAttachment})
	}
	
	private saveSelectedAttachment() {
		const {attachments, selectedAttachment} = this.state
		
		const foundAttachment = attachments.find(a => a._id === selectedAttachment._id)
		const foundAttachmentIndex = attachments.indexOf(foundAttachment)
		
		if (foundAttachmentIndex >= 0) {
			attachments[foundAttachmentIndex] = selectedAttachment
			this.props.onUpload(attachments)
			this.setState({attachments, selectedAttachment: null})
		}
	}
	
	private removeSelectedAttachment() {
		const {attachments, selectedAttachment} = this.state
		
		const foundAttachment = attachments.find(a => a._id === selectedAttachment._id)
		const foundAttachmentIndex = attachments.indexOf(foundAttachment)
		attachments.splice(foundAttachmentIndex, 1)
		this.props.onUpload(attachments)
		this.setState({attachments, selectedAttachment: null})
	}
}