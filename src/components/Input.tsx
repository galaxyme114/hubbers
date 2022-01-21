import * as React from 'react'
import Phone from 'react-phone-number-input'
import Select, { Async as AsyncSelect } from 'react-select'
import * as TagsInput from 'react-tagsinput'

import { InputType } from '../constants/enums'

interface InputState {
	isPristine: boolean
	isMissing: boolean
	isInvalid: boolean
}

interface InputProps {
	name: string
	value: any
	type: InputType
	required?: boolean
	placeholder?: string
	prefix?: string
	label?: string
	description?: string
	span?: number
	options?: any
	multi?: boolean
	simpleValue?: boolean
	onChange?: any
	onFocusLost?: any
	disabled?: boolean
}

export default class Input extends React.Component<InputProps, InputState> {
	public constructor(props: InputProps) {
		super(props)
		
		this.state = {
			isPristine: true,
			isMissing: false,
			isInvalid: false
		}
	}
	
	public render() {
		const {name, placeholder, type, value, span, label, options, multi, simpleValue, description, disabled} = this.props
		const {isPristine, isInvalid, isMissing} = this.state
		
		return (
			<div className={'input ' + (span ? 'span-' + span : 'span-1')}>
				{
					label && <label>{label}</label>
				}
				{
					description && <small>{description}</small>
				}
				{
					type === InputType.TEXTAREA && (
						<textarea
							className="form-input"
							name={name}
							placeholder={placeholder}
							value={value ? value : ''}
							onChange={(e: any) => {
								if (this.props.onChange) {
									this.props.onChange(e.target.value)
								}
								this.performRequiredValidation(e.target.value)
							}}
							onBlur={() => {
								if (this.props.onFocusLost) {
									this.props.onFocusLost()
								}
								this.performRequiredValidation(value)
							}}/>
					)
				}
				{
					(type === InputType.TEXT || type === InputType.EMAIL ||
						type === InputType.NUMBER || type === InputType.PASSWORD) && (
						<input
							className="form-input"
							name={name}
							readOnly={disabled}
							placeholder={placeholder}
							type={type}
							value={value}
							onChange={(e: any) => {
								if (this.props.onChange) {
									this.props.onChange(e.target.value)
								}
								this.performRequiredValidation(e.target.value)
							}}
							onBlur={() => {
								if (this.props.onFocusLost) {
									this.props.onFocusLost()
								}
								this.performRequiredValidation(value)
							}}/>
					)
				}
				{
					type === InputType.PHONE && (
						<Phone
							className="form-input"
							placeholder={placeholder}
							value={value}
							onChange={(v: any) => {
								if (this.props.onChange) {
									this.props.onChange(v)
								}
							}}/>
					)
				}
				{
					(type === InputType.SELECT && options) && (
						<Select
							name={name}
							value={value}
							placeholder={placeholder}
							options={options}
							multi={multi}
							simpleValue={simpleValue}
							onChange={(o: any) => {
								if (this.props.onChange) {
									this.props.onChange(o)
								}
								setTimeout(() => {
									if (this.props.onFocusLost) {
										this.props.onFocusLost()
									}
								}, 250)
							}}/>
					)
				}
				{
					(type === InputType.ASYNC_SELECT && options) && (
						<AsyncSelect
							name={name}
							value={value}
							placeholder={placeholder}
							autoload
							loadOptions={options}
							valueKey="id"
							labelKey="name"
							multi={multi}
							simpleValue={simpleValue}
							onChange={(o: any) => {
								if (this.props.onChange) {
									this.props.onChange(o)
								}
								setTimeout(() => {
									if (this.props.onFocusLost) {
										this.props.onFocusLost()
									}
								}, 250)
							}}/>
					)
				}
				{
					type === InputType.TAGS && (
						<TagsInput value={value} inputProps={{name, placeholder, disabled}} maxTags={5} onChange={(tags: any) => {
							if (this.props.onChange) {
								this.props.onChange(tags)
							}
							setTimeout(() => {
								if (this.props.onFocusLost) {
									this.props.onFocusLost()
								}
							}, 250)
						}}/>
					)
				}
				{
					isMissing && (
						<span className="input-error">This field is required</span>
					)
				}
				{
					isInvalid && (
						<span className="input-error">This field is incorrect</span>
					)
				}
			</div>
		)
	}
	
	private performRequiredValidation(value: any) {
		const {required} = this.props
		const {isPristine} = this.state
		
		if (!required) {
			return
		}
		
		if (isPristine) {
			this.setState({isPristine: false})
		} else if (!isPristine && value.length === 0) {
			this.setState({isMissing: true})
		} else {
			this.setState({isMissing: false})
		}
	}
}