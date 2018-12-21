export default class Module {
    constructor(module){
        this.module = module;
        this.add_defaults();
        this.original_state = JSON.parse(JSON.stringify(this.module.state));
        this.add_reset_all();
        this.add_reset_each();
        this.add_set_each();
        this.add_getters_state();
        this.add_getters_each();
        return this.module;
    }
    add_defaults(){
        this.module.namespaced = true;
        if(!this.module.mutations){
            this.module.mutations = {};
        }
        if(!this.module.actions){
            this.module.actions = {};
        }
        if(!this.module.getters){
            this.module.getters = {};
        }
        if(!this.module.state){
            this.module.state = {};
        }
        if(this.module.state.creating == undefined){
            this.module.state.creating = false;
        }
        if(this.module.state.deleting == undefined){
            this.module.state.deleting = false;
        }
        if(this.module.state.updating == undefined){
            this.module.state.updating = false;
        }
        if(this.module.state.fetching == undefined){
            this.module.state.fetching = false;
        }
    }
    add_reset_all(){
        if(!this.module.mutations['reset']) {
            this.module.mutations['reset'] = (store,payload)=>{
                Object.keys(this.module.state).forEach((key) => {
                    this.module.state[key] = this.original_state[key];
                });
            }
        }
        if(!this.module.actions['reset']) {
            this.module.actions['reset'] = (store,payload)=>{
                this.module.mutations['reset'](store,payload);
            }
        }
    }
    add_reset_each(){
            Object.keys(this.module.state).forEach((key) => {
                if(!this.module.mutations['reset_'+key]) {
                    this.module.mutations['reset_'+key] = (store,payload)=>{
                        this.module.state[key] = this.original_state[key];
                    };
                }
                if(!this.module.actions['reset_'+key]) {
                    this.module.actions['reset_'+key] = (store,payload)=>{
                        this.module.mutations['reset_'+key](store,payload);
                    };
                }
            });
    }
    add_set_each(){
        Object.keys(this.module.state).forEach((key) => {
            if(!this.module.mutations['set_'+key]) { 
                this.module.mutations['set_'+key] = (store,payload)=>{
                    this.module.state[key] = payload;
                };
             }
            if(!this.module.actions['set_'+key]) { 
                this.module.actions['set_'+key] = (store,payload)=>{
                    this.module.mutations['set_'+key](store,payload);
                };
             }
        });
    }
    add_getters_state(){
        if(!this.module.mutations['state']) { 
            this.module.getters['state'] = (state)=>{
                return state;
            };
         }
    }
    add_getters_each(){
        Object.keys(this.module.state).forEach((key) => {
            if(!this.module.getters[key]) { 
                this.module.getters[key] = (state)=>{
                    return state[key];
                };
             }
        });
    }

}

