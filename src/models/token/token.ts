enum TokenType {
  Bearer = "Bearer"
}

export class Token {
  constructor(input?: Token) {
    Object.assign(this, input);
  }

  token_type: TokenType;
  expires_in: number;
  access_token: string;

  getToken(): string {
    return `${this.token_type} ${this.access_token}`;
  }
}
