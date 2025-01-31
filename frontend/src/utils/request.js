export const request = (path, method, data) => {
	return fetch('/api' + path, {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => {
		if (!res.ok) {
			return Promise.reject(
				new Error(`Ошибка ${res.status}: ${res.statusText}`)
			)
		}
		return res.json()
	})
}
