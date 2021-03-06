import moment from 'moment';

export const sortByMapping = (sortBy, isAscending, listData) => {
    let data = [...listData]
    if (sortBy === 'Title' || sortBy === 'Priority') {
        if (isAscending) {
            data.sort((a, b) => {
                let fa = a[sortBy].toLowerCase();
                let fb = b[sortBy].toLowerCase();
            
                if (fa > fb) {
                    return -1;
                }
                if (fa < fb) {
                    return 1;
                }
                return 0;
            });

            return data.length > 0 ? data : [];
            
        } else {
            data.sort((a, b) => {
                let fa = a[sortBy].toLowerCase();
                let fb = b[sortBy].toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            
            return data.length > 0 ? data : [];
        }
    }

    if (sortBy === 'CreatedAt' || sortBy === 'DueDate') {
        if (isAscending) {
            data.sort((a, b) => {
                let datea = new Date(a[sortBy]);
                let dateb = new Date(b[sortBy]);
                return dateb - datea;
            });
            return data.length > 0 ? data : [];
        } else {
            data.sort((a, b) => {
                let datea = new Date(a[sortBy]);
                let dateb = new Date(b[sortBy]);
                return datea - dateb;
            });
            return data.length > 0 ? data : [];
        }
    }
}


export const groupByMapping = (listData, groupByKey) => {
    
    let allPossibleGroupByKey = []
    let uniqueValueArray = []
    let newListObject = {}

    // seperated all possible groupByKey
    listData.map(listarrays => {
        allPossibleGroupByKey.push(listarrays[groupByKey])
    })

    if (groupByKey === 'CreatedAt') {
        let formattedCreatedAtArray = []
        allPossibleGroupByKey.map(element => {
            formattedCreatedAtArray.push(moment(element).format("YYYY-MM-DD"))
        })
        // find unique values 
        uniqueValueArray = [...new Set(formattedCreatedAtArray)];
        uniqueValueArray.map(uniqueValue => {
            let filteredData = listData.filter(listData => moment(listData[groupByKey]).format("YYYY-MM-DD") === uniqueValue)
            newListObject[uniqueValue] = filteredData
        })
    } else {
        uniqueValueArray = [...new Set(allPossibleGroupByKey)];
        uniqueValueArray.map(uniqueValue => {
            let filteredData = listData.filter(listData => listData[groupByKey] === uniqueValue);
            (groupByKey === 'DueDate' && !uniqueValue || groupByKey === 'Priority' && !uniqueValue) ? 
            newListObject[`No ${groupByKey} `] = filteredData : newListObject[uniqueValue] = filteredData
        })
    }

      return newListObject;
}
