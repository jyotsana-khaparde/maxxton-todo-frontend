// CSS for modal
const styles = () => ({
    modalContainer: {
        position: 'absolute',
        width: 600,
        backgroundColor: 'white',
        margin: '160px 0px 0px 400px',
        padding: 10
    },
    searchContainer: { 
        display: 'flex', 
        alignItems: 'center' 
    },
    textFieldDiv: { 
        display: 'flex', 
        justifyContent: 'space-between' 
    },
    innerInput: { 
        display: 'flex' 
    },
    dueDate: {
        padding: 5, margin: '6px 0px 6px 0px'
    },
    dueTime: { 
        marginTop: 11 
    },
    select: {
        padding: 5, 
        margin: '15px 0px 0px 0px', 
        width: 294
    },
    buttonContainer: {
        textAlign: 'end'
    },
    cancelButton: {
        padding: 5, 
        margin: 4, 
        color: 'white', 
        background: 'grey'
    },
    title: {
        padding: 5, 
        margin: '6px 0px 6px 0px', 
        width: 588 
    },
    description: {
        padding: 5, 
        margin: '6px 0px 6px 0px', 
        width: 588, height: 100
    }
})

export default styles;