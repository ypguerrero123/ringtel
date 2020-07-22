import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/model/user';
import {AgentListService} from '../service/agent-list.service';
import {AppRoutes} from '../../../shared/config/routes';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    public appRoutes = AppRoutes;

    public agents: User[] = [];

    /**
     * Constructor
     * @param agentListService
     */
    constructor(public agentListService: AgentListService) {
    }

    ngOnInit() {
        this.agentListService.allAgents.subscribe((agents: User[]) => {
            this.agents = agents;

            setTimeout(() => {
                this.searchBarListener();
            }, 2000);
        });
        this.agentListService.getAllAgents().then();
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
