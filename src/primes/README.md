Some learning exercises in different methods of calculating primes and comparisons of methods.

This project developed to include:

## [_Two checkers_](checkers/):

- [Basic](checkers/basic.ts) - Iterates over any number below and returns `false` if the number is cleanly divisible.

- [Optimized](checkers/optimized.ts) - Same thing as basic, but with every pass decreases the maximum number to check.

> "Checkers", in this context, are `functions that receive a number and return whether it's a prime`

## [_Six calculators_](calculators/):

> "Calculators", in this context, are `functions that receive a range of numbers and return an array of all the primes in the range`

## These calculators, currently, are split into two categories:

- ## The [_naive approach_](calculators/naive-approach/):

  Iterate over all the numbers in range, and check each one:

  - [Basic](calculators/naive-approach/basic.ts) - Iterates over all the numbers in range.

- ## The [_Sieve of Eratosthenes approach_](calculators/sieve/):

  > [**Sieve of Eratosthenes**](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) | [**Different source**](https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html#asymptotic-analysis)

  I've used two "methods" to implement the sieve functions - [_the clean implementation_](calculators/sieve/clean/) and [_the optimized implementation_](calculators/sieve/optimized/).

  The [_clean implementation_](calculators/sieve/clean/) uses the described algorithm and _nothing else_, which means it always goes from 2 to the maximum and filters the results after the run

  The [_optimized implementation_](calculators/sieve/optimized/) was written as a sort of "vacuum answer" to this non-optimal behavior, and while very similar in look and execution, the difference is that these functions start at the minimum, thus needing to [_check each number_](checkers/), instead of assuming the check-list always got rid of non-primes.

  - [Clean basic](calculators/sieve/clean/basic.ts) | [Optimized basic](calculators/sieve/optimized/basic.ts) - A basic implementation of the sieve algorithm.

  - [Clean linear](calculators/sieve/clean/linear.ts) | [Optimized linear](calculators/sieve/optimized/linear.ts) - An implementation of the algorithm with a linear time complexity, as [**described here**](https://cp-algorithms.com/algebra/prime-sieve-linear.html).

## [A typing system](types.ts):

Used to strongly type everything together - preventing bugs and misuse.

> Note: This project heavily relies on [**Tuples**](https://www.w3schools.com/typescript/typescript_tuples.php).

## [Comparison functions](utils/comparisons.ts):

To help compare different [_calculators_](calculators/) and [_checkers_](checkers/)- written for flexibility in what you pass to it.

This checks every calculator with every checker function, assuming the calculator is compatible

> Currently, all but the [_"clean" sieve implementations_](calculators/sieve/clean/) use checker functions

# Note:

The [_optimized implementation_](calculators/sieve/optimized/) has a big issue!

     See if you can figure out the issue yourself, as a challenge.

The reason this implementation has a big issue is that I assumed that the "doubling" in functions executed (remember, we are _checking each number_) would be compensated for by the fact that we need to run this process on less numbers.

## After more thought, I realized this is wrong for two reasons:

1.  The "doubling" would mean that in order to (in theory) do less actions, one would need to have the minimum value over half the maximum.
    > Remember, this is the starting point!
2.  The second (and more important) reason this is wrong, and why doubling was in quotation marks, is simply that the [_check_](checkers/) we are using _doesn't scale linearly_ with the size of the number that is being checked.

    > This is not an issue with the implementation. The [**best currently known algorithm**](https://en.wikipedia.org/wiki/AKS_primality_test) for checking if a number is prime has a time complexity of $O(log (n)^ 6) $ - as described in [**this paper**](https://math.dartmouth.edu/~carlp/PDF/complexity12.pdf).

    This means that we are not so much "doubling" the run time of one loop cycle as much as we are making it non-linear, unlike before.

    > The [_clean implementations_](calculators/sieve/clean/) of the algorithm only use a boolean table, so while setting the table takes linear time (each loop cycle), each check of the value of the boolean table runs in constant time.

What this means, in practice, is that the [_optimized implementations_](calculators/sieve/optimized/) of the algorithm are (at least theoretically) faster than the corresponding [_clean implementation_](calculators/sieve/clean/) only when **two conditions are met**:

1.  The minimum parameter is _a significant percentage_ of the maximum parameter.

2.  The numbers we are checking _are not very big_.
