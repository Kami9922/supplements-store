function isFormData(obj) {
	return obj instanceof FormData
}

export const request = (path, method, data) => {
	const ordinaryBody = data ? JSON.stringify(data) : undefined
	const formDataBody = isFormData(data) ? data : false

	return fetch(
		'/api' + path,
		isFormData(data)
			? {
					method: method || 'GET',
					body: formDataBody || ordinaryBody,
			  }
			: {
					headers: {
						'content-type': 'application/json',
					},
					method: method || 'GET',
					body: formDataBody || ordinaryBody,
			  }
	).then((res) => {
		if (!res.ok) {
			return Promise.reject(
				new Error(`Ошибка ${res.status}: ${res.statusText}`)
			)
		}
		return res.json()
	})
}
