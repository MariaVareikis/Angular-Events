import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/event-model';
import { EventTypeModel } from 'src/app/models/event-type-model';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    public eventTypes: EventTypeModel[] = [];
    public events: EventModel[] = [];
    public today = new Date().toISOString();
    public time = new Date().toLocaleTimeString();

    public constructor(private dataService: DataService, private notifyService: NotifyService) { }

    public async ngOnInit() {
        try {
            this.eventTypes = await this.dataService.getAllEventTypes();
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

    public async displayEvents(args: Event) {
        try {
            const selectElement = args.target as HTMLSelectElement;
            const eventTypeId = selectElement.value;
            this.events = await this.dataService.getEventsByType(eventTypeId);
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

    public async deleteMe(_id: string) {
        try {

            await this.dataService.deleteEvent(_id);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Event has been deleted',
                showConfirmButton: false,
                timer: 1500
            })

            // Refresh list:
            const index = this.events.findIndex(m => m._id === _id);
            this.events.splice(index, 1);

        }
        catch (err: any) {
            this.notifyService.error(err);

        }
    }
}
