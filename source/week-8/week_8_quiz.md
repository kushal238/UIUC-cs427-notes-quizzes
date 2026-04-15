### Question 1. True or False: A reason that *a big test is worse than several small tests* is that the later assertions won't be executed if the preceding assertion fails.
- True ✅
- False

### Question 2. Which of the following is a valid JUnit API method signature?
- static void assertEquals(char expected, char actual, double delta)
- static void assertEquals(double expected, double actual, double delta) ✅
- static void assertEquals(long expected, long actual, double delta)

### Question 3. Which of the following is correct about JUnit?
- It provides test runners to run tests
- JUnit tests can be run automatically and they check their own test results and provide immediate feedback of failing or passing
- Both A and B ✅
- Neither A nor B

### Question 4. True or False: Testing can be used in the process of checking the functionalities of a software application to see whether it is working correctly as per its functional requirements.
- True ✅
- False

### Question 5. True or False: Annotating a public void method with @AfterEach causes that method to be run before each test method (i.e., a method annotated with @Test).
- True
- False ✅

### Question 6. Consider the following code:
```java
public class A {
    private int i;
    public A(int i) { this.i = i; }

    @Override
    public boolean equals(Object o){
        // self check
        if (this == o) { return true; }
        // null check
        else if (o == null) { return false;}
        // type check and cast
        else if (getClass() != o.getClass()) {  return false; }
        // type cast
        else {
            final A a = (A) o;
            // field-equality check
            // field comparison
            if (this.i == a.i)
                return true;
            else
                return Objects.equals(a, a);
        }
    }
}
public class TestA {
    final A a1 = new A(0);
    final A a2 = new A(0);

    @Test
    public void assertsame_tTestAssertSame(){
        assertSame(a1, a2);
    }

    @Test
    public void assertsame_tTestAssertEquals(){
        assertEquals(a1, a2);
    }
}
```
What will be the results of the above two assertions after the two test methods are run?
- Pass, Pass
- Pass, Fail
- Fail, Pass ✅
- Fail, Fail

### Question 7. Consider the following code:
```java
public void shouldTellIfPrime(){
    Assertions.assertAll(
            () -> assertTrue(isPrime(2)),
            () -> assertFalse(isPrime(4))
    );
}

public void shouldTellIfPrime(){
    Assertions.assertTrue(isPrime(2));
    Assertions.assertFalse(isPrime(4));
}
```
True or False: The above two unit tests have exactly the same effect at runtime.
- True
- False ✅

### Question 8. Consider the following code:
```java
public class ExampleUnitTest {
    @Test
    public void addition_isCorrect() throws Exception {
        Assume.assumeFalse(System.getProperty("os.name").contains("Windows"));
        assertEquals(4, 2 + 2);    //line *
    }
}
```
Will the line annotated with comment of "line*" get executed in a Windows operating system?
- Yes
- No ✅

### Question 9. If a test method is a parameterized test, then the method should use the tag of ________ to provide arguments for each invocation of the parameterized test, that is, to specify the source of its arguments.
- @Test
- @ValueSource ✅
- @ParameterizedTest
- @Class

### Question 10. True or False: We can pass CSV values to test methods. We can specify the delimiter for multiple arguments in the test method.
- True ✅
- False

### Question 11. True or False: We can use @MethodSource to specify a parameterized factory method. Then the return type of this factory method can be Stream, Iterator, Iterable, or array of element sets.
- True ✅
- False

### Question 12. Consider the following code:
```java
@ParameterizedTest
@ValueSource(strings={"1, 2", "1, 2, 3"})
void testWithArrayOfStrings(@ConvertWith(CSVtoArray.class)String... arg)  {
  // some code
}

public static class CSVtoArray extends SimpleArgumentConverter {
    @Override
    protected Object convert(Object source, Class<?> targetType) throws ArgumentConversionException {
          String s = (String) source;
        return s.split("\\s*,\\s*");
    }
}
```
What type of conversion does it use?
- Implicit Conversion
- Explicit Conversion ✅

### Question 13. Consider the following code:
```java
@ParameterizedTest
@ValueSource(...)
void PT1(int elem, Stack<Integer> stk) {
    assumeTrue(stk != null);         // line1
    int oldSize = stk.size();        // line2
    stk.push(elem);                  // line3
    assertEquals(oldSize+1, stk.size()); // line4
}
```
Which of the followings refers to the line annotated with comment "line1"?
- Assume ✅
- Arrange
- Act
- Assert

### Question 14. We specifically listed, formulated, and tested all possible returns of observers. What guideline is this?
- Assumption-first guideline
- Property-first guideline ✅

### Question 15. Which test generalization step has non-primitive objects as arguments?
- Parameterize ✅
- Generalize test oracle
- Add assumptions
- Cross test generalize

### Question 16. Which test-generalization step uses AssumeTrue or AssumeFalse?
- Parameterize
- Generalize test oracle
- Add assumptions ✅
- Cross test generalize