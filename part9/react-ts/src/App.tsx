
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group'
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: 'background'
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group'
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic'
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial: 'https://type-level-typescript.com/template-literal-types',
      kind: 'background'
    },
  ]

  courseParts.forEach(part => {
    switch (part.kind) {
      case 'basic':
        console.log(part.name, part.description, part.exerciseCount)
        break
      case 'group':
        console.log(part.name, part.exerciseCount, part.groupProjectCount)
        break
      case 'background':
        console.log(part.name, part.exerciseCount, part.description, part.backgroundMaterial)
        break
      default:
        return assertNever(part)
    }
  })

  return (
    <>
    <h1>{courseName}</h1>
    <p>Hello world {courseParts[0].name}</p>
    </>
  )
}

export default App