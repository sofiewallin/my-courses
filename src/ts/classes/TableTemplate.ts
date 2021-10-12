/* 
 * Template for listing of courses in a HTML table element 
 * — by Sofie Wallin, student at MIUN 2021
 */

export class TableTemplate {

    /* Constructor that takes any tbody element as a parameter */
    constructor(private tableBody: HTMLTableSectionElement) {}

    /* Method for rendering a table row with the course information listed as parameters */
    render(code: string, title: string, progression: string, syllabus: string): void {
        /* Create table row element */
        const tableRow = document.createElement('tr')!;

        /* Create code table cell element */
        const codeTableCell = document.createElement('td');
        codeTableCell.innerText = code;
        tableRow.append(codeTableCell); // Add to table row

        /* Create title table cell element */
        const titleTableCell = document.createElement('td');
        titleTableCell.innerText = title;
        tableRow.append(titleTableCell); // Add to table row

        /* Create progression table cell element */
        const progressionTableCell = document.createElement('td');
        progressionTableCell.innerText = progression;
        tableRow.append(progressionTableCell); // Add to table row

        /* Create syllabus table cell element */
        const syllabusTableCell = document.createElement('td');
        const syllabusLink = document.createElement('a'); // Create link
        syllabusLink.href = syllabus;
        syllabusLink.innerText = 'Webblänk';
        syllabusTableCell.append(syllabusLink); // Add link to table cell
        tableRow.append(syllabusTableCell); // Add table cell to table row

        /* Create delete button table cell */
        /*const deleteButtonTableCell = document.createElement('td');
        const deleteButton = document.createElement('button'); // Create button
        deleteButton.id = `course-id-${id}`;
        deleteButton.innerText = 'Radera';
        deleteButtonTableCell.append(deleteButton);
        tableRow.append(deleteButtonTableCell);*/

        /* Add table row to table body */
        this.tableBody.append(tableRow);
    }
}