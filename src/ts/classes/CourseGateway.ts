/* 
 * Gateway for handling Course methods 
 * — by Sofie Wallin, student at MIUN 2021
 */
import { Course } from '../interfaces/Course';
import { Message } from '../interfaces/Message';

export class CourseGateway {
    private api = 'https://studenter.miun.se/~sowa2002/dt173g/kursmoment5-rest/courses.php';

    /*------ Get courses ------*/

    async get(): Promise<Course[]> {
        /* Get courses from web service  */
        const response = await fetch(this.api);
        /* Get response */
        const courses = await response.json();
        /* Check if response is not ok */
        if (!response.ok) {
            throw new Error(response.statusText); // Throw error
        }
        /* Return response promise */
        return courses;
    }

    /*------ Create course from course object ------*/
    async create(course: Course): Promise<Message> {
        /* Create course in web service  */
        const response = await fetch(this.api, {
            method: 'POST',
            body: JSON.stringify(course)
        })
        /* Get response */
        const data = await response.json();
        /* Check if response is not ok */
        if (!response.ok) {
            throw new Error(response.statusText) // Throw error
        }
        /* Return response promise */
        return data;
    }
}