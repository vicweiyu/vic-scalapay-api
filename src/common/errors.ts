interface II18nError {
  lang: 'en-AU' | 'en-GB' | 'en-US';
  errors: Map<string, string>;
}

export const i18n_error_en_AU: II18nError = {
  lang: 'en-AU',

  /**
   * 1000: General Exception
   * 2xxx: Technical Exception
   * 3xxx: Business Exception
   */
  errors: new Map([
    // 1000: General Exception
    ['1000', 'General Exception.'],

    // 2xxx: Technical Exception
    ['2000', 'Technical Exception.'],
    ['2001', 'JWT is expired.'],
    ['2002', 'JWT is incorrect.'],

    // 3xxx: Business Exception
    ['3000', 'Registration input is invalidated.'],
    ['3001', 'Username is already existed.'],
    ['3002', 'Registration failed.'],
    ['3010', 'Login input is invalidated.'],
    ['3011', 'Username or password is incorrect.'],
    ['3012', 'Change password input is invalidated.'],
    ['3013', 'The old password and the new password cannot be the same.'],
    ['3100', 'Order input is invalidated.'],

    // 4xxx: Scalapay Exception
    ['4000', 'Create Order Exception.'], // TODO
  ]),
};
