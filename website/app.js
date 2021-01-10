/* Samples of the ZIP codes in USA.
    State	    City	                                ZIP Code(s)
Alaska (AK)	    Anchorage	                            99501 thru 99524
Arizona (AZ)	Phoenix	                                85001 thru 85055
Arkansas (AR)	Little Rock	                            72201 thru 72217
California (CA)	Sacramento Los Angeles Beverly Hills	94203 thru 94209 90001 thru 90089 90209 thru 90213
*/

/* Global Variables */
const openweathermapURL = "http://api.openweathermap.org/data/2.5/weather?units=metric&zip=";
const openweathermapApiKey = "&appid=8934319d93e6c99c3d630e78ce40438a";

// get the current date and format it.
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
let currentDate = new Date();
let newDate = monthNames[currentDate.getMonth()] +' '+ currentDate.getDate() +', '+ currentDate.getFullYear();

// get response data
const getWeatherData = async (openweathermapURL = '') => {
    try {
        const respon = await fetch(openweathermapURL);
        const tempData = await respon.json();
        return tempData;
    } catch (error) {
        console.log("Error >>> ", error);
    }
};

// POST the weather Data
const postWeatherData = async (openweathermapURL = '', data = {}) => {
    const response = await fetch(openweathermapURL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        // define the response data as JSON data type at header in content type.
        headers: {
            'Content-Type': 'application/json',
        },
        // format json data as string in the body.
        body: JSON.stringify(data)
    });
};

// Update the page data to be dynamic
const updatePageData = async () => {
    const pageData = await getWeatherData('/tempData');
    document.getElementById('date').innerHTML = `Today date is:  ${pageData.date}`;
    document.getElementById('temp').innerHTML = `The temperature right now is:  ${pageData.temperature} Celsius`;
    document.getElementById('content').innerHTML = 'You feel like that:  '+pageData.feelings;
};

// collect the data from API then add the page entry to it and send all to the server.
const prepareNewData = async () => {
    // form validation
    if(document.getElementById('zip').value==="" ||
        document.getElementById('zip').length < 5 ||
        isNaN(document.getElementById('zip').value)){
        alert("Please enter a valid the ZIP code. have to 5 numeric digits");
        return(0);
    }
    if(document.getElementById('feelings').value===""){
        alert("Please enter your feelings.");
        return(0);
    }
    // prepare to get the data
    const zip = document.getElementById('zip').value;
    const response = await fetch(`${openweathermapURL}${zip}${openweathermapApiKey}`);
    const feelings = document.getElementById('feelings').value;
    try {
        const responseData = await response.json();
        responseData.feelings = feelings;
        responseData.date = newDate;
        await postWeatherData('/', responseData);
        updatePageData();
    } catch (error) {
        console.error("Error >>> ", error);
    }
};
// associate the event listener to the generate button.
document.getElementById('generate').addEventListener('click', prepareNewData);