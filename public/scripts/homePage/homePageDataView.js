const cardHeader = ['Grant Location Access','Search for Your Medicine','Upload prescription and order','Check store availability','Get Directions'];
const cardText = ['Allow location access to view real-time medicine availability at nearby stores.','Find your required medicine by simply entering its name.','Upload a valid prescription to purchase medicines from restricted categories.','Confirm store availability and plan your medicine pickup at your preferred time.','Get directions and easily navigate to the selected store.'];
const cardImage = ['/images/placeholder.png','/images/search.png','/images/docs.png','/images/clock.png','/images/location.png'];
const navigationTipSection = document.querySelector('.navigationTipWrapper');
const companyInfo = document.querySelector('.companyInfo');
const bulletPointWrapper = document.querySelector('.bulletPointWrapper');
navigationTipSection.innerHTML = '';
cardHeader.forEach((item,i)=>{
    const html = `
    <div class="card card-${i+1}">
        <div class="cardImage"><img src="${cardImage[i]}"></div>
        <br>
        <div class="cardText-${i+1}">
            <div class="cardHeader cardHeader-${i+1} rowdies-light">${cardHeader[i]}</div>
            <br>
            <div class="cardDescription lexend cardDescription-${i}">${cardText[i]}</div>
        </div>
    </div>`;
    navigationTipSection.insertAdjacentHTML("beforeend",html);
});

const companyInfoData = ` Medisure is a smart platform that provides real-time information on medicine availability at the nearest stores.<br><br>We aim to make medicine search fast, reliable, and hassle-free for everyone.<br><br>Whether you need urgent medication or just want to check stock before visiting a pharmacy, Medisure has got you covered.`;

companyInfo.innerHTML = companyInfoData;


const bulletPointHeader = ['Real-time Updates','Fast & Reliable','Nearby Pharmacies','Store Friendly'];
const bulletPointText = ['Get accurate stock availability instantly.','Saves time and effort, especially in emergencies.',' No need to visit multiple stores. Find the nearest option.','Provide real time information to the store about there Drug Inventory and sales analytics for stores.'];
const bulletPointImg = '/images/bulletPoint.png';
bulletPointWrapper.innerHTML = '';
bulletPointHeader.forEach((item,i)=>{
    const html = `<div class="bulletPoint">
        <div class="bulletPointImage"><img src="${bulletPointImg}"></div>
        <div class="bulletPointText"><b>${item} -</b> ${bulletPointText[i]}</div>
    </div>`;
    bulletPointWrapper.insertAdjacentHTML('beforeend',html);
});

const tabbedContentHeadings = ['Our Mission','Our Vision','Our Commitment'];
const tabbedContentData = [[
    'Medisure analyzes sales data to generate detailed consumption trends, helping store owners, admins, and the government make informed decisions. This ensures timely restocking, prevents shortages, and improves emergency preparedness.','To bridge the gap between pharmacies and customers by providing accurate, up-to-date stock information','To ensure that no one has to struggle to find the right medicine when they need it most','To provide only the licenced drug, authorized by Drugs Controller General of India'
],[
    'Access detailed consumption data to help make informed decisions and take preventive measures for public health.','Gain insights into sales data, consumption trends, and stock levels, helping pharmacies and store owners manage inventory efficiently.','To create a seamless, technology-driven ecosystem where finding medicines is effortless, shortages are prevented, and healthcare decisions are data-driven.'
],['All medicines available on MediSure are offered at their Maximum Retail Price (MRP), ensuring transparency and fairness in pricing without any hidden charges or markups.','We are dedicated to making medicine procurement easier by offering a seamless, user-friendly platform that connects you to the nearest pharmacies in real-time.','We ensure that every medicine listed on MediSure is licensed and approved by the relevant regulatory authorities, such as the Drugs Controller General of India (DCGI), for your safety and peace of mind']
];


tabbedContentHeadings.forEach((item,i)=>{
    const html = `<div class="tabComponentHeader tabComponentHeader-${i+1} ${i==0? 'activeTab':''}" >${item}</div>`;
    tabbedContentHeadingHolder.insertAdjacentHTML('beforeend',html);
});
tabbedContentData.forEach((item,i)=>{
    const element = document.createElement('div');
    element.className = `tabbedContent tabbedContent-${i+1} ${i==0 ? 'activeTabContent':''}`;
    item.forEach(data=>{
        const html = `
            <div class="points">
                <div class="tabbedContentPointImageHolder"> <img src="${bulletPointImg}"> </div>
                <div class="pointData"> ${data} </div>
            </div>
        `;
        element.insertAdjacentHTML('beforeend',html);
    });
    tabbedContentDataHolder.appendChild(element);
});
dynamicPageData();
