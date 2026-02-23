let interviewList = [];
let rejectedList = [];

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');


function calculateCount(){
    total.innerText = allCardSection.children.length //8
    interviewCount.innerText = interviewCount.length 
    rejectedCount.innerText = rejectedCount.length
}

calculateCount()

//step 1: toggleButtonOnClick
function toggleStyle(id){
    //adding white bg for all
    allFilterBtn.classList.add('bg-white', 'text-gray-500')
    interviewFilterBtn.classList.add('bg-white', 'text-gray-500')
    rejectedFilterBtn.classList.add('bg-white', 'text-gray-500')

    //if any button has blue than remove
    allFilterBtn.classList.remove('bg-blue-500', 'text-white')
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white')
    rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white')

    //console.log(id)
    const selected = document.getElementById(id)//this is the button that clicked for filter

    //adding blue bg for current button
    selected.classList.remove('bg-white', 'text-gray-500')
    selected.classList.add('bg-blue-500', 'text-white')
    //step 1 finish
}

//step 2: delegation
mainContainer.addEventListener('click',function(event) {
    const parenNode = event.target.parentNode.parentNode;
    
    const companyName = parenNode.querySelector('.companyName').innerText
    const position = parenNode.querySelector('.position').innerText
    const location = parenNode.querySelector('.location').innerText
    const type = parenNode.querySelector('.type').innerText
    const salary = parenNode.querySelector('.salary').innerText
    const description = parenNode.querySelector('.description').innerText
    const interview = parenNode.querySelector('.interview').innerText
    const rejected = parenNode.querySelector('.rejected').innerText

    parenNode.querySelector('.status').innerText = 'Interview'

    const cardInfo = {
        companyName,
        position,
        location,
        type,
        salary,
        status: 'Interview',
        description,
        interview,
        rejected
    }

    const InterviewHappen = interviewList.find(item => item.companyName == cardInfo.companyName)//this part felt complecated

    if(!InterviewHappen){
        interviewList.push(cardInfo)
    }

    //step 2 finish
})