interface WelcomeProps {
  name: string;
}

const Welcome = (props: WelcomeProps) => {
  return <h1>Welcome, {props.name}!</h1>;
}

export default Welcome;