import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './groupBy.styles';

const GroupByComponent = (props) => {
    const { classes } = props;
    const [groupByKey, setGroupByKey] = useState('')

    const handleGroupByChange = (event) => {
        setGroupByKey(event.target.value)
        props.handleGroupByChange(event.target.value)
    }

    return (
        <div className={classes.container}>
            <label>Group By</label><br/>
            <select
                disabled={props.heading === 'View Task'}
                name='groupByKey' 
                className={classes.selectOption} 
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

export default withStyles(styles)(GroupByComponent);
