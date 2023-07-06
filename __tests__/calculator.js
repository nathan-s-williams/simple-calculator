const calculateExpression = require('../script');

it('3', () => {
    expect(calculateExpression('3')).toBe('3');
});

it('3+5-4*2', () => {
    expect(calculateExpression('3+5-4*2')).toBe(0);
});

it('3+5-9+2-5*2', () => {
    expect(calculateExpression('3+5-9+2-5*2')).toBe(-9);
});

it('3+5-9+2-5*20', () => {
    expect(calculateExpression('3+5-9+2-5*20')).toBe(-99);
});

it('3+5-9+2', () => {
    expect(calculateExpression('3+5-9+2')).toBe(1);
});


it('3*5+2', () => {
    expect(calculateExpression('3*5+2')).toBe(17);
});

it('3+3*5+2', () => {
    expect(calculateExpression('3+3*5+2')).toBe(20);
});

it('3+20/5+2', () => {
    expect(calculateExpression('3+20/5+2')).toBe(9);
});