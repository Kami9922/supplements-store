export const checkUrlAndDisplayImg = (url) => {
	const baseUrl = `${window.location.protocol}//${window.location.host}/`
	if (url.includes('http')) {
		return url
	} else {
		return `${baseUrl}${url}`
	}
}
