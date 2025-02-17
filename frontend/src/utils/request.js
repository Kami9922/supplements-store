function isFormData(obj) {
	return obj instanceof FormData
}

export const request = (path, method, data) => {
	const ordinaryBody = data ? JSON.stringify(data) : undefined
	const formDataBody = isFormData(data) ? data : false

	const formDataHeaders = {
		method: method || 'GET',
		body: formDataBody || ordinaryBody,
	}
	const defaultHeaders = {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		body: formDataBody || ordinaryBody,
	}

	return fetch(
		'/api' + path,
		isFormData(data) ? formDataHeaders : defaultHeaders
	).then((res) => {
		if (!res.ok) {
			return res.json().then((err) => {
				const errorMessage =
					err.error || `Ошибка ${res.status}: ${res.statusText}`
				return Promise.reject(new Error(errorMessage))
			})
		}
		return res.json()
	})
}
