import { DatexPipe } from './datex.pipe';

describe('DatexPipe', () => {
  it('verify nill', () => {
    const pipe = new DatexPipe();
    const result = pipe.transform(null);
    expect(result).toBe(null);
  });

  it('verify format null', () => {
    const pipe = new DatexPipe();
    const result = pipe.transform('');
    expect(result).toBe('1 January 1970');
  });

  it('verify value not null', () => {
    const pipe = new DatexPipe();
    const result = pipe.transform(new Date());
    expect(result).toContain('2018');
  });
});
