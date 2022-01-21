// Currency Utilities

import { Currency } from '../constants/enums'

export const getCurrencySymbol = (currency: string): string => {
	switch (currency.toLowerCase()) {
		case Currency.USD:
			return '$'
		case Currency.CNY:
			return '¥'
		case Currency.KRW:
			return '₩'
		case Currency.HBB:
			return 'HBB'
		case Currency.HBS:
			return 'HBS'
		default:
			return ''
	}
}

export const getNumberWithCommas = (num: number, decimals?: number): string => {
	return num.toFixed(decimals).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}