// regex for validation
const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form');
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
}

// user inputs elements
let firstnameElem = mainForm.firstname,
    middlenameElem = mainForm.middlename,
    lastnameElem = mainForm.lastname,
    imageElem = mainForm.image,
    designationElem = mainForm.designation,
    addressElem = mainForm.address,
    emailElem = mainForm.email,
    phonenoElem = mainForm.phoneno,
    summaryElem = mainForm.summary;

// display elements
let nameDsp = document.getElementById('fullname_dsp'),
    imageDsp = document.getElementById('image_dsp'),
    phonenoDsp = document.getElementById('phoneno_dsp'),
    emailDsp = document.getElementById('email_dsp'),
    addressDsp = document.getElementById('address_dsp'),
    designationDsp = document.getElementById('designation_dsp'),
    summaryDsp = document.getElementById('summary_dsp'),
    projectsDsp = document.getElementById('projects_dsp'),
    achievementsDsp = document.getElementById('achievements_dsp'),
    skillsDsp = document.getElementById('skills_dsp'),
    educationsDsp = document.getElementById('educations_dsp'),
    experiencesDsp = document.getElementById('experiences_dsp');

// first value is for the attributes and second one passes the nodelists
const fetchValues = (attrs, ...nodeLists) => {
    let elemsAttrsCount = nodeLists.length;
    let elemsDataCount = nodeLists[0].length;
    let tempDataArr = [];

    // first loop deals with the no of repeaters value
    for(let i = 0; i < elemsDataCount; i++){
        let dataObj = {}; // creating an empty object to fill the data
        // second loop fetches the data for each repeaters value or attributes 
        for(let j = 0; j < elemsAttrsCount; j++){
            // setting the key name for the object and fill it with data
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
}

const getUserInputs = () => {

    // achievements 
    let achievementsTitleElem = document.querySelectorAll('.achieve_title'),
    achievementsDescriptionElem = document.querySelectorAll('.achieve_description');

    // experiences
    let expTitleElem = document.querySelectorAll('.exp_title'),
    expOrganizationElem = document.querySelectorAll('.exp_organization'),
    expLocationElem = document.querySelectorAll('.exp_location'),
    expStartDateElem = document.querySelectorAll('.exp_start_date'),
    expEndDateElem = document.querySelectorAll('.exp_end_date'),
    expDescriptionElem = document.querySelectorAll('.exp_description');

    // education
    let eduSchoolElem = document.querySelectorAll('.edu_school'),
    eduDegreeElem = document.querySelectorAll('.edu_degree'),
    eduCityElem = document.querySelectorAll('.edu_city'),
    eduStartDateElem = document.querySelectorAll('.edu_start_date'),
    eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
    eduDescriptionElem = document.querySelectorAll('.edu_description');

    let projTitleElem = document.querySelectorAll('.proj_title'),
    projLinkElem = document.querySelectorAll('.proj_link'),
    projDescriptionElem = document.querySelectorAll('.proj_description');

    let skillElem = document.querySelectorAll('.skill');

    // event listeners for form validation
    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation'));

    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));
    expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, "Location")));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'skill')));

    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    }
};

function validateFormData(elem, elemType, elemName){
    // checking for text string and non empty string
    if(elemType == validType.TEXT){
        if(!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only text string
    if(elemType == validType.TEXT_EMP){
        if(!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for email
    if(elemType == validType.EMAIL){
        if(!emailRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for phone number
    if(elemType == validType.PHONENO){
        if(!phoneRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only empty
    if(elemType == validType.ANY){
        if(elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

// adding the invalid text
function addErrMsg(formElem, formElemName){
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

// removing the invalid text 
function removeErrMsg(formElem){
    formElem.nextElementSibling.innerHTML = "";
}

// show the list data
const showListData = (listData, listContainer) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        
        for(const key in listItem){
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }

        listContainer.appendChild(itemElem);
    })
}

const displayCV = (userData) => {
    nameDsp.innerHTML = userData.firstname + " " + userData.middlename + " " + userData.lastname;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
}

// generate CV
const generateCV = () => {
    let userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
}

function previewImage(){
    let oFReader = new FileReader();
    oFReader.readAsDataURL(imageElem.files[0]);
    oFReader.onload = function(ofEvent){
        imageDsp.src = ofEvent.target.result;
    }
}
// Save form data to localStorage
function saveFormData() {
    const formData = getUserInputs();
    localStorage.setItem('cvFormData', JSON.stringify(formData));
}

// Load form data from localStorage
function loadFormData() {
    const savedData = localStorage.getItem('cvFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        // Populate form fields with saved data
        firstnameElem.value = formData.firstname;
        middlenameElem.value = formData.middlename;
        lastnameElem.value = formData.lastname;
        designationElem.value = formData.designation;
        addressElem.value = formData.address;
        emailElem.value = formData.email;
        phonenoElem.value = formData.phoneno;
        summaryElem.value = formData.summary;
        // Populate repeater fields (achievements, experiences, educations, projects, skills)
        populateRepeaterFields('group-a', formData.achievements);
        populateRepeaterFields('group-b', formData.experiences);
        populateRepeaterFields('group-c', formData.educations);
        populateRepeaterFields('group-d', formData.projects);
        populateRepeaterFields('group-e', formData.skills);
        generateCV();
    }
}


// Populate repeater fields with saved data
function populateRepeaterFields(groupName, data) {
    const repeater = document.querySelector(`[data-repeater-list="${groupName}"]`);
    if (repeater) {
        repeater.innerHTML = ''; // Clear existing items
        data.forEach(item => {
            const newItem = document.createElement('div');
            newItem.setAttribute('data-repeater-item', '');
            newItem.innerHTML = repeaterTemplate(groupName, item);
            repeater.appendChild(newItem);
        });
    }
}

// Template for repeater items
function repeaterTemplate(groupName, item) {
    if (groupName === 'group-a') {
        return `
            <div class="cv-form-row cv-form-row-achievement">
                <div class="cols-2">
                    <div class="form-elem">
                        <label for="" class="form-label">Title</label>
                        <input name="achieve_title" type="text" class="form-control achieve_title" value="${item.achieve_title}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                        <label for="" class="form-label">Description</label>
                        <input name="achieve_description" type="text" class="form-control achieve_description" value="${item.achieve_description}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                </div>
                <button data-repeater-delete type="button" class="repeater-remove-btn">-</button>
            </div>
        `;
    } else if (groupName === 'group-b') {
        return `
            <div class="cv-form-row cv-form-row-experience">
                <div class="cols-3">
                    <div class="form-elem">
                        <label for="" class="form-label">Title</label>
                        <input name="exp_title" type="text" class="form-control exp_title" value="${item.exp_title}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                        <label for="" class="form-label">Company / Organization</label>
                        <input name="exp_organization" type="text" class="form-control exp_organization" value="${item.exp_organization}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                        <label for="" class="form-label">Location</label>
                        <input name="exp_location" type="text" class="form-control exp_location" value="${item.exp_location}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                </div>
                <div class="cols-3">
                    <div class="form-elem">
                        <label for="" class="form-label">Start Date</label>
                        <input name="exp_start_date" type="date" class="form-control exp_start_date" value="${item.exp_start_date}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                        <label for="" class="form-label">End Date</label>
                        <input name="exp_end_date" type="date" class="form-control exp_end_date" value="${item.exp_end_date}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                        <label for="" class="form-label">Description</label>
                        <input name="exp_description" type="text" class="form-control exp_description" value="${item.exp_description}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                </div>
                <button data-repeater-delete type="button" class="repeater-remove-btn">-</button>
            </div>
        `;
    } else if (groupName === 'group-c') {
        return `
            <div class="cv-form-row cv-form-row-education">
                <div class="cols-3">
                    <div class="form-elem">
                        <label for="" class="form-label">School</label>
                        <input name="edu_school" type="text" class="form-control edu_school" value="${item.edu_school}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                        <label for="" class="form-label">Degree</label>
                        <input name="edu_degree" type="text" class="form-control edu_degree" value="${item.edu_degree}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                        <label for="" class="form-label">City</label>
                        <input name="edu_city" type="text" class="form-control edu_city" value="${item.edu_city}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                </div>
                <div class="cols-3">
                    <div class="form-elem">
                        <label for="" class="form-label">Start Date</label>
                        <input name="edu_start_date" type="date" class="form-control edu_start_date" value="${item.edu_start_date}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                        <label for="" class="form-label">End Date</label>
                        <input name="edu_graduation_date" type="date" class="form-control edu_graduation_date" value="${item.edu_graduation_date}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                        <label for="" class="form-label">Description</label>
                        <input name="edu_description" type="text" class="form-control edu_description" value="${item.edu_description}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                </div>
                <button data-repeater-delete type="button" class="repeater-remove-btn">-</button>
            </div>
        `;
    } else if (groupName === 'group-d') {
        return `
            <div class="cv-form-row cv-form-row-project">
                <div class="cols-3">
                    <div class="form-elem">
                        <label for="" class="form-label">Project Name</label>
                        <input name="proj_title" type="text" class="form-control proj_title" value="${item.proj_title}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                        <label for="" class="form-label">Project link</label>
                        <input name="proj_link" type="text" class="form-control proj_link" value="${item.proj_link}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                    <div class="form-elem">
                        <label for="" class="form-label">Description</label>
                        <input name="proj_description" type="text" class="form-control proj_description" value="${item.proj_description}" onkeyup="generateCV()">
                        <span class="form-text"></span>
                    </div>
                </div>
                <button data-repeater-delete type="button" class="repeater-remove-btn">-</button>
            </div>
        `;
    } else if (groupName === 'group-e') {
        return `
            <div class="cv-form-row cv-form-row-skills">
                <div class="form-elem">
                    <label for="" class="form-label">Skill</label>
                    <input name="skill" type="text" class="form-control skill" value="${item.skill}" onkeyup="generateCV()">
                    <span class="form-text"></span>
                </div>
                <button data-repeater-delete type="button" class="repeater-remove-btn">-</button>
            </div>
        `;
    }
    return '';
}
// Clear form data from localStorage
function clearFormData() {
    localStorage.removeItem('cvFormData');
    mainForm.reset();
    document.querySelector('[data-repeater-list="group-a"]').innerHTML = ''; // Clear achievements
    document.querySelector('[data-repeater-list="group-b"]').innerHTML = ''; // Clear experiences
    document.querySelector('[data-repeater-list="group-c"]').innerHTML = ''; // Clear educations
    document.querySelector('[data-repeater-list="group-d"]').innerHTML = ''; // Clear projects
    document.querySelector('[data-repeater-list="group-e"]').innerHTML = ''; // Clear skills

    // Optionally, you can add a default empty item to avoid the section vanishing
    const repeaterA = document.querySelector('[data-repeater-list="group-a"]');
    const newItemA = document.createElement('div');
    newItemA.setAttribute('data-repeater-item', '');
    newItemA.innerHTML = repeaterTemplate('group-a', { achieve_title: '', achieve_description: '' });
    repeaterA.appendChild(newItemA);

    const repeaterB = document.querySelector('[data-repeater-list="group-b"]');
    const newItemB = document.createElement('div');
    newItemB.setAttribute('data-repeater-item', '');
    newItemB.innerHTML = repeaterTemplate('group-b', { exp_title: '', exp_organization: '', exp_location: '', exp_start_date: '', exp_end_date: '', exp_description: '' });
    repeaterB.appendChild(newItemB);

    const repeaterC = document.querySelector('[data-repeater-list="group-c"]');
    const newItemC = document.createElement('div');
    newItemC.setAttribute('data-repeater-item', '');
    newItemC.innerHTML = repeaterTemplate('group-c', { edu_school: '', edu_degree: '', edu_city: '', edu_start_date: '', edu_graduation_date: '', edu_description: '' });
    repeaterC.appendChild(newItemC);

    const repeaterD = document.querySelector('[data-repeater-list="group-d"]');
    const newItemD = document.createElement('div');
    newItemD.setAttribute('data-repeater-item', '');
    newItemD.innerHTML = repeaterTemplate('group-d', { proj_title: '', proj_link: '', proj_description: '' });
    repeaterD.appendChild(newItemD);

    const repeaterE = document.querySelector('[data-repeater-list="group-e"]');
    const newItemE = document.createElement('div');
    newItemE.setAttribute('data-repeater-item', '');
    newItemE.innerHTML = repeaterTemplate('group-e', { skill: '' });
    repeaterE.appendChild(newItemE);

    generateCV();
}

// Call loadFormData on page load
document.addEventListener('DOMContentLoaded', loadFormData);

// Add event listeners to save form data on input change
mainForm.addEventListener('input', saveFormData);

// print CV
function printCV(){
    window.print();
}


document.getElementById('generate-qr-btn').addEventListener('click', function() {
    const resumeLink = window.location.href; // Get the current page URL
    const qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = ''; // Clear any existing QR code
    new QRCode(qrcodeContainer, {
        text: resumeLink,
        width: 128,
        height: 128
    });
});


const skillSuggestions = {
    "software developer": ["JavaScript", "React", "Node.js", "CSS", "HTML"],
    "data scientist": ["Python", "R", "Machine Learning", "Data Analysis", "SQL"],
    "project manager": ["Project Planning", "Risk Management", "Agile", "Scrum", "Leadership"],
    "graphic designer": ["Adobe Photoshop", "Adobe Illustrator", "Typography", "Color Theory", "UX/UI Design"],
    "digital marketer": ["SEO", "Google Analytics", "Social Media Marketing", "Content Marketing", "Email Marketing"],
    "network engineer": ["Cisco", "CCNA", "CCNP", "Routing", "Switching"],
    "database administrator": ["SQL", "MySQL", "Oracle", "Database Design", "Database Administration"],
    "Cybersecurity Analyst": ["Cybersecurity", "Penetration Testing", "Firewalls", "Network Security", "Information Security"],
    "UX/UI designer": ["User Research", "Wireframing", "Prototyping", "Adobe XD", "Sketch"],
    "data analyst": ["Excel", "Data Visualization", "Statistics", "Data Cleaning", "Data Mining"],
    "web developer": ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    "IT support specialist": ["Troubleshooting", "Hardware", "Software", "Networking", "Customer Service"],
    "systems administrator": ["Windows Server", "Linux", "Active Directory", "VMware", "System Administration"],
    "technical writer": ["Technical Writing", "Documentation", "Editing", "Writing", "Content Creation"],
    "business analyst": ["Business Analysis", "Requirements Gathering", "Data Analysis", "SQL", "Excel"],
    "mobile app developer": ["Java", "Android", "Swift", "iOS", "Mobile App Development"],
    "cloud engineer": ["AWS", "Azure", "Google Cloud", "Cloud Computing", "DevOps"],
    "QA tester": ["Quality Assurance", "Testing", "Bug Tracking", "Test Automation", "Selenium"],
    "devops engineer": ["DevOps", "CI/CD", "Docker", "Kubernetes", "Jenkins"],
    "full stack developer": ["JavaScript", "Node.js", "React", "MongoDB", "Express.js"],
    "product manager": ["Product Management", "Product Development", "Agile", "Scrum", "Market Research"],
    "UI designer": ["User Interface Design", "Adobe XD", "Sketch", "Figma", "Wireframing"],
    "AI engineer": ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Python", "TensorFlow"],
    "blockchain developer": ["Blockchain", "Solidity", "Ethereum", "Smart Contracts", "Cryptocurrency"],
    "game developer": ["Unity", "C#", "Game Development", "3D Modeling", "Game Design"],
    "software engineer": ["Software Development", "Algorithms", "Data Structures", "Java", "Python"],
    "front end developer": ["HTML", "CSS", "JavaScript", "React", "Front End Development"],
    "back end developer": ["Node.js", "Express.js", "MongoDB", "APIs", "Back End Development"],
    "mobile developer": ["Java", "Android", "Swift", "iOS", "Mobile Development"],
    "system analyst": ["System Analysis", "Requirements Gathering", "UML", "Software Development", "SQL"],
    "IT manager": ["IT Management", "Leadership", "Project Management", "IT Strategy", "Budgeting"],
    "network administrator": ["Network Administration", "Cisco", "Routers", "Switches", "Firewalls"],
    "software tester": ["Software Testing", "Manual Testing", "Automated Testing", "Test Cases", "Quality Assurance"],
    "IT consultant": ["IT Consulting", "Business Analysis", "Project Management", "Technical Support", "Customer Service"],
    "data engineer": ["Data Engineering", "Big Data", "ETL", "SQL", "Python"],
    "IT director": ["IT Management", "Leadership", "Strategic Planning", "Budgeting", "IT Strategy"],
    "IT technician": ["Technical Support", "Troubleshooting", "Hardware", "Software", "Customer Service"],
    "web designer": ["Web Design", "HTML", "CSS", "JavaScript", "UI/UX Design"],
    "computer programmer": ["Programming", "Algorithms", "Data Structures", "Java", "Python"],
    "software architect": ["Software Architecture", "Design Patterns", "System Design", "Software Development", "Java"],
    "IT specialist": ["IT Support", "Technical Support", "Troubleshooting", "Hardware", "Software"],
    "data manager": ["Data Management", "Data Analysis", "SQL", "Database Management", "Data Governance"],
    "it analyst": ["IT Analysis", "Requirements Gathering", "Technical Support", "SQL", "Data Analysis"],
    "Mechanical Engineer": ["CAD Software", "Thermodynamics", "Materials Science", "Problem Solving", "Project Management"],
    "Civil Engineer": ["AutoCAD", "Structural Engineering", "Construction Management", "Project Management", "Geotechnical Engineering"],
    "Electrical Engineer": ["Circuit Design", "Power Systems", "Electronics", "Renewable Energy", "Control Systems"],
    "Chemical Engineer": ["Chemical Engineering", "Process Engineering", "Materials Science", "Thermodynamics", "Fluid Dynamics"],
    "Aerospace Engineer": ["Aerodynamics", "Aerospace Engineering", "Flight Mechanics", "Space Systems", "Propulsion"],
    "Biomedical Engineer": ["Biomechanics", "Biomaterials", "Medical Devices", "Biomedical Imaging", "Tissue Engineering"],
    "Environmental Engineer": ["Environmental Engineering", "Water Resources", "Sustainability", "Air Quality", "Waste Management"],
    "Industrial Engineer": ["Lean Manufacturing", "Six Sigma", "Operations Research", "Supply Chain Management", "Process Improvement"],
    "Materials Engineer": ["Materials Science", "Metallurgy", "Polymer Science", "Nanotechnology", "Materials Testing"],
    "Petroleum Engineer": ["Petroleum Engineering", "Reservoir Engineering", "Drilling Engineering", "Production Engineering", "Oil & Gas"],
    "Structural Engineer": ["Structural Engineering", "Building Design", "Construction Management", "Seismic Design", "Structural Analysis"],
    "Content Writer": ["Research Skills", "SEO Writing", "Editing", "Creativity", "Time Management"],
    "Copywriter": ["Copywriting", "Content Marketing", "SEO", "Advertising", "Marketing"],
    "Social Media Manager": ["Social Media Marketing", "Content Strategy", "Community Management", "Analytics", "Creativity"],
    "Marketing Manager": ["Marketing Strategy", "Digital Marketing", "Brand Management", "Market Research", "Leadership"],
    "Public Relations Specialist": ["Public Relations", "Media Relations", "Press Releases", "Crisis Management", "Event Planning"],
    "SEO Specialist": ["SEO", "Keyword Research", "Link Building", "Analytics", "Content Marketing"],
    "Email Marketing Specialist": ["Email Marketing", "Marketing Automation", "Copywriting", "Lead Generation", "CRM"],
    "Content Marketing Specialist": ["Content Marketing", "Blogging", "Social Media", "SEO", "Copywriting"],
    "Brand Manager": ["Brand Management", "Marketing Strategy", "Product Development", "Advertising", "Market Research"],
    "Digital Marketing Specialist": ["Digital Marketing", "SEO", "Social Media Marketing", "PPC", "Analytics"],
    "Sales Manager": ["Sales Strategy", "CRM Software", "Negotiation", "Team Leadership", "Market Analysis"],
    "Account Manager": ["Account Management", "Client Relations", "Sales", "Customer Service", "Communication"],
    "Business Development Manager": ["Business Development", "Sales", "Lead Generation", "Negotiation", "CRM"],
    "Customer Service Manager": ["Customer Service", "Team Management", "Problem Solving", "Communication", "CRM"],
    "Project Coordinator": ["Project Management", "Organization", "Time Management", "Communication", "Teamwork"],
    "Human Resources Manager": ["Recruitment", "Employee Relations", "Performance Management", "HR Software", "Compliance"],
    "Video Editor": ["Adobe Premiere Pro", "Final Cut Pro", "Storyboarding", "Color Grading", "Sound Editing"],
    "SEO Specialist": ["Keyword Research", "On-Page SEO", "Link Building", "Analytics Tools", "Content Strategy"],
    "Pharmaceutical Sales Representative": ["Product Knowledge", "Sales Techniques", "Relationship Building", "Market Research", "Regulatory Compliance"],
    "Social Worker": ["Counseling Skills", "Crisis Intervention", "Case Management", "Empathy", "Community Resources"],
    "Real Estate Agent": ["Market Analysis", "Negotiation", "Sales Skills", "Networking", "Customer Service"],
    "Event Planner": ["Budgeting", "Vendor Management", "Time Management", "Communication", "Problem Solving"],
    "Clinical Psychologist": ["Therapeutic Techniques", "Assessment Skills", "Empathy", "Research Skills", "Communication"],
    "Photographer": ["Camera Operation", "Lighting Techniques", "Photo Editing", "Composition", "Creativity"],
    "E-commerce Manager": ["Digital Marketing", "Product Management", "Customer Experience", "Analytics", "Inventory Management"],
    "Fitness Trainer": ["Exercise Physiology", "Nutrition Knowledge", "Motivational Skills", "Program Design", "Client Assessment"],
    "Interior Designer": ["AutoCAD", "Space Planning", "Color Theory", "Furniture Design", "Project Management"],
    "Chef": ["Culinary Skills", "Food Safety", "Menu Planning", "Creativity", "Time Management"],
    "Personal Trainer": ["Fitness Training", "Nutrition Knowledge", "Client Assessment", "Goal Setting", "Motivation"],
    "Nurse": ["Patient Care", "Medical Knowledge", "Empathy", "Critical Thinking", "Communication"],
    "Dental Hygienist": ["Dental Procedures", "Patient Education", "Dental Software", "Instrument Sterilization", "Oral Health"],
    "Physical Therapist": ["Rehabilitation Techniques", "Patient Assessment", "Exercise Therapy", "Manual Therapy", "Patient Education"],
    "Veterinarian": ["Animal Medicine", "Surgery", "Diagnostic Imaging", "Animal Behavior", "Client Communication"],
    "Teacher": ["Lesson Planning", "Classroom Management", "Curriculum Development", "Student Assessment", "Parent Communication"],
    "Librarian": ["Library Science", "Information Literacy", "Cataloging", "Research Skills", "Customer Service"],
    "Police Officer": ["Law Enforcement", "Criminal Investigation", "Emergency Response", "Community Policing", "Physical Fitness"],
    "Firefighter": ["Firefighting", "Emergency Response", "Fire Safety", "Physical Fitness", "Teamwork"],
    "Paramedic": ["Emergency Medical Care", "Patient Assessment", "Ambulance Operations", "Medical Equipment", "CPR"],
    "Security Guard": ["Surveillance", "Access Control", "Emergency Response", "Security Systems", "Customer Service"]
};

function fetchSkillSuggestions() {
    const jobRole = document.getElementById('job-role').value.toLowerCase();
    const suggestionsContainer = document.getElementById('skill-suggestions');
    suggestionsContainer.innerHTML = '';

    const normalizedSkillSuggestions = Object.keys(skillSuggestions).reduce((acc, key) => {
        acc[key.toLowerCase()] = skillSuggestions[key];
        return acc;
    }, {});

    if (normalizedSkillSuggestions[jobRole]) {
        normalizedSkillSuggestions[jobRole].forEach(skill => {
            const skillElem = document.createElement('div');
            skillElem.classList.add('skill-suggestion');
            skillElem.innerText = skill;
            skillElem.onclick = () => addSkill(skill);
            suggestionsContainer.appendChild(skillElem);
        });
    }
}

function addSkill(skill) {
    const repeater = document.querySelector('[data-repeater-list="group-e"]');
    const newItem = document.createElement('div');
    newItem.setAttribute('data-repeater-item', '');
    newItem.innerHTML = `
        <div class="cv-form-row cv-form-row-skills">
            <div class="form-elem">
                <label for="" class="form-label">Skill</label>
                <input name="skill" type="text" class="form-control skill" value="${skill}" onkeyup="generateCV()">
                <span class="form-text"></span>
            </div>
            <button data-repeater-delete type="button" class="repeater-remove-btn">-</button>
        </div>
    `;
    repeater.appendChild(newItem);
    generateCV();
}

function printCV(){
    window.print();
}

document.getElementById('generate-qr-btn').addEventListener('click', function() {
    const resumeLink = window.location.href; // Get the current page URL
    const qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = ''; // Clear any existing QR code
    new QRCode(qrcodeContainer, {
        text: resumeLink,
        width: 128,
        height: 128
    });
});
// Function to update analytics data
function updateAnalytics(action, section = null) {
    let analyticsData = JSON.parse(localStorage.getItem('resumeAnalytics')) || {
        totalEdits: 0,
        sectionUsage: {},
        totalTimeSpent: 0
    };

    switch(action) {
        case 'edit':
            analyticsData.totalEdits++;
            break;
        case 'useSection':
            if (section) {
                if (!analyticsData.sectionUsage[section]) {
                    analyticsData.sectionUsage[section] = 0;
                }
                analyticsData.sectionUsage[section]++;
            }
            break;
        case 'updateTime':
            analyticsData.totalTimeSpent += section; // section parameter used to pass time in seconds
            break;
    }

    localStorage.setItem('resumeAnalytics', JSON.stringify(analyticsData));
}

// Timer to track time spent on the resume
let startTime = Date.now();

function updateTimeSpent() {
    const currentTime = Date.now();
    const timeSpent = Math.floor((currentTime - startTime) / 1000); // time in seconds
    updateAnalytics('updateTime', timeSpent);
    startTime = currentTime; // reset start time
}

// Example usage of updateAnalytics function
mainForm.addEventListener('input', function(event) {
    updateAnalytics('edit');
    updateAnalytics('useSection', event.target.name);
    updateTimeSpent();
});

// Handle the beforeprint and afterprint events
window.addEventListener('beforeprint', function() {
    // Actions before the print dialog is shown
});

window.addEventListener('afterprint', function() {
    // Actions after the print dialog is confirmed
    updateTimeSpent();
});

document.getElementById('download-btn').addEventListener('click', function() {
    updateAnalytics('download');
    updateTimeSpent();
});

// Update time spent when the user leaves the page
window.addEventListener('beforeunload', function() {
    updateTimeSpent();
});

// Add event listener to download report button
document.getElementById('download-report-btn').addEventListener('click', downloadAnalyticsReport);

// print CV
function printCV(){
    window.print();
}
// print CV
function printCV(){
    window.print();
}