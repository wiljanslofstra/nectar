import StubReader from '../readers/stubReader';
import memberValidator from './memberValidator';

test('should validate succesfully', async () => {
  const members = await (new StubReader()).fetch('members.json');

  if (!members || !Array.isArray(members)) {
    throw new Error('members should not be null or empty');
  }
  
  members.forEach((member) => {
    const { error, value } = memberValidator(member);

    expect(error).toBe(undefined);
  });
});

test('should return errors', async () => {
  const members = await (new StubReader()).fetch('members-invalid.json');

  if (!members || !Array.isArray(members)) {
    throw new Error('members should not be null or empty');
  }
  
  members.forEach((member) => {
    const { error, value } = memberValidator(member);

    if (!error) {
      throw new Error('error should not be empty');
    }
    
    const hasEmailError = error.message.indexOf('"email_address" is required') >= 0;
    const hasLanguageError = error.message.indexOf('"language" is required') >= 0;

    expect(hasEmailError).toBe(true);
    expect(hasLanguageError).toBe(true);
  });
});
