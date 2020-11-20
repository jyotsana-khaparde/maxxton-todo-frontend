import moment from 'moment';

export const sortByMapping = (sortBy, isAscending, listData) => {
    console.log('1----sortBy---> ', sortBy);
    console.log('1----isAscending---> ', isAscending);
    console.log('1----listData---> ', listData);
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

            console.log('12----isAscending-true--->', data)
            return data;
            
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
            
            console.log('12----sAscending-false--->', data)
            return data;
        }
    }

    if (sortBy === 'CreatedAt' || sortBy === 'DueDate') {
        if (isAscending) {
            data.sort((a, b) => {
                let datea = new Date(a[sortBy]);
                let dateb = new Date(b[sortBy]);
                return dateb - datea;
            });
            console.log('12----sAscending-true--->', data)
            return data;
        } else {
            data.sort((a, b) => {
                let datea = new Date(a[sortBy]);
                let dateb = new Date(b[sortBy]);
                return datea - dateb;
            });
            console.log('12----sAscending-false--->', data)
            return data;
        }
    }
}


export const groupByMapping = (listData, groupByKey) => {
    console.log('listData ------>',listData);
    console.log('groupByKey ------>',groupByKey);
    
    let allPossibleGroupByKey = []
    let uniqueValueArray = []
    let newListObject = {}

    // seperated all possible groupByKey
    listData.map(listarrays => {
          allPossibleGroupByKey.push(listarrays[groupByKey])
    })
    console.log('allPossibleGroupByKey------', allPossibleGroupByKey);

    if (groupByKey === 'CreatedAt') {
        let formattedCreatedAtArray = []
        allPossibleGroupByKey.map(element => {
            formattedCreatedAtArray.push(moment(element).format("YYYY-MM-DD"))
        })
        // find unique values 
        uniqueValueArray = [...new Set(formattedCreatedAtArray)];
        console.log('uniqueValueArray-----', uniqueValueArray)
        uniqueValueArray.map(uniqueValue => {
            let filteredData = listData.filter(listData => moment(listData[groupByKey]).format("YYYY-MM-DD") === uniqueValue)
            console.log('filteredData-----', filteredData)
            newListObject[uniqueValue] = filteredData
        })
    } else {
        uniqueValueArray = [...new Set(allPossibleGroupByKey)];
        console.log('uniqueValueArray-----', uniqueValueArray)
        uniqueValueArray.map(uniqueValue => {
            let filteredData = listData.filter(listData => listData[groupByKey] === uniqueValue)
            console.log('filteredData-----', filteredData)
            groupByKey === 'DueDate' && !uniqueValue ? newListObject["No Due Date"] = filteredData : newListObject[uniqueValue] = filteredData
        })
    }

      console.log('newListObject-----', newListObject)
      return newListObject;
}
