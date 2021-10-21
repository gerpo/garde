import {shallowMount} from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';

it('displays message', () => {
    const wrapper = shallowMount(HelloWorld, {
        props: {
            msg: 'Hello world'
        }
    })

    // Assert the rendered text of the component
    expect(wrapper.text()).toContain('Hello world')
})