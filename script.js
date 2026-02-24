let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');
let jobCount = document.getElementById('jobCount');

const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section')


function calculateCount(){
    total.innerText = allCardSection.children.length
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    updateTabCount();
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
    currentStatus = id
    //console.log(selected);

    //adding blue bg for current button
    selected.classList.remove('bg-white', 'text-gray-500')
    selected.classList.add('bg-blue-500', 'text-white')
    //step 1 finish

    if(id == 'interview-filter-btn'){
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        renderInterview()
    }
    else if(id == 'all-filter-btn'){
        allCardSection.classList.remove('hidden')
        filterSection.classList.add('hidden')
    }
    else if(id == 'rejected-filter-btn'){
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        renderRejected()
    }
    updateTabCount();
}

//step 2: delegation
mainContainer.addEventListener('click',function(event) {

    if (event.target.classList.contains('interview')) {
        const card = event.target.closest('.bg-white');
        handleStatusChange(card, 'Interview');
        if (currentStatus === 'rejected-filter-btn') renderRejected();
    }

    if (event.target.classList.contains('rejected')) {
        const card = event.target.closest('.bg-white');
        handleStatusChange(card, 'Rejected');
        if (currentStatus === 'interview-filter-btn') renderInterview();
    }

    //delete button
    if (event.target.closest('.fa-trash-can')) {
        const card = event.target.closest('.bg-white');
        const companyName = card.querySelector('.companyName').innerText;

        // remove from Interview & Rejected arrays
        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        // remove from ALL section
        const allCards = allCardSection.querySelectorAll('.bg-white');
        allCards.forEach(c => {
            if (c.querySelector('.companyName')?.innerText === companyName) {
                c.remove();
            }
        });

        // remove clicked card (Interview / Rejected view)
        card.remove();

        // re-render filtered views if needed
        if (currentStatus === 'interview-filter-btn') renderInterview();
        if (currentStatus === 'rejected-filter-btn') renderRejected();

        calculateCount();
        renderAllEmptyState();
    }
});

//Status Handling
function handleStatusChange(card, status) {

    const companyName = card.querySelector('.companyName').innerText;

    const cardInfo = {
        companyName,
        position: card.querySelector('.position').innerText,
        location: card.querySelector('.location').innerText,
        type: card.querySelector('.type').innerText,
        salary: card.querySelector('.salary').innerText,
        description: card.querySelector('.description').innerText,
        interview: card.querySelector('.interview').innerText,
        rejected: card.querySelector('.rejected').innerText,
        status
    };

    card.querySelector('.status').innerText = status;

    //update ALL tab status
    const allCards = allCardSection.querySelectorAll('.bg-white');
    allCards.forEach(item => {
        if (item.querySelector('.companyName')?.innerText === companyName) {
            item.querySelector('.status').innerText = status;
        }
    });

    if (status === 'Interview') {
        if (!interviewList.find(item => item.companyName === companyName)) {
            interviewList.push(cardInfo);
        }
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);
    }

    if (status === 'Rejected') {
        if (!rejectedList.find(item => item.companyName === companyName)) {
            rejectedList.push(cardInfo);
        }
        interviewList = interviewList.filter(item => item.companyName !== companyName);
    }

    calculateCount();
}

//step 3 html file create
function createCard(data) {
    const div = document.createElement('div');
    div.className = 'bg-white p-8 rounded-xl my-5';

    div.innerHTML = `
        <div class="flex justify-between">
            <div class="flex-1">
                <p class="companyName text-lg font-bold">${data.companyName}</p>
                <p class="position text-lg text-gray-500">${data.position}</p>

                <p class="text-lg text-gray-500 my-5">
                    <span class="location">${data.location}</span> • 
                    <span class="type">${data.type}</span> • 
                    <span class="salary">${data.salary}</span>
                </p>

                <p class="status inline-block px-4 py-2 bg-gray-300 rounded-md">${data.status}</p>

                <p class="description mt-3 mb-5">${data.description}</p>

                <div class="flex gap-4">
                    <button class="interview border-2 border-green-600 px-6 py-2 text-green-600">INTERVIEW</button>
                    <button class="rejected border-2 border-red-600 px-6 py-2 text-red-600">REJECTED</button>
                </div>
            </div>

            <button class="border-2 border-gray-400 w-10 h-10 rounded-full flex items-center justify-center">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `;
    return div;
}

//step 4: renderInterView & renderRejected
function renderInterview() {
    filterSection.innerHTML = '';

    if (interviewList.length === 0) {
        showEmptyState();
        return;
    }

    interviewList.forEach(item => {
        filterSection.appendChild(createCard(item));
    });
}

function renderRejected() {
    filterSection.innerHTML = '';

    if (rejectedList.length === 0) {
        showEmptyState();
        return;
    }

    rejectedList.forEach(item => { 
        filterSection.appendChild(createCard(item));
    });
}

//filtering empty state
function showEmptyState() {
    filterSection.innerHTML = `
        <div class="bg-white p-28 rounded-xl text-center my-5">
            <img src="jobs.png" class="w-24 mx-auto mb-4">
            <h2 class="text-xl font-bold">No jobs available</h2>
            <p class="text-gray-500">Check back soon for new job opportunities</p>
        </div>
    `;
}

//render empty state for all
function renderAllEmptyState() {
    if (!allCardSection.querySelector('.bg-white')) {
        allCardSection.innerHTML = `
        <div class="bg-white p-28 rounded-xl flex flex-col items-center text-center my-5">
            <img src="jobs.png" class="w-24 mb-4">
            <h2 class="text-xl font-bold text-gray-800">No jobs available</h2>
            <p class="text-lg text-gray-500">Check back soon for new job opportunities</p>
        </div>`;
    }
}

//Tab Count
function updateTabCount() {
    const totalJobs = Array.from(allCardSection.children).filter(c => c.querySelector('.companyName')).length;
    const interviewJobs = interviewList.length;
    const rejectedJobs = rejectedList.length;

    if (currentStatus === 'all-filter-btn') {
        jobCount.innerText = `${totalJobs} jobs`;
    } else if (currentStatus === 'interview-filter-btn') {
        jobCount.innerText = `${interviewJobs} of ${totalJobs} jobs`;
    } else if (currentStatus === 'rejected-filter-btn') {
        jobCount.innerText = `${rejectedJobs} of ${totalJobs} jobs`;
    }

    // dashboard counts
    total.innerText = totalJobs;
    interviewCount.innerText = interviewJobs;
    rejectedCount.innerText = rejectedJobs;
}