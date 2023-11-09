import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate the string if it exceeds the limit', () => {
    const inputString = 'Lorem ipsum dolor sit amet';
    const limit = 10;
    const result = pipe.transform(inputString, limit);
    expect(result).toBe('Lorem ipsu...');
  });

  it('should not truncate the string if it does not exceed the limit', () => {
    const inputString = 'Short string';
    const limit = 20;
    const result = pipe.transform(inputString, limit);
    expect(result).toBe('Short string');
  });

  it('should handle "" input', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });

});
