import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EventModel } from '../models/event-model';
import { EventTypeModel } from '../models/event-type-model';
import { appConfig } from '../utils/app-config';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public constructor(private http: HttpClient) { }

    // Get all event types:
    public async getAllEventTypes(): Promise<EventTypeModel[]> {
        const observable = this.http.get<EventTypeModel[]>(appConfig.eventTypesUrl);
        const eventTypes = await firstValueFrom(observable);
        return eventTypes;
    }

    // Get all events by type:
    public async getEventsByType(eventTypeId: string): Promise<EventModel[]> {
        const observable = this.http.get<EventModel[]>(appConfig.eventsByTypeUrl + eventTypeId);
        const events = await firstValueFrom(observable);
        return events;
    }

    // Add event:
    public async addEvent(event: EventModel): Promise<void> {
        const observable = this.http.post<EventModel>(appConfig.eventsUrl, event);
        await firstValueFrom(observable);
    }

     // Delete event:
     public async deleteEvent(eventId: string): Promise<void> {
        const observable = this.http.delete(appConfig.eventsUrl + eventId);
        await firstValueFrom(observable);
    }

}
