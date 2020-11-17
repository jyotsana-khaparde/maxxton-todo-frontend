import React, {Component} from 'react';

class ListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    handleTrClick = (dataLists) => {
        console.log('dataLists:-----', dataLists);
    }

    render() {
        return (
            <>
                <table style={{fontFamily: 'arial, sans-serif', borderCollapse: 'collapse', width: '100%', marginTop: 10}}>
                    <tr>
                        <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Summary</th>
                        <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Priority</th>
                        <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Created On</th>
                        <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Due Date</th>
                        <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Actions</th>
                    </tr>
                    {dataList.map(dataLists => (
                        <tr onClick={() => this.handleTrClick(dataLists)}>
                            <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{dataLists.Title}</td>
                            <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{dataLists.Priority}</td>
                            <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{dataLists.CreatedAt}</td>
                            <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{dataLists.DueDate}</td>
                            <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{'done'}</td>
                        </tr>
                    ))}
                </table>
            </>
        )
    }
}

export default ListPage;

let dataList = [
    {
      "id": 1,
      "CurrentState": "json-server",
      "Title": "typicode",
      "Description": "",
      "CreatedAt": "",
      "DueDate": "",
      "Priority": ""
    },
    {
      "id": 2,
      "CurrentState": "json-server",
      "Title": "typicode",
      "Description": "",
      "CreatedAt": "",
      "DueDate": "",
      "Priority": ""
    },
    {
      "id": 6,
      "CurrentState": "Pending",
      "Title": "my first title",
      "Description": "my first Description",
      "CreatedAt": "November 17, 2020",
      "DueDate": "2017-05-12T10:30",
      "Priority": "coconut"
    },
    {
      "id": "aacfcfbe-30d0-4e97-99b1-0ea57ea24324",
      "CurrentState": "Pending",
      "Title": "second title",
      "Description": "second Description",
      "CreatedAt": "November 17, 2020",
      "DueDate": "2017-05-05T10:32",
      "Priority": "mango"
    },
    {
      "id": "11b7825c-b787-4a67-b6b9-dff6c1945406",
      "CurrentState": "Pending",
      "Title": "",
      "Description": "",
      "CreatedAt": "November 17, 2020",
      "DueDate": "2017-05-24T10:30",
      "Priority": ""
    }
  ]
