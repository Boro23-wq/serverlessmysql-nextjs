export const generateDateTime = () => {
    const date = new Date()
    return date.toISOString().split('T')[0]
}
