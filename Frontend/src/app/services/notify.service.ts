import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class NotifyService {

        public success(message: string): void {
            Swal.fire({
                title: message,
                icon: "success"
            });
        }
    
        public error(err: any): void {
            const message = this.extractErrorMessage(err);
            Swal.fire({
                title: message,
                icon: "error"
            });
        }
    
        private extractErrorMessage(err: any): string {

            // Front: throw "some error...";
            if (typeof err === "string") return err;
    
            // Back: throws string (500 - server crash / 401 - unauthorized / 404...)
            if (typeof err.error === "string") return err.error;
    
            // Back throws string[] (400 - validation)
            if (Array.isArray(err.error)) return err.error[0];
    
            // Front: throw new Error("some error...");
            if (typeof err.message === "string") return err.message;
    
            // Other: 
            return "Some error occurred, please try again";
        }
}
