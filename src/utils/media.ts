/**
 * Find the orientation of an uploaded image
 *
 * @param {File} file
 * @returns {Promise<number>}
 */
export const getOrientation = (file: File) => {
	return new Promise<number>((resolve) => {
		const reader = new FileReader()
		reader.onload = (e) => {
			const view = new DataView(e.target.result)
			
			if (view.getUint16(0, false) !== 0xFFD8) {
				return resolve(-2)
			}
			
			const length = view.byteLength
			let offset = 2
			
			while (offset < length) {
				if (view.getUint16(offset + 2, false) <= 8) {
					return resolve(-1)
				}
				const marker = view.getUint16(offset, false)
				offset += 2
				if (marker === 0xFFE1) {
					if (view.getUint32(offset += 2, false) !== 0x45786966) {
						return resolve(-1)
					}
					
					const little = view.getUint16(offset += 6, false) === 0x4949
					offset += view.getUint32(offset + 4, little)
					const tags = view.getUint16(offset, little)
					offset += 2
					for (let i = 0; i < tags; i++) {
						if (view.getUint16(offset + (i * 12), little) === 0x0112) {
							return resolve(view.getUint16(offset + (i * 12) + 8, little))
						}
					}
					/* tslint:disable */
				} else if ((marker & 0xFF00) !== 0xFF00) { /* tslint:enable */
					break
				} else {
					offset += view.getUint16(offset, false)
				}
			}
			return resolve(-1)
		}
		
		reader.readAsArrayBuffer(file)
	})
}
