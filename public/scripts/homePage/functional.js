const tabbedContentHeadingHolder = document.querySelector('.tabbedContentHeadingHolder');
const tabbedContentDataHolder = document.querySelector('.tabbedContentDataHolder');
function dynamicPageData(){
    
    const tabContentHeaderOptions = document.querySelectorAll('.tabComponentHeader');
    const tabContentDataOptions = document.querySelectorAll('.tabbedContent');
    tabbedContentHeadingHolder.addEventListener('click',async(e)=>{
        if(e.target.closest('.tabComponentHeader')){
            const activeClass = e.target.closest('.tabComponentHeader').className.split(' ')[1];
            const activeTab = String(activeClass).split('-')[1];
            tabContentHeaderOptions.forEach(item=>{
                item.classList.remove('activeTab');
            });
            tabContentDataOptions.forEach(item=>{
                item.classList.remove('activeTabContent');
            });
            document.querySelector(`.${activeClass}`).classList.add('activeTab');
            document.querySelector(`.tabbedContent-${activeTab}`).classList.add('activeTabContent');
        }
    });
    
    const submitBtn = document.querySelector('.submitBtn');
    const customerEmailId = document.querySelector('.customerEmailId');
    const customerPhoneNumber = document.querySelector('.customerPhoneNumber');
    const customerMessage = document.querySelector('.customerMessage');
    const emailRegex = /^[a-z0-9]+([\.\-\_][a-z0-9]+)*@[a-z0-9]+(\.[a-z]{2,10})+$/;
    const mobileRegex = /^[1-9][0-9]{9}$/;
    function validateEmail(){
        if(!emailRegex.test(customerEmailId.value.trim())){
            messageDisplayAndHide('Invalid Email Pattern');
            return;
        }
    }
    function validateMobileNumber(){
        if(!mobileRegex.test(customerPhoneNumber.value.trim())){
            messageDisplayAndHide('Invalid Mobile Number');
            return;
        }
    }
    function validateMessage(){
        if(customerMessage.value.length<50){
            messageDisplayAndHide('Message should be atleast 30 characters long');
            return;
        }
    }
    customerEmailId.addEventListener('blur',()=>{
        validateEmail();
    });
    customerPhoneNumber.addEventListener('blur',()=>validateMobileNumber());
    customerMessage.addEventListener('input',(e)=>{
        const lastValue = customerMessage.value[customerMessage.value.length-1];
        const result = (/[a-zA-Z0-9\\,\\!\\.\\-\\ ]/.test(lastValue));
        if(!result){
            customerMessage.value = String(customerMessage.value).slice(0,-1);
        }
    });
    submitBtn.addEventListener('click',async(e)=>{
        validateEmail();
        validateMobileNumber();
        validateMessage();
        const csrfToken = await getCsrfToken();
        const response = await fetch(url+'common/raise-user-query',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'CSRF-Token':csrfToken
            },
            body:JSON.stringify({
                emailId : customerEmailId.value,
                mobileNo : customerPhoneNumber.value,
                message:customerMessage.value,
            }),
        });
        const result = await response.json();
        if(result.success){
            customerEmailId.value = '';
            customerPhoneNumber.value = '';
            customerMessage.value = '';
        }
        messageDisplayAndHide(result.message);
    });

}