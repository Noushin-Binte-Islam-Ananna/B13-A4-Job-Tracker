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
const filterSection = document.getElementById('filtered-section')


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

    if(id == 'interview-filter-btn'){
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
    }
    else if(id == 'all-filter-btn'){
        allCardSection.classList.remove('hidden')
        filterSection.classList.add('hidden')
    }
}

//step 2: delegation
mainContainer.addEventListener('click',function(event) {
    if(event.target.classList.contains('interview')){
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
        //console.log(cardInfo)

        const InterviewHappen = interviewList.find(item => item.companyName == cardInfo.companyName)//this part felt complecated

        parenNode.querySelector('.status').innerText = 'Interview'

        if(!InterviewHappen){
            interviewList.push(cardInfo)
        }
        renderInterview()

        //step 2 finish

    }
})


//step 3 html file create
function renderInterview(){
    //make the filterSection empty every time
    filterSection.innerHTML = ' '

    //creating innerHTML of dev element
    for (let interview of interviewList) {
        console.log(interview)

        let div = document.createElement('div');
        div.className = 'bg-white p-8 rounded-xl my-5'
        div.innerHTML = `
        <div class="flex justify-between">
                    <!-- Main Content -->
                    <div class="flex-1">
                        <!-- Header -->
                        <div>
                            <p class="companyName text-lg font-bold text-gray-900">Mobile First Corp</p>
                            <p class="position text-lg font-semibold text-gray-500">React Native Developer</p>
                        </div>

                        <!-- Job Details -->
                        <div>
                            <p class="text-lg text-gray-500 my-5">
                                <span class="location">Remote</span> • 
                                <span class="type">Full-time</span> • 
                                <span class="salary">$130,000 - $175,000</span>
                            </p>
                            
                            <!-- Status Badge -->
                            <p class="status inline-block px-4 py-2 bg-gray-300 font-semibold rounded-md text-sm">NOT APPLIED</p>
                            
                            <!-- Description -->
                            <p class="description text-gray-700 mt-3 mb-5">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
                        </div> 

                        <!-- Action Buttons -->
                        <div class="flex flex-col md:flex-row gap-4">
                            <button class="interview border-2 border-green-600 px-6 py-2.5 rounded-lg text-green-600 font-semibold">INTERVIEW</button>
                            <button class="rejected border-2 border-red-600 px-6 py-2.5 rounded-lg text-red-600 font-semibold">REJECTED</button>
                        </div>
                    </div>

                    <!-- Delete Button -->
                    <button label="Delete job" class="border-2 border-gray-400 w-10 h-10 rounded-full flex items-center justify-center">
                        <i class="fa-regular fa-trash-can text-gray-600"></i>
                    </button>
                </div>
        `
        filterSection.appendChild(div)
    }

}