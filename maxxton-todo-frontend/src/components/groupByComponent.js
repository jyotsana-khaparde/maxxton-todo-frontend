import React, { useState } from 'react';

const GroupByComponent = (props) => {
    const [groupByKey, setGroupByKey] = useState('')

    const handleGroupByChange = (event) => {
        console.log('handleChange 1234 ---> ', event.target.value);
        setGroupByKey(event.target.value)
        props.handleGroupByChange(event.target.value)
    }

    return (
        <div style={{ width: '23%' }}>
            <label>Group By</label><br/>
            <select
                disabled={props.heading === 'View Task'}
                name='groupByKey' 
                style={{padding: 5, margin: '15px 0px 0px 0px', width: '100%'}} 
                value={groupByKey} 
                onChange={handleGroupByChange}
            >
                <option value="">None</option>
                <option value="CreatedAt">Created On</option>
                <option value="DueDate">Pending On</option>
                <option value="Priority">Priority</option>
            </select>
        </div>
    )
}

export default GroupByComponent;