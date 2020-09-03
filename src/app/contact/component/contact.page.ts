import {Component, OnInit, ViewChild} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {AppRoutes} from '../../shared/config/routes';
import {User} from '../../shared/model/user';
import {ChatMessage, ChatMessageEntity} from '../../shared/model/chatmessage';
import {IonContent, IonInput} from '@ionic/angular';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.page.html',
    styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

    @ViewChild('content',{static:false}) private content: IonContent;
    @ViewChild('inputChat',{static:false}) private inputChat: IonInput;

    public appRoutes = AppRoutes;

    /**
     * @var User
     */
    public user: User;
    /**
     * @var string
     */
    public topic: string;

    /**
     * @var bool
     */
    public isOnline = true;

    /**
     * @var array
     */
    public messages: ChatMessage[] = [];

    constructor(public contactService: ContactService) {
    }

    ngOnInit() {
        this.user = this.contactService.appService.user;
        this.topic = this.getTopic();

        this.scrollToBottom();

        this.contactService.chatMessages.subscribe((chatMessages: ChatMessage[]) => {
            this.messages = chatMessages;
            this.scrollToBottom();
        });

        this.contactService.openService.subscribe((open: boolean) => {
            if (!open) {
                this.contactService.disconnect();
            }
            this.isOnline = open;
        });
    }

    ionViewWillEnter() {
        this.contactService.getMessageAPI(this.topic).then(() => {
            this.contactService.connect(this.topic);
        });
    }

    ionViewWillLeave() {
        this.contactService.disconnect();
    }

    /**
     * @method sendMessage
     */
    public sendMessage() {
        this.inputChat.getInputElement().then((el: HTMLInputElement) => {

            if (!el.value) {
                return;
            }

            this.messages.push(new ChatMessageEntity({
                'body': el.value,
                'owner': 'TIENDA',
                'name': this.user.name,
                'email': this.user.email,
                'topic': this.topic
            }));

            el.value = '';

            this.scrollToBottom();

        });
        /*const data = Utils.getFormData({
            'message': 'Hola soy yo',
            'owner': 'TIENDA',
            'name': this.user.name,
            'email': this.user.email
        });
        this.contactService.sendMessage('topic-store-13', data);*/
    }

    /**
     * @method scrollToBottom
     * @private
     */
    private scrollToBottom() {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom(300).then();
            }
        });
    }

    /**
     * @method getTopic
     * @private
     */
    private getTopic() {
        return this.user.role_admin ? `topic-store-${this.user.id}` : `topic-agent-${this.user.id}`;
    }

}
