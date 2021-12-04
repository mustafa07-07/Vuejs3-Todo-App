import { createStore } from "vuex";
const store = createStore({
  state: {
    person: [
      { id: 1638612845079, text: "Vue Ders 1", priority:'1', completed: false },
      { id: 1638612845080, text: "Vue Ders 2", priority:'2', completed: true },
      { id: 1638612845081, text: "Vue Ders 3", priority:'1', completed: false },
      { id: 1638612845082, text: "Vue Ders 4", priority:'2', completed: true },
      { id: 1638612845083, text: "Vue Ders 5", priority:'1', completed: false },
      { id: 1638612845084, text: "Vue Ders 6", priority:'3', completed: false },
      { id: 1638612845085, text: "Vue Ders 7", priority:'3', completed: true },
    
    ]
},
  getters: {
_listItems: (state) => state.person,
    _completedItemsCount   : (state) => state.person.filter((t) => t.completed).length,
    _unCompletedItemsCount : (state) => state.person.filter((t) => !t.completed).length,
    _totalCount:(state)=>state.person.length,

  },
  mutations: {
    sil(state, item) { 
      this.state.person = state.person.filter((todo) => todo !== item);
    },
    ekle(state,item){
        state.person.push(item);
    },
    guncelle(state,item){
        const foundIndex=state.person.findIndex(i=>i.id ==item.id);
        this.state.person[foundIndex]=item;
    },
  },
});

export default store;
