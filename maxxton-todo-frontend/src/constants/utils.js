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
    if (groupByKey === 'CreatedAt') {
        listData.map(listDatas => {
            listDatas.CreatedAt = moment(listDatas.CreatedAt).format("YYYY-DD-MM")
        })
    }
    console.log('CreatedAt listData---', listData)
    let data = [...listData]
    
    let priorityArray = []
    data.map(listarrays => {
          priorityArray.push(listarrays[groupByKey])
    })
      
      console.log('priorityArray-----', priorityArray)
    
    let uniqueChars = [...new Set(priorityArray)];
      console.log('uniqueChars-----', uniqueChars)
      
      
      let newListObject = {}
      uniqueChars.map(uniqueChar => {
          let newdata = listData.filter(listData => listData[groupByKey] === uniqueChar)
        console.log('newdata-----', newdata)
        newListObject[uniqueChar] = newdata
      })
      
      
      console.log('newListObject-----', newListObject)
      return newListObject;
}
