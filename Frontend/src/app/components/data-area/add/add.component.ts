import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/app/models/event-model';
import { EventTypeModel } from 'src/app/models/event-type-model';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class AddComponent {

    public event = new EventModel();

    public eventTypes: EventTypeModel[] = [];

    public currentDate: string;

    public constructor(private dataService: DataService, private router: Router, private notifyService: NotifyService) { }


    public async ngOnInit() {
        try {

            this.eventTypes = await this.dataService.getAllEventTypes();

            this.currentDate = new Date().toISOString().substr(0, 16);

        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

    public async send() {
        try {

            await this.dataService.addEvent(this.event);
            
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Event added',
                showConfirmButton: false,
                timer: 1500
            })
            this.router.navigateByUrl("/home");
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }
}
