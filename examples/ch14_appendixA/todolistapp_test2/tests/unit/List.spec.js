import Vue from 'vue'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import store from '@/store'
import List from '@/components/List'
import Constant from '@/Constant'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('List.vue', () => {
    let wrapper

    beforeAll(() => {
        wrapper = mount(List, { store, localVue });
        wrapper.vm.$store.dispatch(Constant.ADD_TODO, { todo:'스쿼시2'})
    })

    it('초기 렌더링 화면 테스트(Jest)', () => {
        expect(wrapper.vm.$el.querySelectorAll('li').length).toEqual(5);
    });

    it('스냅샷 테스트(Jest)', (done)=> {
        Vue.nextTick()
        .then(() => {
            expect(wrapper.vm.$el).toMatchSnapshot();
            done()
        })
        .catch(done);
    })
});