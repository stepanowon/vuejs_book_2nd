//예제 A-07
import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue'
import store from '@/store'
import TodoList from '@/components/TodoList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TodoList.vue', () => {
    let wrapper

    before(() => {
        wrapper = mount(TodoList, { store, localVue });
    })

    it('TodoList 초기 렌더링 테스트', (done) => {
        Vue.nextTick()
        .then(()=> {
            expect(wrapper.vm.$el.querySelectorAll('li').length).to.equal(4)
            done()
        })
        .catch(done)
    })

    it('클릭이벤트 후 렌더링 결과 확인', (done) => {
        //입력값을 TodoList의 첫번째 자식컴포넌트인 
        //InputTodo 컴포넌트의 로컬 데이터에 새로운 todo 입력
        wrapper.vm.$children[0].$data.todo = "피겨강습";

        const evtClick = new window.Event('click');
        var addbutton = wrapper.vm.$el.querySelector('span.addbutton');
        addbutton.dispatchEvent(evtClick);
        wrapper.vm._watcher.run();
    
        Vue.nextTick()
            .then(() => {
                var list = wrapper.vm.$el.querySelectorAll('li');
                expect(list[list.length-1].textContent).to.contain('피겨강습')
                expect(list.length).to.equal(5)
                done()
            })
            .catch(done)
      })
})




//--- 예제 A-05~06
/*
import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue'
import store from '@/store'
import List from '@/components/List.vue'
import Constant from '@/Constant'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('List.vue', () => {
    let wrapper

    before(() => {
        wrapper = mount(List, { store, localVue });
    })

    it('초기 렌더링 화면 테스트', (done) => {
        Vue.nextTick()
        .then(()=> {
            expect(wrapper.vm.$el.querySelectorAll('li').length).to.equal(4)
            done()
        })
        .catch(done)
    })

    it('새로운 todo 추가후 목록 확인', (done) => {
        wrapper.vm.$store.dispatch(Constant.ADD_TODO, { todo:'스쿼시'})
        wrapper.vm.$store.dispatch(Constant.ADD_TODO, { todo:'수영'})
        Vue.nextTick()
        .then(() => {
            var list = wrapper.vm.$el.querySelectorAll('li');
            expect(list[list.length-1].textContent).to.contain('수영')
            expect(list[list.length-2].textContent).to.contain('스쿼시')
            expect(list.length).to.equal(6)
            done()
        })
        .catch(done)
    })
})
*/
