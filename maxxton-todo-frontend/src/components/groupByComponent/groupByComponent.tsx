import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './groupBy.styles';

interface IGroupByProps {
    classes: {
        container: string,
        selectOption: string,
    };
    handleGroupByChange: (value: string) => void;
    heading?: string;
};

interface IGroupEvent {
    [propsName: string]: any
}

const GroupByComponent: React.FC<IGroupByProps> = (props: IGroupByProps) => {
    console.log('GroupByComponent props---', props);
    const { classes } = props;
    const [groupByKey, setGroupByKey] = useState<string>('')

    const handleGroupByChange = (event: IGroupEvent) => {
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
