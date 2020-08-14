import {AppService} from '../../shared/service/app.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(public appService: AppService) {

    }

    public connect(topic) {

        this.appService.get(`discover/${topic}/invoke`, {observe: 'response'})
            .subscribe((response: any) => {

                // Extract the hub URL from the Link header
                const hubUrl = response.headers.get('Link').match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/)[1];

                // Append the topic(s) to subscribe as query parameter
                const hub = new URL(hubUrl);
                hub.searchParams.append('topic', topic);

                // Subscribe to updates
                const eventSource = new EventSource(hub.toString(), {
                    withCredentials: false
                });
                eventSource.onmessage = (event: MessageEvent) => {
                    console.log(event.data);
                };

            }, err => {

            });

    }

    public disconnect() {

    }

    public sendMessage(topic, data) {
        this.appService.post(`publish/${topic}/invoke`, data, {}, true)
            .subscribe((response) => {
                console.log(response);
            }, error => {

            });

    }
}
