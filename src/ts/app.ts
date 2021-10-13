import { CourseGateway } from './classes/CourseGateway';
import { TableTemplate } from './classes/TableTemplate';

/*----- Store HTML elements ------*/

/* Table */
const tableBody = document.querySelector('tbody') as HTMLTableSectionElement;

/* Form */
const form = document.querySelector('#add-course') as HTMLFormElement;

const startDateInput = document.querySelector('#start-date') as HTMLInputElement;
const startDateError = document.querySelector('#start-date + span.error') as HTMLSpanElement;

const endDateInput = document.querySelector('#end-date') as HTMLInputElement;
const endDateError = document.querySelector('#end-date + span.error') as HTMLSpanElement;

const codeInput = document.querySelector('#code') as HTMLInputElement;
const codeError = document.querySelector('#code + span.error') as HTMLSpanElement;

const titleInput = document.querySelector('#title') as HTMLInputElement;
const titleError = document.querySelector('#title + span.error') as HTMLSpanElement;

const progressionSelect = document.querySelector('#progression') as HTMLSelectElement;

const syllabusInput = document.querySelector('#syllabus') as HTMLInputElement;
const syllabusError = document.querySelector('#syllabus + span.error') as HTMLSpanElement;

const successMessage = document.querySelector('.success') as HTMLParagraphElement;

/*------ Create instances of neccessary classes ------*/

const courseGateway = new CourseGateway();
const tableTemplate = new TableTemplate(tableBody);

/*------ Print courses ------*/

export const printCourses = () => {
    /* Get courses from web service using CourseGateway class */
    courseGateway.get()
        .then(courses => {
            /* Loop through courses */
            courses.forEach(course => {
                /* Get data */
                const code = course.code;
                const title = course.title;
                const progression = course.progression;
                const syllabus = course.syllabus;

                /* Render each course with data using TableTemplate class */
                tableTemplate.render(code, title, progression, syllabus);
            });
        });
}
/*------ Show error messages if fields are not valid ------*/

const showErrorMessage = (field: HTMLInputElement): void => {
    let errorMessage: string;
    switch(field) {
        /* Start date error messages */
        case startDateInput:
            /* Check error type and set correct error message */
            if(field.validity.valueMissing) {
                errorMessage = `Fyll i ett startdatum.`;
            } else if(field.validity.rangeUnderflow) {
                errorMessage = `Fyll i ett startdatum från och med ${field.min}.`;
            } else if(field.validity.rangeOverflow) {
                errorMessage = `Fyll i ett startdatum innan ${field.max}.`;
            }
            startDateInput.className = 'invalid'; // Give field invalid class
            startDateError.innerHTML = errorMessage; // Write error message
            startDateError.className = 'error is-active'; // Show error
            break;
        /* End date error messages */
        case endDateInput:
            /* Check error type and set correct error message */
            if(field.validity.valueMissing) {
                errorMessage = `Fyll i ett slutdatum.`;
            } else if(field.validity.rangeUnderflow) {
                errorMessage = `Fyll i ett slutdatum från och med ${field.min}.`;
            } else if(field.validity.rangeOverflow) {
                errorMessage = `Fyll i ett slutsdatum innan ${field.max}.`;
            }
            endDateInput.className = 'invalid'; // Give field invalid class
            endDateError.innerHTML = errorMessage; // Write error message
            endDateError.className = 'error is-active'; // Show error
            break;
        /* Code error messages */
        case codeInput:
            /* Check error type and set correct error message */
            if(field.validity.valueMissing) {
                errorMessage = `Fyll i en kurskod, ex. DT057G.`;
            } else if(field.validity.tooShort) {
                errorMessage = `Fyll i en kurskod med minst ${field.minLength} tecken, ex. DT057G.`;
            } else if(field.validity.tooLong) {
                errorMessage = `Fyll i en kurskod med max ${field.maxLength} tecken, ex. DT057G.`;
            }
            codeInput.className = 'invalid'; // Give field invalid class
            codeError.innerHTML = errorMessage; // Write error message
            codeError.className = 'error is-active'; // Show error
            break;
        /* Title error messages */
        case titleInput:
            /* Check error type and set correct error message */
            if(field.validity.valueMissing) {
                errorMessage = `Fyll i ett kursnamn, ex. Webbutveckling I.`;
            } else if(field.validity.tooShort) {
                errorMessage = `Fyll i ett kursnamn med minst ${field.minLength} tecken, ex Webbutveckling I.`;
            } else if(field.validity.tooLong) {
                errorMessage = `Fyll i ett kursnamn med max ${field.maxLength} tecken, ex Webbutveckling I.`;
            }
            titleInput.className = 'invalid'; // Give field invalid class
            titleError.innerHTML = errorMessage; // Write error message
            titleError.className = 'error is-active'; // Show error
            break;
        /* Syllabus error messages */
        case syllabusInput:
            /* Check error type and set correct error message */
            if(field.validity.valueMissing) {
                errorMessage = `Fyll i en kursplanslänk. <a href="https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/Sok-kursplan/" target="_blank" rel="noreferrer noopener">Sök kursplan här</a>.`;
            } else if(field.validity.typeMismatch) {
                errorMessage = `Fyll i en giltig kursplanslänk. Den måste börja med https://.`;
            } else if(field.validity.tooLong) {
                errorMessage = `Fyll i en kursplanslänk med ${field.maxLength} tecken. <a href="https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/Sok-kursplan/" target="_blank" rel="noreferrer noopener">Sök kursplan här</a>.`;
            }
            syllabusInput.className = 'invalid'; // Give field invalid class
            syllabusError.innerHTML = errorMessage; // Write error message
            syllabusError.className = 'error is-active'; // Show error
            break;
    }
}

/*------ Add event listeners to form fields for validation ------*/

/* Start date field event listener */
startDateInput.addEventListener('input', (e: Event) => {
    /* Check if field is valid */
    if(startDateInput.validity.valid) {
        startDateInput.className = 'valid'; // Give field valid class
        startDateError.innerHTML = ''; // Remove error message
        startDateError.className = 'error'; // Hide error
    } else {
        showErrorMessage(startDateInput); // Show error message
    }
});

/* End date field event listener */
endDateInput.addEventListener('input', (e: Event) => {
    /* Check if field is valid */
    if(endDateInput.validity.valid) {
        endDateInput.className = 'valid'; // Give field valid class
        endDateError.innerHTML = ''; // Remove error message
        endDateError.className = 'error'; // Hide error
    } else {
        showErrorMessage(endDateInput); // Show error message
    }
});

/* Code field event listener */
codeInput.addEventListener('input', (e: Event) => {
    /* Check if field is valid */
    if(codeInput.validity.valid) {
        codeInput.className = 'valid'; // Give field valid class
        codeError.innerHTML = ''; // Remove error message
        codeError.className = 'error'; // Hide error
    } else {
        showErrorMessage(codeInput); // Show error message
    }
});

/* Title field event listener */
titleInput.addEventListener('input', (e: Event) => {
    /* Check if field is valid */
    if(titleInput.validity.valid) {
        titleInput.className = 'valid'; // Give field valid class
        titleError.innerHTML = ''; // Remove error message
        titleError.className = 'error'; // Hide error
    } else {
        showErrorMessage(titleInput); // Show error message
    }
});

/* Syllabus field event listener */
syllabusInput.addEventListener('input', (e: Event) => {
    /* Check if field is valid */
    if(syllabusInput.validity.valid) {
        syllabusInput.className = 'valid'; // Give field valid class
        syllabusError.innerHTML = ''; // Remove error message
        syllabusError.className = 'error'; // Hide error
    } else {
        showErrorMessage(syllabusInput); // Show error message
    }
});

/*------ Add course ------*/

const addCourse = () => {
    /* Create course object */
    const course = {
        "start_date":startDateInput.value,
        "end_date":endDateInput.value,
        "code":codeInput.value,
        "title":titleInput.value,
        "progression":progressionSelect.value,
        "syllabus":syllabusInput.value
    };
    
    /* Create course in web service from course object using CourseGateway class */
    courseGateway.create(course)
        .then(data => {
            successMessage.className = 'success is-active'; // Activate success message
            successMessage.innerText = data.message; // Write success message
            tableBody.innerHTML = ''; // Empty courses*/
            
            /* Empty all values */
            startDateInput.value = '';
            endDateInput.value = '';
            codeInput.value = '';
            titleInput.value = '';
            syllabusInput.value = '';

            printCourses(); // Print courses again
        });
}

/* Add a event listener for when the form is submitted */
form.addEventListener('submit', (e: Event) => {
    e.preventDefault(); // Prevent default form behaviour

    /* Check if form fields are not valid */
    if(!startDateInput.validity.valid) {
        showErrorMessage(startDateInput); // Show error message
    } else if(!endDateInput.validity.valid) {
        showErrorMessage(endDateInput); // Show error message
    } else if(!codeInput.validity.valid) {
        showErrorMessage(codeInput); // Show error message
    } else if(!titleInput.validity.valid) {
        showErrorMessage(titleInput); // Show error message
    } else if(!syllabusInput.validity.valid) {
        showErrorMessage(syllabusInput); // Show error message
    } else {
        addCourse(); // Add course
    }
});