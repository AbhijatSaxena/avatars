import Prando from 'prando';

export type Prng = {
  seed: string;
  bool(likelihood?: number): boolean;
  integer(min: number, max: number): number;
  pick<T>(arr: T[]): T;
};

export function create(seed: string): Prng {
  let prng = new Prando(seed);

  return {
    seed,
    bool(likelihood: number = 50) {
      return prng.next(0, 100) < likelihood;
    },
    integer(min: number, max: number) {
      return prng.nextInt(min, max);
    },
    pick<T>(arr: T[]): T {
      return prng.nextArrayItem(arr);
    },
  };
}
