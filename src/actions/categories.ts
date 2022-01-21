import { EXPERTISE_CATEGORY_LIST_API, SKILLS_API } from '../constants/api'
import { SkillRecord } from '../constants/models'
import http from '../utils/httpService'

/**
 * Helper function to fetch all skills
 *
 * @returns {Promise<any>}
 */
export const doGetSkills = () => {
	return new Promise<any>((resolve, reject) => {
		http.get(`${SKILLS_API}`)
			.then(response => response.data)
			.then((skills: ReadonlyArray<SkillRecord>) => {
				resolve({options: skills})
			})
			.catch(error => reject(error))
	})
}

/**
 * Helper function to fetch a single expertise
 *
 * @returns {Promise<any>}
 */
export const doGetExpertiseCategory = (parentId: number) => {
	return new Promise<any>((resolve, reject) => {
		http.get(`${EXPERTISE_CATEGORY_LIST_API}/${parentId}`)
			.then(response => response.data)
			.then(categories => {
				categories.map((c: any) => {
					c.id = c._id
					return c
				})
				resolve({options: categories})
			})
			.catch(error => reject(error))
	})
}