import { getScheme, getSchemesFromPlist, hasScheme, removeScheme, setScheme } from '../Scheme';

describe('scheme', () => {
  it(`returns empty array if no scheme is provided`, () => {
    expect(getScheme({})).toStrictEqual([]);
  });

  it(`returns the scheme if provided`, () => {
    expect(getScheme({ scheme: 'myapp' })).toStrictEqual(['myapp']);
    expect(
      getScheme({
        scheme: ['myapp', 'other', null],
      })
    ).toStrictEqual(['myapp', 'other']);
  });

  it(`sets the CFBundleUrlTypes if scheme is given`, () => {
    expect(setScheme({ scheme: ['myapp', 'more'] }, {})).toMatchObject({
      CFBundleURLTypes: [{ CFBundleURLSchemes: ['myapp', 'more'] }],
    });
  });

  it(`makes no changes to the infoPlist no scheme is provided`, () => {
    expect(setScheme({}, {})).toMatchObject({});
  });

  it(`verifies that a scheme exists`, () => {
    const infoPlist = {
      CFBundleURLTypes: [{ CFBundleURLSchemes: ['myapp'] }],
    };
    expect(hasScheme('myapp', infoPlist)).toBe(true);
    expect(hasScheme('myapp2', infoPlist)).toBe(false);
  });

  it(`lists all of the schemes`, () => {
    const infoPlist = {
      CFBundleURLTypes: [
        { CFBundleURLSchemes: ['myapp1', 'myapp2'] },
        { CFBundleURLSchemes: ['myapp3'] },
      ],
    };
    expect(getSchemesFromPlist(infoPlist).length).toBe(3);
  });

  it(`removes a scheme`, () => {
    let infoPlist = {
      CFBundleURLTypes: [
        { CFBundleURLSchemes: ['myapp1', 'myapp2'] },
        { CFBundleURLSchemes: ['myapp3'] },
      ],
    };
    expect(removeScheme('myapp3', infoPlist)).toStrictEqual({
      CFBundleURLTypes: [{ CFBundleURLSchemes: ['myapp1', 'myapp2'] }],
    });
  });
});
