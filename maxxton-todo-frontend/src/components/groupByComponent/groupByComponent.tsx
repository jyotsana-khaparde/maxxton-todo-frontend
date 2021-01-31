import React, { useState } from 'react';
import '../styles/groupBy.scss';

interface IGroupByProps {
    handleGroupByChange: (value: string) => void;
    heading?: string;
};

interface IGroupEvent {
    [propsName: string]: any
}

const GroupByComponent: React.FC<IGroupByProps> = (props: IGroupByProps) => {
    const [groupByKey, setGroupByKey] = useState<string>('')

    const handleGroupByChange = (event: IGroupEvent) => {
        setGroupByKey(event.target.value)
        props.handleGroupByChange(event.target.value)
    }

    return (
        <div className='groupContainer'>
            <label>Group By</label><br/>
            <select
                disabled={props.heading === 'View Task'}
                name='groupByKey' 
                className='selectOption'
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
