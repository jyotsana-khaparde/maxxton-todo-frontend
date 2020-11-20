// CSS for listing page
const styles = () => ({
    table: {
        fontFamily: 'arial, sans-serif', 
        borderCollapse: 'collapse', 
        width: '100%', 
        marginTop: 10
    },
    tableHeading: {
        border: '1px solid #dddddd', 
        textAlign: 'left', 
        padding: 8
    },
    singleTR: { 
        textAlign: 'center' 
    },
    rowHeadingDiv: { 
        position: 'relative', 
        left: 530, 
        padding: 5 
    },
    rowHeading: {
        fontWeight: 'bold', 
        borderBottom: '1px solid grey'
    },
    sortIconDiv: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    sortIcon: { 
        padding: 2, 
        borderRadius: 5, 
        background: 'rgb(38, 131, 222)', 
        color: 'white', 
        margin: 3 
    },
    actionButtonDiv: {
        display: 'flex'
    },
    editButton: { 
        padding: 5, 
        borderRadius: 5, 
        background: 'rgb(38, 131, 222)', 
        color: 'white', 
        margin: 3 
    },
    deleteButton: { 
        padding: 5, 
        borderRadius: 5, 
        background: '#cc1717', 
        color: 'white', 
        margin: 3 
    }
})

export default styles;