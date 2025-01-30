export const updateProductInArray = (
	products,
	payload,
	overrideFields = false
) => {
	const productIndex = products.findIndex((item) => item.id === payload.id)

	if (productIndex === -1) {
		return products
	}

	return products.map((product, index) => {
		if (index === productIndex) {
			return {
				...product,
				...(overrideFields ? { quantity: payload.quantity } : { ...payload }),
			}
		}
		return product
	})
}
