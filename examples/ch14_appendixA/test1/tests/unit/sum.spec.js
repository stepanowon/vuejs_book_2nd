import { expect } from 'chai'
import sum from '@/sum';

describe('sum', ()=> {
    it('add 2+3 equals 5', ()=> {
        expect(sum(2,3)).to.equals(5);
    })
})