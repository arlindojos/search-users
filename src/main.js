import api from './api';

class App {
    constructor() {
        this.repositorios = [];
        this.formEl = document.getElementById('repo-form'); 
        this.inpuEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');
        this.registorHendlers();
    }
    registorHendlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if(loading === true){
            let loadingEL = document.createElement('span');
            loadingEL.appendChild(document.createTextNode('Carregando...'));
            loadingEL.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEL);
        }else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();
        
        const userInput = this.inpuEl.value;
        if (this.inpuEl === 0)
            return;

        this.setLoading();

        try {
            const response = await api.get(`users/${userInput}`);

            const { login, avatar_url, updated_at, html_url} = response.data;

            this.repositorios.push({
                login,
                avatar_url,
                updated_at,
                html_url,
            });
            this.inpuEl.value = '';
            this.render();
        } catch(err) {
            alert('O usuario não existe');
        }
        
        this.setLoading(false);
    }
    render(){
        this.listEl.innerHTML = '';

        this.repositorios.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl =document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.login));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.updated_at));

            let linkEL = document.createElement('a');
            linkEL.setAttribute('target', '_blank');
            linkEL.setAttribute('href', repo.html_url);
            linkEL.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEL);

            this.listEl.appendChild(listItemEl);
        });
    }
}

new App();
