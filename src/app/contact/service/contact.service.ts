import {AppService} from '../../shared/service/app.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ChatMessage} from '../../shared/model/chatmessage';
import {Utils} from '../../shared/utils/utils';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    /**
     * @var EventSource
     * @private
     */
    private eventSource: EventSource;

    public openService: Subject<boolean> = new Subject<boolean>();
    public chatMessages: Subject<ChatMessage[]> = new Subject<ChatMessage[]>();

    constructor(public appService: AppService) {
    }

    /**
     * @method getMessageAPI
     * @param topic
     */
    public async getMessageAPI(topic) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            this.appService.post(`discover/${topic}/api/messages`, {}, {}, true)
                .subscribe(
                    (resp: ChatMessage[]) => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.chatMessages.next(resp);
                        });
                    }, (err) => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(Utils.pareseError(err));
                        });
                    });
        });
    }

    /**
     * @method connect
     * @param topic
     */
    public connect(topic) {

        this.appService.get(`discover/${topic}/invoke`, {observe: 'response'})
            .subscribe((response: any) => {

                // Extract the hub URL from the Link header
                const hubUrl = response.headers.get('Link').match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/)[1];

                // Append the topic(s) to subscribe as query parameter
                const hub = new URL(hubUrl);
                hub.searchParams.append('topic', topic);

                // Subscribe to updates
                this.eventSource = new EventSource(hub.toString(), {
                    withCredentials: false
                });

                this.eventSource.onopen = () => {
                    this.openService.next(true);
                };

                this.eventSource.onerror = () => {
                    this.openService.next(false);
                };

                this.eventSource.onmessage = (event: MessageEvent) => {
                    console.log(event.data);
                };

            }, () => {
                this.openService.next(false);
            });

    }

    /**
     * @method disconnect
     */
    public disconnect() {
        if (this.eventSource) {
            this.eventSource.close();
        }
    }

    /**
     * @method sendMessage
     * @param topic
     * @param data
     */
    public sendMessage(topic, data) {
        this.appService.post(`publish/${topic}/invoke`, data, {}, true)
            .subscribe((response) => {
                console.log(response);
            }, error => {

            });

    }
}
