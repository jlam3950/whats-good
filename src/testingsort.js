var arrayOfObjects = [   
    {
        name: 'Diana',
        born: 110, // Mon, Jul 15 2013
        num: 4,
        sex: 'female'
    },
    {

        name: 'Beyonce',
        born: 110, // Wed, Apr 24 2013
        num: 2,
        sex: 'female'
    },
    {            
        name: 'Albert',
        born: 1, // Mon, Jun 3 2013
        num: 3,
        sex: 'male'
    },    
    {
        name: 'Doris',
        born: 2, // Sat, Dec 1 2012
        num: 1,
        sex: 'female'
    }
];
var byDate = arrayOfObjects.slice(0);
byDate.sort(function(a,b) {
    return b.born - a.born;
});
console.log('by date:');
console.log(byDate);