import { getPages, populateNetflixData } from "./populate_netflix_data.js";
// used for getting the number of pages and populating the data to redo the DB
setTimeout(async () => {
    let num = await getPages();
    console.dir(num);

    let response = await populateNetflixData(num);
    
}, 1000)