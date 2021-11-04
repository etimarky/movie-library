import { getPages, populateNetflixData } from "./populate_netflix_data.js";

setTimeout(async () => {
    let num = await getPages();
    console.dir(num);

    let response = await populateNetflixData(num);
    
}, 1000)