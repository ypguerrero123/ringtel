import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {User} from '../../model/user';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    public agents: User[] = [];

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    ngOnInit() {
        this.appService.agentsVars.allAgents.subscribe((agents: User[]) => {
            this.agents = agents;

            setTimeout(() => {
                this.searchBarListener();
            }, 2000);
        });
        this.appService.getAllAgents().then();
    }

    /**
     * @method searchBarListener
     */
    private searchBarListener() {

        const searchbar = document.querySelector('ion-searchbar');
        const items = Array.from(<HTMLCollection> document.querySelector('ion-list').children);

        if (searchbar) {
            searchbar.addEventListener('ionInput', handleInput);
        }

        function handleInput(event) {
            const query = event.target.value.toLowerCase();
            requestAnimationFrame(() => {
                items.forEach((item: HTMLElement) => {
                    const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
                    item.style.display = shouldShow ? 'block' : 'none';
                });
            });
        }
    }

}
