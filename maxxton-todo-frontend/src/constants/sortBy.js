export const sortBy = (sortBy, isAscending, listData) => {
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
