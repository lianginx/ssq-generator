export type RedBall = number;
export type BlueBall = number;

export interface SSQTicket {
  reds: RedBall[];
  blue: BlueBall;
}

export interface SSQMultiple {
  reds: RedBall[];
  blues: BlueBall[];
}

export interface SSQDantuo {
  redDan: RedBall[];
  redTuo: RedBall[];
  blueDan?: BlueBall;
  blueTuo?: BlueBall[];
}

export type RandomSource = () => number;
